import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-enrichment/food-enrichment";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function FoodEnrichmentPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Enrichment", href: "/puppy-enrichment/" },
        { label: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
      ]}
      related={[
        { title: "Puppy Enrichment Overview", href: "/puppy-enrichment/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Is My Puppy Bored?", href: "/puppy-enrichment/boredom/" },
        { title: "Best Puppy Enrichment Toys", href: "/shop/best-enrichment-toys/" },
      ]}
    />
  );
}
