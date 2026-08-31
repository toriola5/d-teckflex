import Link from "next/link";

/*
  The "stack" motif from brief §5, now carrying the homepage's four entry points
  rather than being decoration.

  It was originally aria-hidden, on the grounds that Interface/Data/Systems/
  Foundation were a visual metaphor rather than content. That no longer holds:
  these are real navigation, so they are a labelled list of links, reachable by
  keyboard and announced properly.

  Still pure CSS animation with a staggered delay, so this remains a Server
  Component and ships no JavaScript.
*/
const layers = [
  {
    href: "/website-development",
    label: "Website",
    detail: "How people find you",
    className: "bg-accent text-canvas hover:bg-accent-hover focus-visible:outline-[#161b22]",
  },
  {
    href: "/microsoft-365-setup",
    label: "Microsoft 365",
    detail: "Email and secure admin",
    className: "bg-ink text-canvas hover:bg-graphite focus-visible:outline-[#161b22]",
  },
  {
    href: "/data-analytics",
    label: "Data & reporting",
    detail: "Dashboards that tell you what's happening",
    className: "bg-graphite text-canvas hover:bg-ink focus-visible:outline-[#161b22]",
  },
  {
    href: "/systems-improvement",
    label: "Systems",
    detail: "The tools and processes underneath",
    className:
      "border border-hairline bg-transparent text-ink hover:border-accent",
  },
];

export default function HeroStack() {
  return (
    <nav aria-label="Services" className="w-full max-w-md">
      <ul>
        {layers.map((layer, i) => (
          <li
            key={layer.href}
            className="stack-layer"
            style={{
              animationDelay: `${i * 110}ms`,
              /* Indent decreases going down, so Systems is the widest panel.
                 The other way round reads as an upside-down stack. */
              marginLeft: `${(layers.length - 1 - i) * 14}px`,
              marginTop: i === 0 ? 0 : "6px",
            }}
          >
            <Link
              href={layer.href}
              className={`group flex items-center justify-between gap-6 px-5 py-4 transition-colors ${layer.className}`}
            >
              <span>
                <span className="block font-display text-sm tracking-tight">
                  {layer.label}
                </span>
                <span className="mt-0.5 block text-sm opacity-75">
                  {layer.detail}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-sm opacity-60 transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
