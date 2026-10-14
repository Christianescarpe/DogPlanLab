import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/cooperative-care";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingCooperativeCarePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "Cooperative Care", href: "/puppy-handling/cooperative-care/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "Preparing for Vet Visits", href: "/puppy-handling/vet-visits/" },
        { title: "Preparing for the Groomer", href: "/puppy-handling/groomer-visit/" },
      ]}
    />
  );
}
