import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-exercise/by-age";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ExerciseByAgePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Exercise", href: "/puppy-exercise/" },
        { label: "Exercise by Age", href: "/puppy-exercise/by-age/" },
      ]}
      related={[
        { title: "Puppy Exercise Overview", href: "/puppy-exercise/" },
        { title: "The Five-Minute Rule, Fact-Checked", href: "/puppy-exercise/five-minute-rule/" },
        { title: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
      ]}
    />
  );
}
