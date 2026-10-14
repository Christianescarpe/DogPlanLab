import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/puppy-pads";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyPadsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Puppy Pads", href: "/shop/puppy-pads/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Apartment Potty Training", href: "/potty-training/apartment/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Potty Bells", href: "/shop/potty-bells/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
