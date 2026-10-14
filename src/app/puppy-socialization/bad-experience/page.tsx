import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-socialization/bad-experience";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SocializationBadExperiencePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Bad Experience", href: "/puppy-socialization/bad-experience/" },
      ]}
      related={[
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Socializing With Other Dogs", href: "/puppy-socialization/dogs/" },
        { title: "Socializing With People", href: "/puppy-socialization/people/" },
      ]}
    />
  );
}
