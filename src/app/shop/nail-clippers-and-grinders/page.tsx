import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/nail-clippers-and-grinders";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function NailClippersAndGrindersPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Nail Clippers & Grinders", href: "/shop/nail-clippers-and-grinders/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Nail Trimming", href: "/puppy-handling/nail-trimming/" },
        { title: "Touching Your Puppy's Paws", href: "/puppy-handling/paws/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
