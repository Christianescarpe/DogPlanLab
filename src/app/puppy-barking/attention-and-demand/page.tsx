import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/attention-and-demand";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function AttentionAndDemandPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "Attention & Demand Barking", href: "/puppy-barking/attention-and-demand/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Should You Ignore Barking?", href: "/puppy-barking/should-i-ignore-it/" },
        { title: "Teaching a Quiet Cue", href: "/puppy-barking/quiet-cue/" },
        { title: "Puppy Won't Stop Barking", href: "/puppy-barking/wont-stop/" },
        { title: "Rewards & Motivation", href: "/puppy-training/rewards/" },
      ]}
    />
  );
}
