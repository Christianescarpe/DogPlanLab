export type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Extracts H2/H3 headings from raw markdown/MDX source for a table of contents. */
export function extractToc(source: string): TocItem[] {
  const lines = source.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;

    const depth = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    items.push({ id: slugifyHeading(text), text, depth });
  }

  return items;
}
