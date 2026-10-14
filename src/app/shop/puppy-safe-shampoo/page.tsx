import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/puppy-safe-shampoo";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppySafeShampooPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Puppy-Safe Shampoo", href: "/shop/puppy-safe-shampoo/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Your Puppy's First Bath", href: "/puppy-handling/bathing/" },
        { title: "Brushes by Coat Type", href: "/shop/brushes-by-coat-type/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
