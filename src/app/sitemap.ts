import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getPublishedArticles } from "@/lib/content";

// Routes not backed by an MDX article in /content. Excludes
// /best-online-puppy-training-programs/, which is noindex — see its page.tsx.
const nonArticlePaths = [
  "/",
  "/puppy-plan/",
  "/about/",
  "/editorial-policy/",
  "/affiliate-disclosure/",
  "/privacy/",
  "/terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = nonArticlePaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/puppy-plan/" ? 0.9 : 0.7,
  }));

  // HOLD articles are built and viewable but excluded from the sitemap
  // until they clear the professional review noted in their frontmatter.
  const articleEntries: MetadataRoute.Sitemap = getPublishedArticles()
    .filter((article) => article.frontmatter.status !== "hold")
    .map((article) => ({
      url: `${siteConfig.url}/${article.frontmatter.slug}/`,
      lastModified: new Date(article.frontmatter.updated),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticEntries, ...articleEntries];
}
