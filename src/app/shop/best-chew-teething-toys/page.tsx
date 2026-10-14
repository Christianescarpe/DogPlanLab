import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/best-chew-teething-toys";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BestChewTeethingToysPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Best Chew & Teething Toys", href: "/shop/best-chew-teething-toys/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Puppy Teething Overview", href: "/puppy-teething/" },
        { title: "Puppy Teething Timeline", href: "/puppy-teething/timeline/" },
        { title: "Puppy Chewing Everything", href: "/puppy-chewing/everything/" },
        { title: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
