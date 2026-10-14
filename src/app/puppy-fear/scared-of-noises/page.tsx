import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-fear/scared-of-noises";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ScaredOfNoisesPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Fear", href: "/puppy-fear/" },
        { label: "Scared of a Sound", href: "/puppy-fear/scared-of-noises/" },
      ]}
      related={[
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Socializing to Sounds", href: "/puppy-socialization/sounds/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
      ]}
    />
  );
}
