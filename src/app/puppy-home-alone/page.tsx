import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-home-alone";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyHomeAlonePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Home Alone", href: "/puppy-home-alone/" }]}
      related={[
        { title: "Crate Training Schedule", href: "/crate-training/schedule/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "New Puppy Guide", href: "/new-puppy/" },
        { title: "Teaching \"Come\"", href: "/puppy-training/come/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "Accidents When Left Alone", href: "/potty-training/accidents-when-alone/" },
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Why Does My Puppy Howl?", href: "/puppy-barking/howling/" },
        { title: "Food Enrichment", href: "/puppy-enrichment/food-enrichment/" },
        { title: "Teaching Independent Play", href: "/puppy-enrichment/independent-play/" },
        { title: "Puppy Monitoring Cameras", href: "/shop/puppy-monitoring-cameras/" },
      ]}
    />
  );
}
