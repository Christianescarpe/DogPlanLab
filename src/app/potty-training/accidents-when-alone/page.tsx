import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/accidents-when-alone";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function AccidentsWhenAlonePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Accidents When Alone", href: "/potty-training/accidents-when-alone/" },
      ]}
      related={[
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Crate Accidents", href: "/potty-training/crate-accidents/" },
        { title: "Frequent Urination", href: "/potty-training/frequent-urination/" },
      ]}
    />
  );
}
