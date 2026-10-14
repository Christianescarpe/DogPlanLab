import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-chewing/everything";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyChewingEverythingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Chewing Everything", href: "/puppy-chewing/everything/" },
      ]}
      related={[
        { title: "Puppy Teething", href: "/puppy-teething/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Puppy Enrichment Overview", href: "/puppy-enrichment/" },
        { title: "Is My Puppy Bored?", href: "/puppy-enrichment/boredom/" },
        { title: "Best Chew & Teething Toys", href: "/shop/best-chew-teething-toys/" },
      ]}
    />
  );
}
