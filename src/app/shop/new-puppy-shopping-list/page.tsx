import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/new-puppy-shopping-list";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function NewPuppyShoppingListPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "New Puppy: First Week", href: "/new-puppy/first-week/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Crate or Playpen?", href: "/shop/crate-vs-playpen/" },
        { title: "Best Puppy Crates", href: "/shop/best-puppy-crates/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
