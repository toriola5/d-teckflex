import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import ServiceIncludes, { type Include } from "@/components/ServiceIncludes";
import ProcessSteps from "@/components/ProcessSteps";
import { websiteProcess } from "@/data/process";
import RelatedService from "@/components/RelatedService";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Website development",
  description:
    "Websites designed and built for small businesses and founders. Responsive, built around your business rather than a template, with support after launch.",
};

const includes: Include[] = [
  {
    title: "A site built for you",
    detail:
      "Structure and design shaped around what your business actually does and who it serves, rather than a theme with your logo dropped into it.",
  },
  {
    title: "Works on every screen",
    detail:
      "Built mobile-first and tested at real screen sizes, because most people will find you on a phone.",
  },
  {
    title: "Straightforward to run",
    detail:
      "If you need to update content yourself, that gets built in, so routine changes don't require a developer.",
  },
  {
    title: "Features when you need them",
    detail:
      "A site doesn't have to stop at pages. Taking payments online, customer logins, photo and file uploads. I've built these before and can add them where your business needs them. If what you have in mind isn't listed here, ask.",
  },
  {
    title: "Support after launch",
    detail:
      "Going live is not the end of the job. Support is included, and I'm still here when something needs changing.",
  },
];

export default function WebsiteDevelopmentPage() {
  return (
    <main id="main">
      <ServiceHero
        title="A website built around your business, not a template."
        intro="Whether you're starting from nothing, replacing something outdated, or rebuilding a site that no longer fits, I design and build it, launch it, and stay available afterwards."
      />
      <ServiceIncludes heading="What you get" items={includes} />
      <ProcessSteps
        heading="How a website project works"
        steps={websiteProcess}
      />
      <RelatedService />
      <QuoteForm />
    </main>
  );
}
