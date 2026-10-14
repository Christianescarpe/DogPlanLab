import type { Metadata } from "next";
import { ArticleFrontmatter } from "@/types/content";
import { siteConfig } from "@/data/site";

export function articleMetadata(frontmatter: ArticleFrontmatter): Metadata {
  const path = `/${frontmatter.slug}/`;
  const title = frontmatter.seoTitle ?? frontmatter.title;

  return {
    title,
    description: frontmatter.description,
    alternates: { canonical: path },
    // HOLD pages are built and viewable but awaiting professional review —
    // keep them out of search results until they clear that review. `follow`
    // stays true so crawlers can still discover the hub/spoke links these
    // articles carry to already-indexed PASS content, rather than treating
    // the whole page as a crawl dead end.
    robots:
      frontmatter.status === "hold"
        ? { index: false, follow: true }
        : { index: true, follow: true },
    openGraph: {
      type: "article",
      title,
      description: frontmatter.description,
      url: `${siteConfig.url}${path}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: frontmatter.description,
    },
  };
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    robots: input.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      title: input.title,
      description: input.description,
      url: `${siteConfig.url}${input.path}`,
    },
  };
}
