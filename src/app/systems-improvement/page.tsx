import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import ServiceIncludes, { type Include } from "@/components/ServiceIncludes";
import ProcessSteps from "@/components/ProcessSteps";
import { systemsProcess } from "@/data/process";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Systems improvement",
  description:
    "Audits and practical clean-up of the tools and processes slowing your business down. Finding the manual, duplicated and half-working parts, and fixing them.",
};

const includes: Include[] = [
  {
    title: "A look at what you're running",
    detail:
      "An honest audit of the tools, accounts and processes currently in use, including the ones nobody has looked at in a while.",
  },
  {
    title: "Finding the manual work",
    detail:
      "The steps being done by hand every week, the same information being entered twice, and the workflows that quietly cost hours.",
  },
  {
    title: "Practical fixes",
    detail:
      "Changes worth actually making, prioritised by what they save you, rather than a migration plan you'll never start.",
  },
  {
    title: "Writing it down",
    detail:
      "Documentation of how things are set up, so the knowledge doesn't live only in one person's head.",
  },
];

export default function SystemsImprovementPage() {
  return (
    <main id="main">
      <ServiceHero
        title="Clean up the tools and processes slowing you down."
        intro="I put systems in place to make working easier. If you find yourself shuffling between different platforms just to get one operation done, and it's slowing you down, there is usually a better way."
      />
      <ServiceIncludes heading="What this covers" items={includes} />
      <ProcessSteps heading="How a systems review works" steps={systemsProcess} />
      <QuoteForm />
    </main>
  );
}
