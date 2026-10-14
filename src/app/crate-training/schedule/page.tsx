import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "crate-training/schedule";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CrateScheduleArticlePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Crate Training", href: "/crate-training/" },
        { label: "Schedule", href: "/crate-training/schedule/" },
      ]}
      related={[
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Crying at Night", href: "/crate-training/crying-at-night/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
      ]}
    />
  );
}
