import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/crate-size-guide";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CrateSizeGuidePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Crate Size Guide", href: "/shop/crate-size-guide/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Crate Training Schedule", href: "/crate-training/schedule/" },
        { title: "Best Puppy Crates", href: "/shop/best-puppy-crates/" },
      ]}
    />
  );
}
