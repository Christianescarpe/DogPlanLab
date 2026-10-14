import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep/where-should-puppy-sleep";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WhereShouldPuppySleepPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Sleep", href: "/puppy-sleep/" },
        { label: "Where Should Puppy Sleep", href: "/puppy-sleep/where-should-puppy-sleep/" },
      ]}
      related={[
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Puppy Sleep Overview", href: "/puppy-sleep/" },
        { title: "Sleep Through the Night", href: "/puppy-sleep/sleep-through-night/" },
      ]}
    />
  );
}
