import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/drop-it";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingDropItPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Drop It", href: "/puppy-training/drop-it/" },
      ]}
      related={[
        { title: "Leave It", href: "/puppy-training/leave-it/" },
        { title: "First Things to Teach", href: "/puppy-training/first-things-to-teach/" },
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
      ]}
    />
  );
}
