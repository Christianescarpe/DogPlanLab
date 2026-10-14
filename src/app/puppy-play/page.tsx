import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-play";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PlayHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Play", href: "/puppy-play/" }]}
      related={[
        { title: "Puppy Doesn't Want to Play", href: "/puppy-play/doesnt-want-to-play/" },
        { title: "Is Tug-of-War Bad for Your Puppy?", href: "/puppy-play/tug/" },
        { title: "Playing Fetch With Your Puppy", href: "/puppy-play/fetch/" },
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Play or Fighting?", href: "/puppy-body-language/play-or-fighting/" },
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
      ]}
    />
  );
}
