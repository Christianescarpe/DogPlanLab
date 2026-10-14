import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/at-night";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BitingAtNightPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "At Night", href: "/puppy-biting/at-night/" },
      ]}
      related={[
        { title: "Biting Hands", href: "/puppy-biting/hands/" },
        { title: "Biting Feet & Ankles", href: "/puppy-biting/feet-ankles/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
        { title: "Puppy Evening Routine", href: "/puppy-schedule/evening-routine/" },
      ]}
    />
  );
}
