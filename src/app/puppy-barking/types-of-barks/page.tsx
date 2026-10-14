import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/types-of-barks";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TypesOfBarksPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "What Your Puppy's Bark Means", href: "/puppy-barking/types-of-barks/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Attention & Demand Barking", href: "/puppy-barking/attention-and-demand/" },
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
      ]}
    />
  );
}
