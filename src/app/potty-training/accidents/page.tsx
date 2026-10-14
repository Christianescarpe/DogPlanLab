import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/accidents";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PottyAccidentsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Keeps Having Accidents", href: "/potty-training/accidents/" },
      ]}
      related={[
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Peeing Inside After Going Outside", href: "/potty-training/pees-inside-after-going-outside/" },
        { title: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
        { title: "Potty Training Regression", href: "/potty-training/regression/" },
        { title: "Crate Accidents", href: "/potty-training/crate-accidents/" },
        { title: "Best Enzymatic Cleaners", href: "/shop/best-enzymatic-cleaners/" },
      ]}
    />
  );
}
