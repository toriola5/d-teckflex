/*
  "What this covers" list, shared by the service pages. Plain rows separated by
  hairlines rather than a grid of identical shadowed cards (brief §5).
*/
export type Include = {
  title: string;
  detail: string;
};

export default function ServiceIncludes({
  heading,
  items,
}: {
  heading: string;
  items: Include[];
}) {
  return (
    <section aria-labelledby="includes" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 id="includes" className="text-2xl">
          {heading}
        </h2>

        <ul className="mt-10 max-w-3xl">
          {items.map((item, i) => (
            <li
              key={item.title}
              className={`reveal grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8 ${
                i > 0 ? "border-t border-hairline" : ""
              }`}
            >
              <h3 className="font-display text-base text-ink">{item.title}</h3>
              <p className="max-w-[58ch] text-sm">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
