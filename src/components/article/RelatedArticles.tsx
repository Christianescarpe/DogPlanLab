import Link from "next/link";

export type RelatedItem = { title: string; href: string };

export function RelatedArticles({ items }: { items: RelatedItem[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Related guides</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink hover:border-accent/40"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
