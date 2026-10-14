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
    const trimmed = line.trim();
    const mdMatch = /^(##|###)\s+(.*)$/.exec(trimmed);
    if (mdMatch) {
      const depth = mdMatch[1].length === 2 ? 2 : 3;
      let text = mdMatch[2].trim();
      let id = slugifyHeading(text);
      // Check for markdown anchor syntax e.g. ## Heading {#custom-id}
      const anchorMatch = /^(.*?)\s*\{#([a-zA-Z0-9_-]+)\}\s*$/.exec(text);
      if (anchorMatch) {
        text = anchorMatch[1].trim();
        id = anchorMatch[2].trim();
      }
      items.push({ id, text, depth });
      continue;
    }

    const htmlMatch = /^<(h2|h3)(?:\s+id=["']([^"']+)["'])?[^>]*>(.*?)<\/\1>$/i.exec(trimmed);
    if (htmlMatch) {
      const depth = htmlMatch[1].toLowerCase() === "h2" ? 2 : 3;
      const explicitId = htmlMatch[2];
      const text = htmlMatch[3].replace(/<[^>]+>/g, "").trim();
      const id = explicitId || slugifyHeading(text);
      items.push({ id, text, depth });
    }
  }

  return items;
}
