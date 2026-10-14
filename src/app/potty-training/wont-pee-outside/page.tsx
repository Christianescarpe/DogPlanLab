import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/wont-pee-outside";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WontPeeOutsidePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
      ]}
      related={[
        {
          title: "Peeing Inside After Going Outside",
          href: "/potty-training/pees-inside-after-going-outside/",
        },
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Won't Poop Outside", href: "/potty-training/wont-poop-outside/" },
        { title: "Puppy Won't Potty in Bad Weather", href: "/potty-training/bad-weather/" },
      ]}
    />
  );
}
