import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/groomer-visit";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingGroomerVisitPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "First Groomer Visit", href: "/puppy-handling/groomer-visit/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Brushing Your Puppy", href: "/puppy-handling/brushing/" },
        { title: "Puppy Nail Trimming", href: "/puppy-handling/nail-trimming/" },
        { title: "Cooperative Care", href: "/puppy-handling/cooperative-care/" },
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
      ]}
    />
  );
}
