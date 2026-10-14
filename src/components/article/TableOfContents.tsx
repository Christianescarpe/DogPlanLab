import { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-surface p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">On this page</p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : undefined}>
            <a
              href={`#${item.id}`}
              className="border-l-2 border-transparent pl-3 -ml-3 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
