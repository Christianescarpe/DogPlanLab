import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-enrichment/boredom";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BoredomPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Enrichment", href: "/puppy-enrichment/" },
        { label: "Is My Puppy Bored?", href: "/puppy-enrichment/boredom/" },
      ]}
      related={[
        { title: "Puppy Enrichment Overview", href: "/puppy-enrichment/" },
        { title: "Teaching Independent Play", href: "/puppy-enrichment/independent-play/" },
        { title: "Exercise vs. Mental Stimulation", href: "/puppy-exercise/vs-mental-stimulation/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Puppy Chewing Everything", href: "/puppy-chewing/everything/" },
      ]}
    />
  );
}
