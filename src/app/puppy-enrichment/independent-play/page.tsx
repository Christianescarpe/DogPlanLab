import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-enrichment/independent-play";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function IndependentPlayPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Enrichment", href: "/puppy-enrichment/" },
        { label: "Teaching Independent Play", href: "/puppy-enrichment/independent-play/" },
      ]}
      related={[
        { title: "Puppy Enrichment Overview", href: "/puppy-enrichment/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Rewards & Motivation", href: "/puppy-training/rewards/" },
      ]}
    />
  );
}
