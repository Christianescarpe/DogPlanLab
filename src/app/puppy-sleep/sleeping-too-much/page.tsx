import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep/sleeping-too-much";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SleepingTooMuchPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Sleep", href: "/puppy-sleep/" },
        { label: "Sleeping Too Much", href: "/puppy-sleep/sleeping-too-much/" },
      ]}
      related={[
        { title: "Puppy Sleep Overview", href: "/puppy-sleep/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
      ]}
    />
  );
}
