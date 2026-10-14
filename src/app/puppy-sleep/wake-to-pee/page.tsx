import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep/wake-to-pee";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WakeToPeePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Sleep", href: "/puppy-sleep/" },
        { label: "Wake to Potty?", href: "/puppy-sleep/wake-to-pee/" },
      ]}
      related={[
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Sleep Through the Night", href: "/puppy-sleep/sleep-through-night/" },
        { title: "Nighttime Accidents", href: "/potty-training/nighttime-accidents/" },
        { title: "Puppy Evening Routine", href: "/puppy-schedule/evening-routine/" },
      ]}
    />
  );
}
