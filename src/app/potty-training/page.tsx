import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PottyTrainingHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Potty Training", href: "/potty-training/" }]}
      related={[
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Reading Potty Signals", href: "/potty-training/signals/" },
        {
          title: "Peeing Inside After Going Outside",
          href: "/potty-training/pees-inside-after-going-outside/",
        },
        { title: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
        { title: "Crate Training", href: "/crate-training/" },
        { title: "Keeps Having Accidents", href: "/potty-training/accidents/" },
        { title: "Potty Training Regression", href: "/potty-training/regression/" },
      ]}
    />
  );
}
