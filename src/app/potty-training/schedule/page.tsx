import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/schedule";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PottyScheduleArticlePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Schedule", href: "/potty-training/schedule/" },
      ]}
      related={[
        { title: "Potty Training Overview", href: "/potty-training/" },
        {
          title: "Peeing Inside After Going Outside",
          href: "/potty-training/pees-inside-after-going-outside/",
        },
        { title: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
        { title: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
      ]}
    />
  );
}
