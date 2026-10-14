import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/puppy-gates";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyGatesPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Puppy Gates", href: "/shop/puppy-gates/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Apartment Potty Training", href: "/potty-training/apartment/" },
        { title: "Crate or Playpen?", href: "/shop/crate-vs-playpen/" },
        { title: "Best Puppy Playpens", href: "/shop/best-puppy-playpens/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
