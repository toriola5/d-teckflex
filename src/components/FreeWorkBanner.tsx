"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  breakdown,
  deadlineLabel,
  msRemaining,
  offer,
  spotsLabel,
  spotsOpen,
} from "@/lib/offer";

/*
  Offer banner with a countdown to a fixed deadline.

  Why this is a Client Component even though the copy is static: the pages are
  statically generated, so the HTML is built once. A server-rendered decision
  about whether the offer has expired would be frozen at build time and the
  banner would still be showing weeks later. The expiry check has to happen in
  the visitor's browser.

  Hydration: the server renders the banner and the deadline date, but not the
  countdown digits, because the server's clock and the browser's differ by the
  time in transit and React would flag the mismatch. The digits appear on mount.

  Accessibility: the ticking numbers are aria-hidden and the sentence read out
  instead gives the closing date. This matters more now the counter moves every
  second: an announcement per second would make the page unusable with a screen
  reader, and the date is the useful information anyway.
*/
export default function FreeWorkBanner() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(msRemaining());
    tick();
    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, []);

  /* No spaces left is as much an end to the offer as the deadline is. */
  if (!offer.enabled || !spotsOpen()) return null;
  /* null means not mounted yet, so keep the banner. Only a real, measured
     expiry removes it. */
  if (remaining !== null && remaining <= 0) return null;

  const left = remaining === null ? null : breakdown(remaining);

  return (
    <aside
      aria-labelledby="offer-heading"
      className="border-b border-graphite bg-ink text-canvas"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:gap-10">
        <div className="lg:flex-1">
          <h2
            id="offer-heading"
            className="font-display text-base font-medium text-canvas"
          >
            {offer.heading}
          </h2>
          <p className="mt-1.5 max-w-[68ch] text-sm text-hairline">
            {offer.body}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="border border-graphite px-3 py-1.5 text-sm text-hairline">
            <span className="font-display text-accent-on-ink">
              {offer.places.remaining}
            </span>{" "}
            of {offer.places.total} spaces left
          </p>

          <p className="text-sm text-hairline">
            <span className="sr-only">
              {spotsLabel()}. This offer closes on {deadlineLabel()}.
            </span>
            {left && (
              <span aria-hidden="true" className="flex items-baseline gap-3">
                <Unit value={left.days} label="days" />
                <Unit value={left.hours} label="hrs" />
                <Unit value={left.minutes} label="min" />
                <Unit value={left.seconds} label="sec" />
              </span>
            )}
          </p>

          <Link
            href={offer.ctaHref}
            className="bg-accent-on-ink px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-90 focus-visible:outline-[#f6f4ef]"
          >
            {offer.ctaLabel}
          </Link>
        </div>
      </div>
    </aside>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-1">
      <span className="font-display text-xl tabular-nums text-accent-on-ink">
        {value}
      </span>
      {/* hairline, not muted: muted is tuned for the canvas and only
          reaches 3.58:1 on ink. */}
      <span className="text-sm text-hairline opacity-80">{label}</span>
    </span>
  );
}
