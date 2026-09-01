"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
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

/*
  Dismissal, remembered per browser.

  The key includes the deadline, so starting a new offer with a new date shows
  the banner again to someone who dismissed the previous one. Without that,
  one dismissal would silence every future offer forever.

  Every localStorage call is wrapped: it throws outright in some privacy modes
  rather than returning null, and a banner is not worth breaking a page for.
*/
const DISMISS_KEY = `dteckflex-offer-dismissed:${offer.endsAt}`;

let listeners: Array<() => void> = [];

function isDismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function dismissOffer() {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    /* Storage unavailable. The banner still closes for this page view, it
       just comes back on the next one. */
  }
  for (const listener of listeners) listener();
}

function subscribeDismissed(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange);
  };
}

export default function FreeWorkBanner() {
  const [remaining, setRemaining] = useState<number | null>(null);

  /* Server snapshot is always "not dismissed", so the markup matches on the
     server and the browser corrects it without a hydration mismatch. */
  const dismissed = useSyncExternalStore(
    subscribeDismissed,
    isDismissed,
    () => false,
  );

  useEffect(() => {
    const tick = () => setRemaining(msRemaining());
    tick();
    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, []);

  /* No spaces left is as much an end to the offer as the deadline is. */
  if (!offer.enabled || !spotsOpen() || dismissed) return null;
  /* null means not mounted yet, so keep the banner. Only a real, measured
     expiry removes it. */
  if (remaining !== null && remaining <= 0) return null;

  const left = remaining === null ? null : breakdown(remaining);

  return (
    <aside
      aria-labelledby="offer-heading"
      className="relative border-b border-graphite bg-ink text-canvas"
    >
      <button
        type="button"
        onClick={dismissOffer}
        aria-label="Dismiss this offer"
        className="absolute right-3 top-3 flex size-7 items-center justify-center text-hairline transition-colors hover:text-canvas focus-visible:outline-[#f6f4ef]"
      >
        <span aria-hidden="true" className="text-base leading-none">
          &times;
        </span>
      </button>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:gap-10">
        <div className="pr-8 lg:flex-1 lg:pr-0">
          <h2
            id="offer-heading"
            className="font-display text-sm font-medium text-canvas"
          >
            {offer.heading}
          </h2>
          {/* Justified, with hyphenation on. Justify without hyphens opens
              large gaps between words on narrow columns. */}
          <p className="mt-1.5 max-w-[68ch] hyphens-auto text-justify text-sm text-hairline">
            {offer.body}
          </p>
        </div>

        {/*
          Mobile: spaces-left and the button share the top row, countdown on its
          own row beneath. Desktop: spaces, countdown, button all inline.

          Order classes do the rearranging, so each element exists once in the
          DOM. The countdown takes w-full on mobile, which is what forces it
          onto its own line rather than wrapping unpredictably.
        */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 lg:justify-start lg:gap-x-6">
          <p className="order-1 border border-graphite px-2.5 py-1 text-sm text-hairline">
            <span className="font-display text-accent-on-ink">
              {offer.places.remaining}
            </span>{" "}
            of {offer.places.total} spaces left
          </p>

          <Link
            href={offer.ctaHref}
            className="order-2 bg-accent-on-ink px-3.5 py-1.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 focus-visible:outline-[#f6f4ef] lg:order-3"
          >
            {offer.ctaLabel}
          </Link>

          <p className="order-3 w-full text-sm text-hairline lg:order-2 lg:w-auto">
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
        </div>
      </div>
    </aside>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-1">
      <span className="font-display text-lg tabular-nums text-accent-on-ink">
        {value}
      </span>
      {/* hairline, not muted: muted is tuned for the canvas and only
          reaches 3.58:1 on ink. */}
      <span className="text-sm text-hairline opacity-80">{label}</span>
    </span>
  );
}
