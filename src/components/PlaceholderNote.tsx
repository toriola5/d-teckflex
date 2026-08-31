/*
  A visible, unmistakable gap marker — brief §7: leave placeholders clearly
  marked rather than inventing client work.

  Styled to look like an unfinished patch rather than content, so it cannot be
  mistaken for a real section if the site goes live with it still in place.
  Either fill it in or delete the component usage before launch.
*/
export default function PlaceholderNote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-2xl border-2 border-dashed border-hairline p-6">
          <p className="font-display text-sm text-ink">[ADD REAL EXAMPLE]</p>
          <p className="mt-2 max-w-[58ch] text-sm text-muted">{children}</p>
        </div>
      </div>
    </section>
  );
}
