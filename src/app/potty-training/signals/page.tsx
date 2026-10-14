import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/signals";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PottySignalsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Reading Potty Signals", href: "/potty-training/signals/" },
      ]}
      related={[
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Potty Training Regression", href: "/potty-training/regression/" },
        { title: "Potty Bells", href: "/shop/potty-bells/" },
      ]}
    />
  );
}
