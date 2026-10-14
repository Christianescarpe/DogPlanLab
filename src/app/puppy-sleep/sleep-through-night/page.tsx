import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep/sleep-through-night";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SleepThroughNightPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Sleep", href: "/puppy-sleep/" },
        { label: "Sleep Through the Night", href: "/puppy-sleep/sleep-through-night/" },
      ]}
      related={[
        { title: "Nighttime Sleep Problems", href: "/puppy-sleep/nighttime-problems/" },
        { title: "Should You Wake a Sleeping Puppy to Potty?", href: "/puppy-sleep/wake-to-pee/" },
        { title: "Puppy Evening Routine", href: "/puppy-schedule/evening-routine/" },
        { title: "Crying at Night", href: "/crate-training/crying-at-night/" },
      ]}
    />
  );
}
