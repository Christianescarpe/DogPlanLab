import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/at-the-door";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function AtTheDoorPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "At the Door & Visitors", href: "/puppy-barking/at-the-door/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Scared of People", href: "/puppy-fear/scared-of-people/" },
        { title: "Fear vs. Excitement", href: "/puppy-body-language/fear-vs-excitement/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "Cooperative Care", href: "/puppy-handling/cooperative-care/" },
      ]}
    />
  );
}
