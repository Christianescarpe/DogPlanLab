import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/leave-it";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingLeaveItPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Leave It", href: "/puppy-training/leave-it/" },
      ]}
      related={[
        { title: "Drop It", href: "/puppy-training/drop-it/" },
        { title: "First Things to Teach", href: "/puppy-training/first-things-to-teach/" },
        { title: "Rewards & Treats", href: "/puppy-training/rewards/" },
      ]}
    />
  );
}
