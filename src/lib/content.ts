import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Article, ArticleFrontmatter } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMdxFile(filePath: string): Article {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as ArticleFrontmatter,
    content,
    filePath,
  };
}

/** `slug` is the full route path without leading/trailing slashes, e.g. "new-puppy/first-week". */
export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readMdxFile(filePath);
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }
  };
  walk(CONTENT_DIR);

  return files.map(readMdxFile);
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((article) => article.frontmatter.published);
}

export function getArticlesByCategory(category: string): Article[] {
  return getPublishedArticles().filter((article) => article.frontmatter.category === category);
}
