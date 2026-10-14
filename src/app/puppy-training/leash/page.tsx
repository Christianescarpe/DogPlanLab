import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/leash";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingLeashPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Leash Walking & Equipment", href: "/puppy-training/leash/" },
      ]}
      related={[
        { title: "Rewards & Treats", href: "/puppy-training/rewards/" },
        { title: "Training Around Distractions", href: "/puppy-training/distracted/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Leashes & Long Lines", href: "/shop/leashes-and-long-lines/" },
        { title: "Collar or Harness?", href: "/shop/collar-vs-harness/" },
      ]}
    />
  );
}
