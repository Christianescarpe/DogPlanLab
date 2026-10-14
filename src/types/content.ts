export type ReviewFlagType = "veterinarian" | "veterinary-behaviorist" | "trainer";

/**
 * Internal record of how a flagged passage was resolved, for the editorial
 * workflow only — not rendered to readers anywhere on the site.
 */
export type ReviewFlagOutcome = "approved-as-written" | "revised" | "removed";

export type ReviewFlag = {
  type: ReviewFlagType;
  note: string;
  outcome?: ReviewFlagOutcome;
};

/**
 * "pass" = editorially complete, sourced, and cleared for publication as
 * written (routine professional sign-off may still be pending, but nothing
 * blocks publishing). "hold" = built and viewable, but a specific
 * professional review (see reviewFlags) must happen before it's presented
 * as fully vetted — kept noindex'd and out of the sitemap until then.
 */
export type ArticleStatus = "pass" | "hold";

export type ArticleFrontmatter = {
  title: string;
  seoTitle?: string;
  description: string;
  slug: string;
  category: string;
  published: boolean;
  updated: string;
  author: string;
  reviewer?: string;
  status: ArticleStatus;
  reviewFlags?: ReviewFlag[];
  primaryCTA?: {
    label: string;
    href: string;
  };
  sources?: { label: string; url?: string }[];
  relatedPages?: string[];
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  content: string;
  filePath: string;
};
