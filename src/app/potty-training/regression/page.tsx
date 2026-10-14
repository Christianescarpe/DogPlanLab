import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/regression";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PottyRegressionPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Regression", href: "/potty-training/regression/" },
      ]}
      related={[
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Keeps Having Accidents", href: "/potty-training/accidents/" },
        { title: "Frequent Urination", href: "/potty-training/frequent-urination/" },
      ]}
    />
  );
}
