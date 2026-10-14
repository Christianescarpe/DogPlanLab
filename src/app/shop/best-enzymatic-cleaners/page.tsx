import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/best-enzymatic-cleaners";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BestEnzymaticCleanersPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Best Enzymatic Cleaners", href: "/shop/best-enzymatic-cleaners/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Keeps Having Accidents", href: "/potty-training/accidents/" },
        { title: "Peeing Inside After Going Outside", href: "/potty-training/pees-inside-after-going-outside/" },
        { title: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
