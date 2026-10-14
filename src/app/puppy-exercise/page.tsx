import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-exercise";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ExerciseHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Exercise", href: "/puppy-exercise/" }]}
      related={[
        { title: "Exercise by Age", href: "/puppy-exercise/by-age/" },
        { title: "The Five-Minute Rule, Fact-Checked", href: "/puppy-exercise/five-minute-rule/" },
        { title: "Puppy Won't Exercise", href: "/puppy-exercise/wont-exercise/" },
        { title: "Exercise vs. Mental Stimulation", href: "/puppy-exercise/vs-mental-stimulation/" },
        { title: "How to Tire Out Your Puppy", href: "/puppy-exercise/tire-out-ideas/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
        { title: "Puppy Schedule", href: "/puppy-schedule/" },
      ]}
    />
  );
}
