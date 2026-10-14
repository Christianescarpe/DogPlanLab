import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "crate-training";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CrateTrainingHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Crate Training", href: "/crate-training/" }]}
      related={[
        { title: "Crate Training Schedule", href: "/crate-training/schedule/" },
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Crying at Night", href: "/crate-training/crying-at-night/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "Crate Accidents", href: "/potty-training/crate-accidents/" },
        { title: "Where Should a Puppy Sleep?", href: "/puppy-sleep/where-should-puppy-sleep/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Crate or Playpen?", href: "/shop/crate-vs-playpen/" },
        { title: "Puppy Crate Size Guide", href: "/shop/crate-size-guide/" },
        { title: "Best Puppy Crates", href: "/shop/best-puppy-crates/" },
        { title: "Puppy Sleep Setup", href: "/shop/puppy-sleep-setup/" },
      ]}
    />
  );
}
