import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "crate-training/crying-at-night";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function CryingAtNightPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Crate Training", href: "/crate-training/" },
        { label: "Crying at Night", href: "/crate-training/crying-at-night/" },
      ]}
      related={[
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Crate Training Schedule", href: "/crate-training/schedule/" },
        { title: "First Week With a New Puppy", href: "/new-puppy/first-week/" },
        { title: "Puppy Sleep: Nighttime Problems", href: "/puppy-sleep/nighttime-problems/" },
        { title: "Nighttime Accidents", href: "/potty-training/nighttime-accidents/" },
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
      ]}
    />
  );
}
