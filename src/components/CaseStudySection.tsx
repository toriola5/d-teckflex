import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudiesFor, type CaseStudy } from "@/data/caseStudies";

/*
  Pulls the examples tagged for this page out of the shared data module, so the
  copy lives in exactly one place.

  Renders nothing when there is no real example for a page — brief §7 forbids
  inventing client work, and an empty section is better than a fabricated one.
  Use PlaceholderNote to flag the gap instead.
*/
export default function CaseStudySection({
  page,
  heading = "Selected work",
}: {
  page: CaseStudy["featuredOn"][number];
  heading?: string;
}) {
  const studies = caseStudiesFor(page);
  if (studies.length === 0) return null;

  return (
    <section aria-labelledby="work" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 id="work" className="text-2xl">
          {heading}
        </h2>
        <div
          className={`mt-10 grid gap-6 ${
            studies.length > 1 ? "lg:grid-cols-2" : "max-w-2xl"
          }`}
        >
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
