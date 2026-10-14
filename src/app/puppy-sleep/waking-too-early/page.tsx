import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep/waking-too-early";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WakingTooEarlyPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Sleep", href: "/puppy-sleep/" },
        { label: "Waking Up Too Early", href: "/puppy-sleep/waking-too-early/" },
      ]}
      related={[
        { title: "Puppy Sleep Overview", href: "/puppy-sleep/" },
        { title: "Nighttime Sleep Problems", href: "/puppy-sleep/nighttime-problems/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
      ]}
    />
  );
}
