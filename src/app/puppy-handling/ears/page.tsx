import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/ears";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingEarsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "Ears", href: "/puppy-handling/ears/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Cooperative Care", href: "/puppy-handling/cooperative-care/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
      ]}
    />
  );
}
