import Link from "next/link";

/*
  All four services are in the nav.

  Systems Improvement was originally left out, per brief §8, as an
  existing-client upsell rather than a cold-traffic service. That reasoning
  stopped holding once the homepage began leading with the whole stack. The
  hero offers all four, so hiding one from the nav only made it harder to find.

  Labels match the hero stack exactly, so the two never disagree about what a
  service is called.
*/
const navLinks = [
  { href: "/website-development", label: "Website" },
  { href: "/microsoft-365-setup", label: "Microsoft 365" },
  { href: "/data-analytics", label: "Data & reporting" },
  { href: "/systems-improvement", label: "Systems" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-hairline">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight text-ink"
        >
          D <span className="text-accent">Teckflex</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-7">
          {/* Four links plus a button need more room than three did, so the
              full nav appears at lg rather than md. */}
          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-graphite transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#quote"
            className="bg-accent px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-accent-hover focus-visible:outline-[#161b22]"
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
