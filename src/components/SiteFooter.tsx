import Link from "next/link";

const services = [
  { href: "/website-development", label: "Website development" },
  { href: "/microsoft-365-setup", label: "Microsoft 365 setup" },
  { href: "/data-analytics", label: "Data analytics" },
  { href: "/systems-improvement", label: "Systems improvement" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg tracking-tight">
              D <span className="text-accent-on-ink">Teckflex</span>
            </p>
            <p className="mt-3 max-w-[38ch] text-sm text-hairline">
              Websites for small businesses and founders, and the tech that
              comes after.
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-tight text-canvas">
              Services
            </h2>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-hairline underline-offset-4 transition-colors hover:text-accent-on-ink hover:underline"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-tight text-canvas">
              Get in touch
            </h2>
            <p className="mt-4 text-sm text-hairline">
              toriola.dolapodavid@outlook.com
            </p>
            {/*
              Inverted against the ink background. The light-section fill
              (#306F62) only reaches 2.95:1 on ink, below the 3:1 WCAG asks
              for a component boundary, so the button flips to the light teal
              with ink text here.
            */}
            <Link
              href="/#quote"
              className="mt-5 inline-block bg-accent-on-ink px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-90 focus-visible:outline-[#f6f4ef]"
            >
              Get a quote
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-graphite pt-6">
          {/* Not text-muted: that token is tuned for the canvas and only
              reaches 3.58:1 on ink. */}
          <p className="text-sm text-hairline opacity-70">
            © {new Date().getFullYear()} D Teckflex
          </p>
        </div>
      </div>
    </footer>
  );
}
