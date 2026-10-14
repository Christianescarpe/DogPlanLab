import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/howling";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HowlingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "Puppy Howling", href: "/puppy-barking/howling/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
      ]}
    />
  );
}
