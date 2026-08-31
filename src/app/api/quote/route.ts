import { NextResponse } from "next/server";
import { emptyQuote, validateQuote, type QuoteFormValues } from "@/lib/quote";

/*
  ⚠️  NOT YET CONNECTED TO ANYTHING.

  This handler validates a submission and logs it to the server console. It
  does NOT deliver it anywhere. Do not put this site in front of real traffic
  until the marked section below actually sends the enquiry. Otherwise every
  quote request is silently dropped while the visitor is told it went through.

  Brief §8 leaves the choice open. Whichever you pick, it is this one function:

    • Formspree      POST to https://formspree.io/f/<id> with the payload
    • Resend / email  await resend.emails.send({ to, subject, text })
    • Google Sheet   POST to an Apps Script web app URL

  Keep the endpoint or API key in an env var, never inline here.
*/

/* Cheap guard against a bot pasting a megabyte into the notes box. */
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
    interests: Array.isArray(raw.interests)
      ? raw.interests.filter((item): item is string => typeof item === "string")
      : [],
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

  /* Re-validated server-side: the client checks are for feedback, not trust. */
  const errors = validateQuote(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ---------------------------------------------------------------
  // TODO: deliver the enquiry here. Until this exists, nothing is sent.
  // ---------------------------------------------------------------
  console.info("[quote] submission received (not delivered):", {
    ...values,
    email: "<redacted in log>",
  });

  return NextResponse.json({ ok: true });
}
