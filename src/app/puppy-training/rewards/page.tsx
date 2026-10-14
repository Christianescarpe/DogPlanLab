import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/rewards";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingRewardsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Rewards & Treats", href: "/puppy-training/rewards/" },
      ]}
      related={[
        { title: "Puppy Training Overview", href: "/puppy-training/" },
        { title: "Name & Attention", href: "/puppy-training/name/" },
        { title: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
        { title: "Training Treats & Pouches", href: "/shop/training-treats-and-pouches/" },
      ]}
    />
  );
}
