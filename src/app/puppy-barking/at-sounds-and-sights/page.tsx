import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/at-sounds-and-sights";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function AtSoundsAndSightsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "At Sounds & Sights", href: "/puppy-barking/at-sounds-and-sights/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Scared of a Sound", href: "/puppy-fear/scared-of-noises/" },
        { title: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
      ]}
    />
  );
}
