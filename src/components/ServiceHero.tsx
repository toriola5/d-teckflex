import Link from "next/link";

/*
  Shared hero for the four service pages. No eyebrow label above the heading:
  brief §5 rules out the tracked-out all-caps device.

  The stack motif is deliberately absent: it is the homepage's one signature
  moment, not a decoration repeated on every page.
*/
export default function ServiceHero({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <h1 className="max-w-[20ch] text-3xl lg:text-4xl">{title}</h1>
        <p className="mt-6 max-w-[60ch] text-lg">{intro}</p>
        <Link
          href="#quote"
          className="mt-9 inline-block bg-accent px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-accent-hover focus-visible:outline-[#161b22]"
        >
          Get a quote
        </Link>
      </div>
    </section>
  );
}
