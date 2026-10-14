import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ShopHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop/" }]}
      related={[
        { title: "Crate or Playpen?", href: "/shop/crate-vs-playpen/" },
        { title: "Puppy Crate Size Guide", href: "/shop/crate-size-guide/" },
        { title: "Best Puppy Crates", href: "/shop/best-puppy-crates/" },
        { title: "Best Puppy Playpens", href: "/shop/best-puppy-playpens/" },
        { title: "Best Enzymatic Cleaners", href: "/shop/best-enzymatic-cleaners/" },
        { title: "Best Chew & Teething Toys", href: "/shop/best-chew-teething-toys/" },
        { title: "Best Puppy Enrichment Toys", href: "/shop/best-enrichment-toys/" },
        { title: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
        { title: "Potty Bells", href: "/shop/potty-bells/" },
        { title: "Puppy Pads", href: "/shop/puppy-pads/" },
        { title: "Puppy Gates", href: "/shop/puppy-gates/" },
        { title: "Puppy Sleep Setup", href: "/shop/puppy-sleep-setup/" },
        { title: "Training Treats & Pouches", href: "/shop/training-treats-and-pouches/" },
        { title: "Leashes & Long Lines", href: "/shop/leashes-and-long-lines/" },
        { title: "Collar or Harness?", href: "/shop/collar-vs-harness/" },
        { title: "Bowls & Slow Feeders", href: "/shop/bowls-and-slow-feeders/" },
        { title: "Nail Clippers & Grinders", href: "/shop/nail-clippers-and-grinders/" },
        { title: "Brushes by Coat Type", href: "/shop/brushes-by-coat-type/" },
        { title: "Puppy-Safe Shampoo", href: "/shop/puppy-safe-shampoo/" },
        { title: "Puppy Monitoring Cameras", href: "/shop/puppy-monitoring-cameras/" },
      ]}
    />
  );
}
