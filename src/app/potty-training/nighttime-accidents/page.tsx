import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/nighttime-accidents";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function NighttimeAccidentsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Nighttime Accidents", href: "/potty-training/nighttime-accidents/" },
      ]}
      related={[
        { title: "Crying at Night", href: "/crate-training/crying-at-night/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Frequent Urination", href: "/potty-training/frequent-urination/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
      ]}
    />
  );
}
