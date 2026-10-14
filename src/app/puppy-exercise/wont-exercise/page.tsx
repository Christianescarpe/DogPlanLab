import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-exercise/wont-exercise";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WontExercisePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Exercise", href: "/puppy-exercise/" },
        { label: "Won't Exercise", href: "/puppy-exercise/wont-exercise/" },
      ]}
      related={[
        { title: "Puppy Exercise Overview", href: "/puppy-exercise/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Bad Weather Potty Breaks", href: "/potty-training/bad-weather/" },
      ]}
    />
  );
}
