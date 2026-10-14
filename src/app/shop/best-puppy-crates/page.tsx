import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/best-puppy-crates";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BestPuppyCratesPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Best Puppy Crates", href: "/shop/best-puppy-crates/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Crate Training Schedule", href: "/crate-training/schedule/" },
        { title: "Puppy Crate Size Guide", href: "/shop/crate-size-guide/" },
        { title: "Crate or Playpen?", href: "/shop/crate-vs-playpen/" },
        { title: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
