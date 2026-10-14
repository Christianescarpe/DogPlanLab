import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/crate-accidents";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CrateAccidentsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Crate Accidents", href: "/potty-training/crate-accidents/" },
      ]}
      related={[
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Crate Training Schedule", href: "/crate-training/schedule/" },
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Crying at Night", href: "/crate-training/crying-at-night/" },
        { title: "Potty Training Overview", href: "/potty-training/" },
      ]}
    />
  );
}
