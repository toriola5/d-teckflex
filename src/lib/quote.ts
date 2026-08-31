/*
  Field definitions and validation for the quote form (project-brief.md §4).
  Shared deliberately: the client validates before submit for the fast feedback
  the brief asks for, and the route handler re-validates the same way, because
  client-side checks are a convenience and never a guarantee.
*/

export type QuoteFormValues = {
  name: string;
  businessName: string;
  email: string;
  situation: string;
  timeline: string;
  budget: string;
  interests: string[];
  notes: string;
};

export const emptyQuote: QuoteFormValues = {
  name: "",
  businessName: "",
  email: "",
  situation: "",
  timeline: "",
  budget: "",
  interests: [],
  notes: "",
};

export const SITUATION_OPTIONS = [
  { value: "no-site", label: "I don't have a website yet" },
  { value: "outdated", label: "I have one, but it's outdated" },
  { value: "rebuild", label: "I need an existing site rebuilt" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within the next month" },
  { value: "3-months", label: "Within the next three months" },
  { value: "exploring", label: "No fixed date, just exploring" },
] as const;

/*
  Qualification bands, not a price list. The brief rules out public pricing
  tiers, and these ask what the client has in mind rather than stating rates.
  The specific figures are a placeholder: adjust them to your actual market.
*/
export const BUDGET_OPTIONS = [
  { value: "under-1k", label: "Under £1,000" },
  { value: "1k-2.5k", label: "£1,000 – £2,500" },
  { value: "2.5k-5k", label: "£2,500 – £5,000" },
  { value: "5k-plus", label: "£5,000+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

/* Brief §4: optional, never required, and phrased as help rather than upsell. */
export const INTEREST_OPTIONS = [
  {
    value: "microsoft-365",
    label: "Setting up professional email (Microsoft 365)",
  },
  {
    value: "data-analytics",
    label: "Understanding my business data: dashboards and reporting",
  },
  {
    value: "systems-improvement",
    label: "Cleaning up or improving existing systems",
  },
] as const;

export type QuoteErrors = Partial<Record<keyof QuoteFormValues, string>>;

/* Intentionally permissive: enough to catch a typo, not enough to reject a
   valid-but-unusual address. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuote(values: QuoteFormValues): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell me your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please add an email address so I can reply.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That doesn't look like a complete email address.";
  }

  if (!values.situation) {
    errors.situation = "Please pick the option closest to your situation.";
  }

  return errors;
}

/*
  Turns a stored option value back into the label a person chose, so the
  notification email reads "I have one, but it's outdated" rather than
  "outdated". Falls back to the raw value if an option is ever removed.
*/
export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
