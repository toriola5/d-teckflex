import type { CaseStudy } from "@/data/caseStudies";

/*
  Deliberately not a rounded card with a drop shadow — brief §5 rules those out.
  A hairline border, a flat surface, and the problem/built/result rhythm carried
  by small muted labels.
*/
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const rows = [
    { label: "Problem", value: study.problem },
    { label: "Built", value: study.built },
    { label: "Result", value: study.result },
  ];

  return (
    <article className="reveal flex h-full flex-col border border-hairline p-7">
      <h3 className="text-lg">{study.title}</h3>

      <dl className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="mt-1 max-w-[52ch] text-sm">{row.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 flex flex-wrap gap-2 pt-1">
        {study.tools.map((tool) => (
          <li
            key={tool}
            className="border border-hairline px-2.5 py-1 text-sm text-muted"
          >
            {tool}
          </li>
        ))}
      </ul>
    </article>
  );
}
