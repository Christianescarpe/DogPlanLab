import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/distracted";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingDistractedPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Around Distractions", href: "/puppy-training/distracted/" },
      ]}
      related={[
        { title: "Come", href: "/puppy-training/come/" },
        { title: "Leash Walking & Equipment", href: "/puppy-training/leash/" },
        { title: "Rewards & Treats", href: "/puppy-training/rewards/" },
      ]}
    />
  );
}
