import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training/jumping";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TrainingJumpingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Training", href: "/puppy-training/" },
        { label: "Jumping on People", href: "/puppy-training/jumping/" },
      ]}
      related={[
        { title: "Name & Attention", href: "/puppy-training/name/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "First Week With a New Puppy", href: "/new-puppy/first-week/" },
      ]}
    />
  );
}
