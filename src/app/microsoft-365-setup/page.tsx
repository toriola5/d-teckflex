import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import ServiceIncludes, { type Include } from "@/components/ServiceIncludes";
import ProcessSteps from "@/components/ProcessSteps";
import { microsoft365Process } from "@/data/process";
import RelatedService from "@/components/RelatedService";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Microsoft 365 setup",
  description:
    "Professional email on your own domain, user accounts, and a sensible security baseline. Microsoft 365 tenant setup and admin, done properly.",
};

const includes: Include[] = [
  {
    title: "Email on your own domain",
    detail:
      "Addresses at your business domain rather than a free mailbox, with the DNS records set up so your mail actually reaches people.",
  },
  {
    title: "Tenant and accounts",
    detail:
      "The Microsoft 365 tenant configured, licences assigned, and accounts created for the people who need them.",
  },
  {
    title: "A security baseline",
    detail:
      "Multi-factor authentication turned on, admin roles kept to who genuinely needs them, and sensible defaults rather than whatever the wizard left behind.",
  },
  {
    title: "Moving existing mail",
    detail:
      "If you're coming from another provider, existing mail and contacts move across.",
  },
];

export default function MicrosoftSetupPage() {
  return (
    <main id="main">
      <ServiceHero
        title="Professional email and a Microsoft 365 setup that holds up."
        intro="Getting email onto your own domain is usually the first thing a business outgrows. I set up the tenant, the accounts and the security baseline properly, so you are not left with a half-configured admin centre."
      />
      <ServiceIncludes heading="What this covers" items={includes} />
      <ProcessSteps heading="How a Microsoft 365 setup works" steps={microsoft365Process} />
      <RelatedService />
      <QuoteForm />
    </main>
  );
}
