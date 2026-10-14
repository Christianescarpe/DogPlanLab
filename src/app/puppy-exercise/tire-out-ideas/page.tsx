import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-exercise/tire-out-ideas";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TireOutIdeasPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Exercise", href: "/puppy-exercise/" },
        { label: "How to Tire Out Your Puppy", href: "/puppy-exercise/tire-out-ideas/" },
      ]}
      related={[
        { title: "Puppy Exercise Overview", href: "/puppy-exercise/" },
        { title: "Exercise vs. Mental Stimulation", href: "/puppy-exercise/vs-mental-stimulation/" },
        { title: "Playing Tug", href: "/puppy-play/tug/" },
        { title: "Playing Fetch", href: "/puppy-play/fetch/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Puppy Training Overview", href: "/puppy-training/" },
        { title: "Bad Weather Potty Breaks", href: "/potty-training/bad-weather/" },
      ]}
    />
  );
}
