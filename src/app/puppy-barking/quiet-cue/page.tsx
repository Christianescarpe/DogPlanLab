import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/quiet-cue";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function QuietCuePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "Teaching a Quiet Cue", href: "/puppy-barking/quiet-cue/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Should You Ignore Barking?", href: "/puppy-barking/should-i-ignore-it/" },
        { title: "Training Around Distractions", href: "/puppy-training/distracted/" },
        { title: "Rewards & Motivation", href: "/puppy-training/rewards/" },
      ]}
    />
  );
}
