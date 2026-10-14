import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-fear";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyFearHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Fear", href: "/puppy-fear/" }]}
      related={[
        { title: "Scared of People", href: "/puppy-fear/scared-of-people/" },
        { title: "Scared of Other Dogs", href: "/puppy-fear/scared-of-dogs/" },
        { title: "Scared of a Sound", href: "/puppy-fear/scared-of-noises/" },
        { title: "Bad Experience", href: "/puppy-socialization/bad-experience/" },
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
      ]}
    />
  );
}
