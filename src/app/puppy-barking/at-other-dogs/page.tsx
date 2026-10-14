import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/at-other-dogs";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function AtOtherDogsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "At Other Dogs", href: "/puppy-barking/at-other-dogs/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Scared of Other Dogs", href: "/puppy-fear/scared-of-dogs/" },
        { title: "Socializing With Other Dogs", href: "/puppy-socialization/dogs/" },
        { title: "Training Around Distractions", href: "/puppy-training/distracted/" },
        { title: "Fear vs. Excitement", href: "/puppy-body-language/fear-vs-excitement/" },
      ]}
    />
  );
}
