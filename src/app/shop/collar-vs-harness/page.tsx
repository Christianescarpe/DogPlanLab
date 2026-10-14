import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/collar-vs-harness";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CollarVsHarnessPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Collar or Harness?", href: "/shop/collar-vs-harness/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Leash Walking & Equipment", href: "/puppy-training/leash/" },
        { title: "Leashes & Long Lines", href: "/shop/leashes-and-long-lines/" },
      ]}
    />
  );
}
