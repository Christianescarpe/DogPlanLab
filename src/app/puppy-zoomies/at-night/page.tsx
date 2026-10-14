import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-zoomies/at-night";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyZoomiesAtNightPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
      ]}
      related={[
        { title: "Puppy Biting At Night", href: "/puppy-biting/at-night/" },
        { title: "Puppy Sleep", href: "/puppy-sleep/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Puppy Evening Routine", href: "/puppy-schedule/evening-routine/" },
        { title: "Puppy Exercise Overview", href: "/puppy-exercise/" },
        { title: "The Five-Minute Rule, Fact-Checked", href: "/puppy-exercise/five-minute-rule/" },
      ]}
    />
  );
}
