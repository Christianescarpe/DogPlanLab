import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/training-treats-and-pouches";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingTreatsAndPouchesPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Training Treats & Pouches", href: "/shop/training-treats-and-pouches/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Puppy Training: Rewards", href: "/puppy-training/rewards/" },
        { title: "Training Around Distractions", href: "/puppy-training/distracted/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
