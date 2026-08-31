import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import ServiceIncludes, { type Include } from "@/components/ServiceIncludes";
import ProcessSteps from "@/components/ProcessSteps";
import { dataProcess } from "@/data/process";
import RelatedService from "@/components/RelatedService";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Data analytics",
  description:
    "Dashboards and reporting that show what's actually happening in your business. Built in Power BI, Tableau or on the web, from the data you already have.",
};

const includes: Include[] = [
  {
    title: "When there's no data yet",
    detail:
      "If nothing is being tracked at the moment, that's the first piece of work: putting the measurement in place so performance can be recorded properly. Once it's running, the numbers start explaining what's going well and where a problem is actually coming from.",
  },
  {
    title: "Getting the data together",
    detail:
      "Pulling numbers out of the spreadsheets, systems and exports they're currently scattered across, and getting them into one place that stays current.",
  },
  {
    title: "A dashboard you'll actually check",
    detail:
      "Built around the handful of things you need to know each week, not every metric that could technically be plotted.",
  },
  {
    title: "Reporting that runs itself",
    detail:
      "Recurring reports automated, so the monthly numbers stop being a manual afternoon of copying and pasting.",
  },
  {
    title: "One-off analysis",
    detail:
      "Sometimes you don't need a dashboard, you need a specific question answered properly. That's a piece of work in its own right.",
  },
];

export default function DataAnalyticsPage() {
  return (
    <main id="main">
      <ServiceHero
        title="Dashboards that show what's actually happening in your business."
        intro="Some businesses already have the data, scattered across exports, spreadsheets and systems that don't talk to each other. Others aren't tracking anything yet. Either way the job is the same: get you to the point where you can see what's happening in your business, and why."
      />
      <ServiceIncludes heading="What this covers" items={includes} />
      <ProcessSteps heading="How a data project works" steps={dataProcess} />
      <RelatedService />
      <QuoteForm />
    </main>
  );
}
