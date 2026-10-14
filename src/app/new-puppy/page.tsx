import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "new-puppy";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function NewPuppyHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "New Puppy", href: "/new-puppy/" }]}
      related={[
        { title: "First Week Home", href: "/new-puppy/first-week/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Potty Training", href: "/potty-training/" },
        { title: "Crate Training", href: "/crate-training/" },
        { title: "Puppy Biting", href: "/puppy-biting/" },
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Puppy Teething", href: "/puppy-teething/" },
        { title: "Puppy Training", href: "/puppy-training/" },
      ]}
    />
  );
}
