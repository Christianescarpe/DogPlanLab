import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/wont-poop-outside";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WontPoopOutsidePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Won't Poop Outside", href: "/potty-training/wont-poop-outside/" },
      ]}
      related={[
        { title: "Peeing Inside After Going Outside", href: "/potty-training/pees-inside-after-going-outside/" },
        { title: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
      ]}
    />
  );
}
