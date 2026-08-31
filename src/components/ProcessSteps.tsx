import { generalProcess, type ProcessStep } from "@/data/process";

/*
  Brief §5: numbered steps are fine here because this genuinely is a sequence.
  Rendered as an ordered list with a hairline running down the numbers, so it
  reads as a path rather than five disconnected cards.

  The steps are a prop rather than hardcoded: the homepage covers all four
  services and needs a scope-neutral sequence, while /website-development
  describes a website build specifically. See src/data/process.ts.
*/
export default function ProcessSteps({
  headingId = "process",
  heading = "How a project works",
  steps = generalProcess,
}: {
  headingId?: string;
  heading?: string;
  steps?: ProcessStep[];
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <h2 id={headingId} className="text-2xl">
        {heading}
      </h2>

      <ol className="mt-10 max-w-2xl">
        {steps.map((step, i) => (
          <li key={step.title} className="reveal flex gap-6">
            <div className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className="font-display text-sm text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-2 w-px flex-1 bg-hairline"
                />
              )}
            </div>

            <div className="pb-9">
              <h3 className="font-display text-base text-ink">{step.title}</h3>
              <p className="mt-1.5 max-w-[58ch] text-sm">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
