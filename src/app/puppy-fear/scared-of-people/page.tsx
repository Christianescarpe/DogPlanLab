import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-fear/scared-of-people";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ScaredOfPeoplePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Fear", href: "/puppy-fear/" },
        { label: "Scared of People", href: "/puppy-fear/scared-of-people/" },
      ]}
      related={[
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Socializing With People", href: "/puppy-socialization/people/" },
        { title: "Socializing With Children", href: "/puppy-socialization/children/" },
      ]}
    />
  );
}
