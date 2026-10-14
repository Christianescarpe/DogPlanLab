import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-sleep/overtired";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function OvertiredPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Sleep", href: "/puppy-sleep/" },
        { label: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
      ]}
      related={[
        { title: "Puppy Sleep Overview", href: "/puppy-sleep/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "Puppy Evening Routine", href: "/puppy-schedule/evening-routine/" },
        { title: "Puppy Biting At Night", href: "/puppy-biting/at-night/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
        { title: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
      ]}
    />
  );
}
