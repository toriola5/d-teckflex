import Link from "next/link";

/*
  All four services are in the nav.

  Systems Improvement was originally left out, per brief §8, as an
  existing-client upsell rather than a cold-traffic service. That reasoning
  stopped holding once the homepage began leading with the whole stack. The
  hero offers all four, so hiding one from the nav only made it harder to find.

  Labels match the hero stack exactly, so the two never disagree about what a
  service is called.

  Layout: one nav element, reflowed rather than duplicated. Below lg the links
  drop to their own full-width row under the wordmark; at lg they sit inline
  between the wordmark and the button. Ordering does the work, so there is no
  second copy of the list for screen readers to announce twice.

  No hamburger on purpose. Four short labels fit on two wrapped rows, and a
  disclosure would cost a click, a client component, and a focus trap to hide
  something that fits on screen anyway. Before this, the links were simply
  hidden below lg, which left anyone on a phone with no route from one service
  page to another except the footer.
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
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 gap-y-3 px-6 py-5">
        <Link
          href="/"
          className="mr-auto font-display text-lg font-medium tracking-tight text-ink"
        >
          D <span className="text-accent">Teckflex</span>
        </Link>

        <Link
          href="/#quote"
          className="order-2 bg-accent px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-accent-hover focus-visible:outline-[#161b22] lg:order-3"
        >
          Get a quote
        </Link>

        <nav
          aria-label="Main"
          className="order-3 w-full lg:order-2 lg:w-auto"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-3 lg:gap-x-7 lg:border-t-0 lg:pt-0">
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
        </nav>
      </div>
    </header>
  );
}
