import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/calm-settle";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingCalmSettlePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
      ]}
      related={[
        { title: "Puppy Sleep", href: "/puppy-sleep/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Scared of a Sound", href: "/puppy-fear/scared-of-noises/" },
        { title: "Cooperative Care", href: "/puppy-handling/cooperative-care/" },
      ]}
    />
  );
}
