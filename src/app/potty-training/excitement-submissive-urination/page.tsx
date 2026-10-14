import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/excitement-submissive-urination";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ExcitementSubmissiveUrinationPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Excitement & Submissive Urination", href: "/potty-training/excitement-submissive-urination/" },
      ]}
      related={[
        { title: "Peeing Inside After Going Outside", href: "/potty-training/pees-inside-after-going-outside/" },
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Frequent Urination", href: "/potty-training/frequent-urination/" },
      ]}
    />
  );
}
