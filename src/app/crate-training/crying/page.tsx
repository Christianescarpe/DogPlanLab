import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "crate-training/crying";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CryingInCratePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Crate Training", href: "/crate-training/" },
        { label: "Crying", href: "/crate-training/crying/" },
      ]}
      related={[
        { title: "Crate Training Schedule", href: "/crate-training/schedule/" },
        { title: "Crying at Night", href: "/crate-training/crying-at-night/" },
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Puppy Monitoring Cameras", href: "/shop/puppy-monitoring-cameras/" },
      ]}
    />
  );
}
