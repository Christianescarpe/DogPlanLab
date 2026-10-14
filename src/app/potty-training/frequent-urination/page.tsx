import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/frequent-urination";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function FrequentUrinationPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Frequent Urination", href: "/potty-training/frequent-urination/" },
      ]}
      related={[
        { title: "Potty Training Regression", href: "/potty-training/regression/" },
        { title: "Keeps Having Accidents", href: "/potty-training/accidents/" },
        { title: "Excitement & Submissive Urination", href: "/potty-training/excitement-submissive-urination/" },
      ]}
    />
  );
}
