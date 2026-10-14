import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-enrichment/before-bed";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BeforeBedPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Enrichment", href: "/puppy-enrichment/" },
        { label: "Before Bed", href: "/puppy-enrichment/before-bed/" },
      ]}
      related={[
        { title: "Puppy Evening Routine", href: "/puppy-schedule/evening-routine/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
      ]}
    />
  );
}
