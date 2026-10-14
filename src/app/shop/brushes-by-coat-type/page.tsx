import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/brushes-by-coat-type";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BrushesByCoatTypePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Brushes by Coat Type", href: "/shop/brushes-by-coat-type/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Brushing", href: "/puppy-handling/brushing/" },
        { title: "Puppy-Safe Shampoo", href: "/shop/puppy-safe-shampoo/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
