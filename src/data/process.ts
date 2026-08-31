/*
  Two process sequences, because they describe different scopes.

  `generalProcess` is for the homepage, which leads with all four services.
  Its steps have to be true of a Microsoft 365 setup and a Power BI dashboard
  as much as a website build, so nothing here names a deliverable.

  `websiteProcess` is the detailed website-development sequence from
  project-brief.md §6, and belongs only on /website-development.
*/

export type ProcessStep = {
  title: string;
  detail: string;
};

export const generalProcess: ProcessStep[] = [
  {
    title: "Discovery call",
    detail:
      "We talk about your business and what's actually getting in the way, whether that's not having a site, messy email, or no idea what your numbers are doing.",
  },
  {
    title: "Scope and quote",
    detail:
      "You get it in writing: what I'd do, what it costs, and how long it takes. Nothing starts until you're happy with it.",
  },
  {
    title: "Build",
    detail:
      "The work itself: the site, the Microsoft 365 setup, the dashboard, the systems clean-up, or some combination.",
  },
  {
    title: "Handover",
    detail:
      "It goes live. If you want to run it yourself from there, I'll show you how and hand the keys over. If you'd rather not have to think about it, I stay in charge of it. That's a normal way to work, not an upsell.",
  },
  {
    title: "Ongoing",
    detail:
      "Help with the rest of the stack as you need it. Most people start with one thing and add others later.",
  },
];

export const websiteProcess: ProcessStep[] = [
  {
    title: "Discovery call",
    detail: "Understand your business and what the site needs to do.",
  },
  {
    title: "Design",
    detail: "A look and structure built around your business, not a template.",
  },
  {
    title: "Build",
    detail: "A working, responsive site.",
  },
  {
    title: "Launch",
    detail:
      "Go live, with support included. You can take the site over and update it yourself, or leave it with me to look after.",
  },
  {
    title: "Ongoing",
    detail: "Optional help with email, data and systems as you grow.",
  },
];

/*
  Per-service sequences for the three lighter service pages.

  Each is written from what the brief says David actually does: tenant and
  security-baseline work for Microsoft 365, data he may have to start
  collecting from scratch for analytics, an audit-first approach for systems.
  Nothing here claims a capability the brief doesn't support.
*/
export const microsoft365Process: ProcessStep[] = [
  {
    title: "Discovery call",
    detail:
      "How many people need accounts, what you're using for email today, and which domain the addresses should sit on.",
  },
  {
    title: "Plan",
    detail:
      "Which licences you actually need, what has to move across, and when to make the switch so you aren't cut off mid-week.",
  },
  {
    title: "Setup",
    detail:
      "Tenant configured, domain and DNS records in place, accounts created and licences assigned.",
  },
  {
    title: "Migration",
    detail:
      "Existing mail and contacts moved over from your current provider, so nothing is left behind.",
  },
  {
    title: "Security and handover",
    detail:
      "Multi-factor authentication on and admin roles limited to who needs them. From there you can take the admin centre on yourself and I'll show you how to add and remove people, or leave it with me to administer.",
  },
];

export const dataProcess: ProcessStep[] = [
  {
    title: "Discovery call",
    detail:
      "What decisions you're trying to make, and what you'd want to check each week if you could.",
  },
  {
    title: "Find the data",
    detail:
      "What already exists and where it lives. If nothing is being tracked yet, putting that measurement in place is the first job.",
  },
  {
    title: "Clean and organise",
    detail:
      "Getting the numbers into a consistent shape you can trust, so the same question always gives the same answer.",
  },
  {
    title: "Build the dashboard",
    detail:
      "The handful of things that actually matter, rather than every metric that could be plotted.",
  },
  {
    title: "Handover",
    detail:
      "If you want to own it, I'll show you how it reads, how it refreshes, and what to do when a number looks wrong. If you'd rather it just kept working, I keep maintaining it.",
  },
];

export const systemsProcess: ProcessStep[] = [
  {
    title: "Discovery call",
    detail:
      "A walk through how work actually gets done day to day, including the parts that are annoying enough that you've stopped noticing them.",
  },
  {
    title: "Audit",
    detail:
      "Mapping the tools, accounts and steps in use, and where the same information is being entered more than once.",
  },
  {
    title: "Findings",
    detail:
      "What's worth changing, prioritised by the time or money it saves, rather than a plan you'll never start.",
  },
  {
    title: "Implement",
    detail:
      "Making the changes you've agreed to, in an order that doesn't disrupt the work while it's happening.",
  },
  {
    title: "Document",
    detail:
      "Writing down how things are set up, so the knowledge isn't stuck in one person's head. You can take it from there, or keep me on to run it.",
  },
];
