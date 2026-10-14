import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/potty-bells";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PottyBellsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Potty Bells", href: "/shop/potty-bells/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Reading Potty Signals", href: "/potty-training/signals/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Washable vs. Disposable Puppy Pads", href: "/shop/puppy-pads/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
