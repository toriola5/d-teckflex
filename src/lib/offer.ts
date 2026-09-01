/*
  The free-build offer banner. Everything about it is configured here so it can
  be changed or switched off in one place.

  Two deliberate choices:

  1. A FIXED deadline, not "7 days from when the visitor arrives". A rolling
     per-visitor countdown never actually expires, which is a fake-urgency
     pattern people recognise and distrust. This one really does close.

  2. `places` is stated in the copy. An open-ended offer of free work has no
     natural end, and saying "two" is both honest and the thing that creates
     real urgency rather than manufactured urgency.

  When the deadline passes the banner hides itself. That is a safety net, not
  a plan: delete the <FreeWorkBanner /> from layout.tsx once the offer is over,
  or move the date forward if you extend it.
*/

export const offer = {
  /* Set to false to hide the banner without removing the code. */
  enabled: true,

  /* End of day, UK time. September is BST, hence +01:00. */
  endsAt: "2026-09-08T23:59:59+01:00",

  /*
     total    how many free builds are on offer altogether
     remaining how many are still unclaimed. Decrement this as they fill; when
     it reaches 0 the banner and the form checkbox both disappear.
  */
  places: {
    total: 4,
    remaining: 3,
  },

  heading: "Free build, in exchange for showing the work",

  body:
    "I'm taking on four small businesses free of charge: a website, a Microsoft 365 setup, a dashboard, whichever you need. Same process and same care as paid work. All I ask in return is permission to show the finished result as part of my portfolio.",

  /* Used on the quote form, so the wording stays in step with the banner. */
  formLabel: "Yes, consider me for one of the free spots",

  ctaLabel: "Ask about a free build",
  ctaHref: "/#quote",
} as const;

export function spotsLabel(): string {
  return `${offer.places.remaining} of ${offer.places.total} spaces left`;
}

/* The offer is only live while it is both in date and has spaces. */
export function spotsOpen(): boolean {
  return offer.places.remaining > 0;
}

export function msRemaining(now: number = Date.now()): number {
  return new Date(offer.endsAt).getTime() - now;
}

export function breakdown(ms: number) {
  const total = Math.max(0, ms);
  const second = 1_000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  return {
    days: Math.floor(total / day),
    hours: Math.floor((total % day) / hour),
    minutes: Math.floor((total % hour) / minute),
    seconds: Math.floor((total % minute) / second),
  };
}

/* Written out for screen readers and for anyone who would rather see a date
   than a countdown. */
export function deadlineLabel(): string {
  return new Date(offer.endsAt).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
