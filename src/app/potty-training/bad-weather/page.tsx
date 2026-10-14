import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/bad-weather";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BadWeatherPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Bad Weather", href: "/potty-training/bad-weather/" },
      ]}
      related={[
        { title: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
        { title: "Won't Poop Outside", href: "/potty-training/wont-poop-outside/" },
        { title: "Apartment Potty Training", href: "/potty-training/apartment/" },
        { title: "How to Tire Out Your Puppy", href: "/puppy-exercise/tire-out-ideas/" },
      ]}
    />
  );
}
