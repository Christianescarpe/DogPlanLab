import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-schedule/by-age";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyScheduleByAgePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Schedule", href: "/puppy-schedule/" },
        { label: "By Age", href: "/puppy-schedule/by-age/" },
      ]}
      related={[
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Crate Training", href: "/crate-training/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Exercise by Age", href: "/puppy-exercise/by-age/" },
      ]}
    />
  );
}
