import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/crate-vs-playpen";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CrateVsPlaypenPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Crate or Playpen?", href: "/shop/crate-vs-playpen/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Where Should a Puppy Sleep?", href: "/puppy-sleep/where-should-puppy-sleep/" },
        { title: "Puppy Crate Size Guide", href: "/shop/crate-size-guide/" },
        { title: "Best Puppy Crates", href: "/shop/best-puppy-crates/" },
        { title: "Best Puppy Playpens", href: "/shop/best-puppy-playpens/" },
      ]}
    />
  );
}
