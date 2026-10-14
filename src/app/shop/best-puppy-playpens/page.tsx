import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/best-puppy-playpens";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BestPuppyPlaypensPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Best Puppy Playpens", href: "/shop/best-puppy-playpens/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Crate or Playpen?", href: "/shop/crate-vs-playpen/" },
        { title: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
