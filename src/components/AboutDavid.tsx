/*
  Copy is verbatim from project-brief.md §6, marked there as final.

  Note the employer is intentionally "a UK organisation": the brief keeps this
  brand separate from David's day job. Do not substitute a real employer name
  unless he asks for it.
*/
const skills = [
  "Python",
  "SQL",
  "React",
  "Node.js",
  "Power BI",
  "Tableau",
  "Microsoft 365 administration",
];

export default function AboutDavid() {
  return (
    <section aria-labelledby="about" className="bg-ink text-canvas">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 id="about" className="text-2xl text-canvas">
              Who you&rsquo;ll be working with
            </h2>
            {/* text-muted is tuned for the canvas; on ink it drops to 3.58:1. */}
            <p className="mt-4 max-w-[34ch] text-sm text-hairline opacity-80">
              Not an agency. One person, accountable for the work.
            </p>
          </div>

          <div className="reveal space-y-5 text-hairline">
            <p className="max-w-[68ch]">
              I&rsquo;m David, a data and technology professional who builds
              practical digital solutions for small businesses and founders.
            </p>
            <p className="max-w-[68ch]">
              My background spans quality assurance, data analysis, and
              full-stack development. I hold an MSc in Data Science and have led
              quality monitoring and process improvement work for a UK
              organisation, alongside freelance web development and analytics
              projects for clients through Fiverr, building dashboards,
              automating reporting, and developing responsive web applications
              with React and Node.js.
            </p>
            <p className="max-w-[68ch]">
              I like solving real problems: turning messy data into a dashboard
              someone actually checks every week, fixing a workflow that&rsquo;s
              been quietly wasting time, or building a site that does its job
              without fuss. Whether it&rsquo;s your first website or your fifth
              system that needs cleaning up, I bring the same practical,
              detail-first approach.
            </p>

            <div className="pt-4">
              <h3 className="font-display text-sm text-canvas">Skills</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-graphite px-2.5 py-1 text-sm text-hairline"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
