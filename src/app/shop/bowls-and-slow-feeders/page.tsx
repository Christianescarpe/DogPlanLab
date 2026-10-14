import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/bowls-and-slow-feeders";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BowlsAndSlowFeedersPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Bowls & Slow Feeders", href: "/shop/bowls-and-slow-feeders/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Best Puppy Enrichment Toys", href: "/shop/best-enrichment-toys/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
