import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-training";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyTrainingHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Training", href: "/puppy-training/" }]}
      related={[
        { title: "First Things to Teach a Puppy", href: "/puppy-training/first-things-to-teach/" },
        { title: "Name & Attention", href: "/puppy-training/name/" },
        { title: "Come", href: "/puppy-training/come/" },
        { title: "Leave It", href: "/puppy-training/leave-it/" },
        { title: "Drop It", href: "/puppy-training/drop-it/" },
        { title: "Sit, Down & Stay", href: "/puppy-training/sit-down-stay/" },
        { title: "Leash Walking & Equipment", href: "/puppy-training/leash/" },
        { title: "Rewards & Treats", href: "/puppy-training/rewards/" },
        { title: "Training Around Distractions", href: "/puppy-training/distracted/" },
        { title: "Jumping on People", href: "/puppy-training/jumping/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
      ]}
    />
  );
}
