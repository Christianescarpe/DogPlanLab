import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/puppy-monitoring-cameras";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyMonitoringCamerasPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Monitoring Cameras", href: "/shop/puppy-monitoring-cameras/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Should You Wake a Sleeping Puppy to Potty?", href: "/puppy-sleep/wake-to-pee/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
