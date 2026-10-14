import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/sit-down-stay";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingSitDownStayPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Sit, Down & Stay", href: "/puppy-training/sit-down-stay/" },
      ]}
      related={[
        { title: "First Things to Teach", href: "/puppy-training/first-things-to-teach/" },
        { title: "Rewards & Treats", href: "/puppy-training/rewards/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
      ]}
    />
  );
}
