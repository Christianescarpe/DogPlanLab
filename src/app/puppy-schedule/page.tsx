import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-schedule";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyScheduleHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Schedule", href: "/puppy-schedule/" }]}
      related={[
        { title: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
        { title: "Potty Training", href: "/potty-training/" },
        { title: "Crate Training", href: "/crate-training/" },
        { title: "Puppy Evening Routine", href: "/puppy-schedule/evening-routine/" },
        { title: "Bowls & Slow Feeders", href: "/shop/bowls-and-slow-feeders/" },
      ]}
    />
  );
}
