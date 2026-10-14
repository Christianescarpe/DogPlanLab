import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/best-enrichment-toys";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BestEnrichmentToysPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Best Enrichment Toys", href: "/shop/best-enrichment-toys/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Puppy Enrichment Overview", href: "/puppy-enrichment/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Is My Puppy Bored?", href: "/puppy-enrichment/boredom/" },
        { title: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
