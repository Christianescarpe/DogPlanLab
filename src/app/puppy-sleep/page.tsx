import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppySleepPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Sleep", href: "/puppy-sleep/" }]}
      related={[
        { title: "Nighttime Sleep Problems", href: "/puppy-sleep/nighttime-problems/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Crate Training", href: "/crate-training/" },
        { title: "Puppy Biting At Night", href: "/puppy-biting/at-night/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Is My Puppy Sleeping Too Much?", href: "/puppy-sleep/sleeping-too-much/" },
        { title: "Puppy Sleep Setup", href: "/shop/puppy-sleep-setup/" },
      ]}
    />
  );
}
