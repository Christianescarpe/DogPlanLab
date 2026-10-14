import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-enrichment";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function EnrichmentHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Enrichment", href: "/puppy-enrichment/" }]}
      related={[
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Is My Puppy Bored?", href: "/puppy-enrichment/boredom/" },
        { title: "Teaching Independent Play", href: "/puppy-enrichment/independent-play/" },
        { title: "Exercise and Enrichment Before Bed", href: "/puppy-enrichment/before-bed/" },
        { title: "Exercise vs. Mental Stimulation", href: "/puppy-exercise/vs-mental-stimulation/" },
        { title: "Puppy Chewing Everything", href: "/puppy-chewing/everything/" },
        { title: "Puppy Training Overview", href: "/puppy-training/" },
      ]}
    />
  );
}
