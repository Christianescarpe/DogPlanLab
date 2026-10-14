import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-schedule/evening-routine";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function EveningRoutinePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Schedule", href: "/puppy-schedule/" },
        { label: "Evening Routine", href: "/puppy-schedule/evening-routine/" },
      ]}
      related={[
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Puppy Biting At Night", href: "/puppy-biting/at-night/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
        { title: "Nighttime Sleep Problems", href: "/puppy-sleep/nighttime-problems/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "Exercise and Enrichment Before Bed", href: "/puppy-enrichment/before-bed/" },
      ]}
    />
  );
}
