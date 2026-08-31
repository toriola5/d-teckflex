import Link from "next/link";

/*
  A quiet cross-reference to another service, sitting just above the quote form
  on the service pages.

  Deliberately a text link rather than a second button: it shares a screen with
  the primary CTA, and the brief makes the quote form the single conversion
  point. This should catch someone who has realised they need something else,
  not compete for the click.

  Defaults to Systems Improvement, which is the one service kept out of the
  main nav (brief §8) and so needs a route in from the other pages.
*/
export default function RelatedService({
  href = "/systems-improvement",
  heading = "Shuffling between platforms to get one job done?",
  body = "If you find yourself moving between different platforms to perform a single operation, and it's slowing you down, there is usually a better way.",
  linkLabel = "Systems improvement",
}: {
  href?: string;
  heading?: string;
  body?: string;
  linkLabel?: string;
}) {
  return (
    <section aria-labelledby="related" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="reveal max-w-2xl border border-hairline p-7">
          <h2 id="related" className="font-display text-base text-ink">
            {heading}
          </h2>
          <p className="mt-2.5 max-w-[58ch] text-sm">{body}</p>
          <Link
            href={href}
            className="mt-5 inline-block text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
          >
            {linkLabel} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
