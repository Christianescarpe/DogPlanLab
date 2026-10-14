import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-teething";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyTeethingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Teething", href: "/puppy-teething/" }]}
      related={[
        { title: "Puppy Teething Timeline", href: "/puppy-teething/timeline/" },
        { title: "Puppy Chewing Everything", href: "/puppy-chewing/everything/" },
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Suddenly Biting More", href: "/puppy-biting/suddenly-worse/" },
        { title: "Mouth Handling", href: "/puppy-handling/mouth/" },
        { title: "Teeth Brushing", href: "/puppy-handling/teeth-brushing/" },
        { title: "Best Chew & Teething Toys", href: "/shop/best-chew-teething-toys/" },
      ]}
    />
  );
}
