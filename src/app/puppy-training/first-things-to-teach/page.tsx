import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/first-things-to-teach";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function FirstThingsToTeachPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "First Things to Teach", href: "/puppy-training/first-things-to-teach/" },
      ]}
      related={[
        { title: "Puppy Training Overview", href: "/puppy-training/" },
        { title: "Name & Attention", href: "/puppy-training/name/" },
        { title: "Come", href: "/puppy-training/come/" },
        { title: "Leave It", href: "/puppy-training/leave-it/" },
        { title: "Drop It", href: "/puppy-training/drop-it/" },
      ]}
    />
  );
}
