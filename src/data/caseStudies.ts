/*
  Real project examples from project-brief.md §6. These are David's actual
  projects. Do not add invented client work, testimonials or metrics here
  (brief §7). Every number below comes straight from the brief.

  Structured as problem → built → result, per the brief's instruction to
  present these as short case-study cards rather than CV bullet lists.
*/

export type CaseStudy = {
  slug: string;
  title: string;
  problem: string;
  built: string;
  result: string;
  tools: string[];
  /* Which service pages this example belongs on. */
  featuredOn: Array<
    | "website-development"
    | "data-analytics"
    | "systems-improvement"
    | "microsoft-365-setup"
  >;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "real-estate-platform",
    title: "Real estate company web platform",
    problem:
      "A real estate company had no online presence, and no way to get new properties in front of buyers without a developer in the loop.",
    built:
      "A web application giving them a full online presence, with authentication and photo and video uploads, so the team can publish property listings directly to the site themselves.",
    result:
      "Listings go up and get updated by the company's own staff, rather than queuing behind someone else's availability.",
    tools: ["React", "Node.js"],
    featuredOn: ["website-development"],
  },
  {
    slug: "fire-safety-analysis",
    title: "Fire safety data analysis",
    problem:
      "London Fire Brigade attends a high volume of false alarms, and it was not clear which characteristics of a call actually predicted one.",
    built:
      "Cleaning and analysis of the Brigade's open data in Python, exploratory analysis in Tableau, and a decision-tree model to classify incoming calls.",
    result:
      "Identified the key attributes behind false alarms and improved prediction accuracy by 15%.",
    tools: ["Python", "Tableau"],
    featuredOn: ["data-analytics"],
  },
  {
    slug: "predictive-maintenance",
    title: "Predictive maintenance dashboard",
    problem:
      "Industrial equipment was being maintained reactively, so failures surfaced as unplanned downtime rather than scheduled work.",
    built:
      "A Random Forest model predicting failure probability from sensor data, paired with a Power BI dashboard showing equipment health and maintenance schedules.",
    result:
      "Enabled proactive maintenance planning, reducing unplanned downtime by 20% and maintenance costs by 15%.",
    tools: ["Python", "Power BI"],
    featuredOn: ["data-analytics", "systems-improvement"],
  },
];

export function caseStudiesFor(page: CaseStudy["featuredOn"][number]) {
  return caseStudies.filter((study) => study.featuredOn.includes(page));
}
