"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  BUDGET_OPTIONS,
  INTEREST_OPTIONS,
  SITUATION_GROUPS,
  TIMELINE_OPTIONS,
  emptyQuote,
  validateQuote,
  type QuoteErrors,
  type QuoteFormValues,
} from "@/lib/quote";

/*
  The single conversion point, embedded on every page (brief §2/§3). Not a
  separate route, and identical wherever it appears.

  noValidate is set on purpose: the browser's own bubbles can't be styled,
  vanish on blur, and aren't reliably announced. Validation below runs on
  submit, then per-field once a field has already errored, so nobody gets
  scolded mid-typing.
*/

const fieldBase =
  "w-full border border-hairline bg-canvas px-3.5 py-2.5 text-base text-graphite placeholder:text-muted";

/*
  Module scope on purpose. Defined inside QuoteForm it would be a new component
  type on every render, so React would unmount and remount the message rather
  than update it, which also re-fires role="alert" and re-announces it.
*/
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-accent-hover">
      {message}
    </p>
  );
}

export default function QuoteForm() {
  const formId = useId();
  const [values, setValues] = useState<QuoteFormValues>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const errorSummaryRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  /*
    Move focus to whatever replaced the form, so the outcome is announced
    instead of leaving the user stranded at the top of the document.

    This has to be an effect, not a setTimeout in the submit handler: the
    target element does not exist until React has committed the new state,
    so the ref is still null at that point.
  */
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorSummaryRef.current?.focus();
  }, [status]);

  function update<K extends keyof QuoteFormValues>(
    key: K,
    value: QuoteFormValues[K],
  ) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      /* Only re-check a field that is already showing an error, so the
         message clears as soon as it's fixed. */
      if (errors[key]) {
        setErrors((prevErrors) => {
          const revalidated = validateQuote(next);
          const cleared = { ...prevErrors };
          if (!revalidated[key]) delete cleared[key];
          return cleared;
        });
      }
      return next;
    });
  }

  function toggleInterest(value: string) {
    setValues((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((item) => item !== value)
        : [...prev.interests, value],
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateQuote(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      /* Move focus to the first thing that's wrong rather than leaving the
         user to hunt for it. */
      const firstKey = Object.keys(found)[0];
      document
        .querySelector<HTMLElement>(`[data-field="${firstKey}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
      setValues(emptyQuote);
    } catch {
      setStatus("error");
    }
  }

  function errorProps(key: keyof QuoteFormValues) {
    return errors[key]
      ? {
          "aria-invalid": true as const,
          "aria-describedby": `${formId}-${key}-error`,
        }
      : {};
  }

  return (
    <section
      id="quote"
      aria-labelledby={`${formId}-heading`}
      className="scroll-mt-8 border-t border-hairline"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <h2 id={`${formId}-heading`} className="text-2xl">
            Get a quote
          </h2>
          <p className="mt-4 max-w-[42ch]">
            Tell me a bit about your business and what you need. I&rsquo;ll come
            back to you with a scope and a price. No obligation.
          </p>
          <p className="mt-4 max-w-[42ch] text-sm text-muted">
            Fields marked with an asterisk are required. Everything else is
            optional.
          </p>
        </div>

        {status === "success" ? (
          <div
            ref={successRef}
            tabIndex={-1}
            className="self-start border border-hairline p-8"
          >
            <h3 className="text-lg">Thanks, your request is in.</h3>
            <p className="mt-3 max-w-[52ch]">
              I&rsquo;ll read it properly and reply by email, usually within a
              couple of working days.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              Send another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${formId}-name`}
                  className="block text-sm font-medium text-ink"
                >
                  Your name <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  data-field="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                  {...errorProps("name")}
                />
                <FieldError id={`${formId}-name-error`} message={errors.name} />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-business`}
                  className="block text-sm font-medium text-ink"
                >
                  Business name
                </label>
                <input
                  id={`${formId}-business`}
                  data-field="businessName"
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  value={values.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`${formId}-email`}
                className="block text-sm font-medium text-ink"
              >
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${formId}-email`}
                data-field="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                className={`mt-2 ${fieldBase}`}
                {...errorProps("email")}
              />
              <FieldError id={`${formId}-email-error`} message={errors.email} />
            </div>

            <div>
              <label
                htmlFor={`${formId}-situation`}
                className="block text-sm font-medium text-ink"
              >
                What do you need help with? <span aria-hidden="true">*</span>
              </label>
              <select
                id={`${formId}-situation`}
                data-field="situation"
                name="situation"
                required
                value={values.situation}
                onChange={(e) => update("situation", e.target.value)}
                className={`mt-2 ${fieldBase}`}
                {...errorProps("situation")}
              >
                <option value="">Choose one…</option>
                {SITUATION_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <FieldError
                id={`${formId}-situation-error`}
                message={errors.situation}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${formId}-timeline`}
                  className="block text-sm font-medium text-ink"
                >
                  Rough timeline
                </label>
                <select
                  id={`${formId}-timeline`}
                  name="timeline"
                  value={values.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                >
                  <option value="">No preference</option>
                  {TIMELINE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${formId}-budget`}
                  className="block text-sm font-medium text-ink"
                >
                  Budget range
                </label>
                <select
                  id={`${formId}-budget`}
                  name="budget"
                  value={values.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                >
                  <option value="">Rather not say</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="border-t border-hairline pt-6">
              <legend className="text-sm font-medium text-ink">
                Anything else you&rsquo;d like help with?
              </legend>
              <p className="mt-1 text-sm text-muted">
                Optional. Tick any that apply.
              </p>
              <div className="mt-4 space-y-3">
                {INTEREST_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={`${formId}-${option.value}`}
                    className="flex cursor-pointer items-start gap-3 text-sm"
                  >
                    <input
                      id={`${formId}-${option.value}`}
                      type="checkbox"
                      name="interests"
                      value={option.value}
                      checked={values.interests.includes(option.value)}
                      onChange={() => toggleInterest(option.value)}
                      className="mt-0.5 size-4 shrink-0 accent-accent"
                    />
                    <span className="max-w-[52ch]">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor={`${formId}-notes`}
                className="block text-sm font-medium text-ink"
              >
                Anything else about your business I should know?
              </label>
              <textarea
                id={`${formId}-notes`}
                name="notes"
                rows={4}
                value={values.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={`mt-2 ${fieldBase}`}
              />
            </div>

            {status === "error" && (
              <p
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                className="border border-accent-hover px-4 py-3 text-sm text-accent-hover"
              >
                Something went wrong sending that. Please try again, or email me
                directly.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-accent px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-accent-hover focus-visible:outline-[#161b22] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send my request"}
              </button>
              <p aria-live="polite" className="text-sm text-muted">
                {status === "submitting" ? "Sending your request…" : ""}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
