import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-play/fetch";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function FetchPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Play", href: "/puppy-play/" },
        { label: "Playing Fetch", href: "/puppy-play/fetch/" },
      ]}
      related={[
        { title: "Puppy Play Overview", href: "/puppy-play/" },
        { title: "The Five-Minute Rule, Fact-Checked", href: "/puppy-exercise/five-minute-rule/" },
        { title: "Teaching \"Drop It\"", href: "/puppy-training/drop-it/" },
        { title: "Training Around Distractions", href: "/puppy-training/distracted/" },
      ]}
    />
  );
}
