export const siteConfig = {
  name: "Dog Plan Lab",
  domain: "dogplanlab.com",
  url: "https://dogplanlab.com",
  description:
    "Practical, research-backed plans for puppy schedules, potty training, biting, crate training, and everyday puppy life.",
  tagline: "Raising a puppy shouldn't feel like guesswork.",
  // No branded OG/social share image exists yet. Add a real file under
  // /public and set this to its path (e.g. "/og-default.png") once one is
  // created — src/app/layout.tsx picks it up automatically from here.
  ogImage: "",
  social: {
    // Add social profile URLs here when accounts exist.
    instagram: "",
    pinterest: "",
    youtube: "",
  },
  contactEmail: "hello@dogplanlab.com",
} as const;

export type SiteConfig = typeof siteConfig;
