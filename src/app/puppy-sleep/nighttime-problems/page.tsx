import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep/nighttime-problems";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppySleepNighttimeProblemsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Sleep", href: "/puppy-sleep/" },
        { label: "Nighttime Problems", href: "/puppy-sleep/nighttime-problems/" },
      ]}
      related={[
        { title: "Puppy Sleep Overview", href: "/puppy-sleep/" },
        { title: "Crying in the Crate at Night", href: "/crate-training/crying-at-night/" },
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Waking Up Too Early", href: "/puppy-sleep/waking-too-early/" },
        { title: "Should You Wake a Sleeping Puppy to Potty?", href: "/puppy-sleep/wake-to-pee/" },
      ]}
    />
  );
}
