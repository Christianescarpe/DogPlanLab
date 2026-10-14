import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-socialization/sounds";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SocializationSoundsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { label: "Sounds", href: "/puppy-socialization/sounds/" },
      ]}
      related={[
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Scared of a Sound", href: "/puppy-fear/scared-of-noises/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
      ]}
    />
  );
}
