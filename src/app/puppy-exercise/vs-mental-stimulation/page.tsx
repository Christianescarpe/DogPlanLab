import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-exercise/vs-mental-stimulation";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function VsMentalStimulationPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Exercise", href: "/puppy-exercise/" },
        { label: "Exercise vs. Mental Stimulation", href: "/puppy-exercise/vs-mental-stimulation/" },
      ]}
      related={[
        { title: "Puppy Exercise Overview", href: "/puppy-exercise/" },
        { title: "Puppy Enrichment Overview", href: "/puppy-enrichment/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
      ]}
    />
  );
}
