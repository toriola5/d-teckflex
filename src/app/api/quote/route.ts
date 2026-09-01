import { NextResponse } from "next/server";
import {
  BUDGET_OPTIONS,
  INTEREST_OPTIONS,
  SITUATION_OPTIONS,
  TIMELINE_OPTIONS,
  emptyQuote,
  labelFor,
  validateQuote,
  type QuoteFormValues,
} from "@/lib/quote";

/*
  Delivers quote requests to Formspree, which emails them on.

  The rule this file exists to enforce: there is no code path that returns
  success without the enquiry having actually been delivered. An earlier
  version validated, logged, and returned ok, so every submission was lost
  while the visitor was told it went through. If delivery fails now, or the
  form id is missing, this returns an error and the form shows its error
  state.

  Configuration: FORMSPREE_FORM_ID, set in .env.local locally and in Vercel's
  Environment Variables for the deployed site. It is the last path segment of
  the endpoint Formspree gives you.
*/

const MAX_FIELD_LENGTH = 5000;

function coerce(body: unknown): QuoteFormValues {
  const raw = (body ?? {}) as Partial<Record<keyof QuoteFormValues, unknown>>;
  const text = (value: unknown) =>
    typeof value === "string" ? value.slice(0, MAX_FIELD_LENGTH) : "";

  return {
    ...emptyQuote,
    name: text(raw.name),
    businessName: text(raw.businessName),
    email: text(raw.email),
    situation: text(raw.situation),
    timeline: text(raw.timeline),
    budget: text(raw.budget),
    notes: text(raw.notes),
    freeOffer: raw.freeOffer === true,
    interests: Array.isArray(raw.interests)
      ? raw.interests.filter((item): item is string => typeof item === "string")
      : [],
  };
}

/* Values are stored as ids; the email should read the way the person answered. */
function toEmailFields(values: QuoteFormValues) {
  return {
    name: values.name,
    email: values.email,
    business: values.businessName || "Not given",
    "looking for": labelFor(SITUATION_OPTIONS, values.situation),
    timeline: values.timeline
      ? labelFor(TIMELINE_OPTIONS, values.timeline)
      : "No preference",
    /* The form hides the budget field for a free build, so reporting
       "Rather not say" here would misrepresent an unanswered question as a
       declined one. */
    budget: values.freeOffer
      ? "Not applicable, free build request"
      : values.budget
        ? labelFor(BUDGET_OPTIONS, values.budget)
        : "Rather not say",
    "also interested in": values.interests.length
      ? values.interests
          .map((value) => labelFor(INTEREST_OPTIONS, value))
          .join(" / ")
      : "Nothing else ticked",
    notes: values.notes || "Nothing added",
    "free build request": values.freeOffer ? "YES" : "No",
    /* Formspree reads _subject for the notification subject line, and uses
       the `email` field above as the reply-to, so replying goes to the client. */
    /* Flagged in the subject too: a free-build request is time-limited and
       should not be missed in a list of enquiries. */
    _subject: values.freeOffer
      ? `FREE BUILD request from ${values.name || "someone"}`
      : `Quote request from ${values.name || "someone"}`,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const values = coerce(body);

  /* Re-validated server side: the client checks are for feedback, not trust. */
  const errors = validateQuote(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    console.error(
      "[quote] FORMSPREE_FORM_ID is not set. Enquiry NOT delivered.",
    );
    return NextResponse.json(
      { error: "Form is not configured." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /* Without this Formspree replies with a redirect to its own thank-you
           page instead of JSON. */
        Accept: "application/json",
      },
      body: JSON.stringify(toEmailFields(values)),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[quote] Formspree rejected the submission:", {
        status: response.status,
        detail: detail.slice(0, 500),
      });
      return NextResponse.json(
        { error: "Could not send that enquiry." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quote] Could not reach Formspree:", error);
    return NextResponse.json(
      { error: "Could not send that enquiry." },
      { status: 502 },
    );
  }
}
