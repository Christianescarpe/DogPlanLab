import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "potty-training/apartment";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ApartmentPottyPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Potty Training", href: "/potty-training/" },
        { label: "Apartment Potty Training", href: "/potty-training/apartment/" },
      ]}
      related={[
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Potty Training Schedule", href: "/potty-training/schedule/" },
        { title: "Before Full Vaccination", href: "/puppy-socialization/before-vaccinations/" },
        { title: "Washable vs. Disposable Puppy Pads", href: "/shop/puppy-pads/" },
        { title: "Puppy Gates", href: "/shop/puppy-gates/" },
      ]}
    />
  );
}
