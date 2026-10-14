export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  links: NavLink[];
};

export const primaryNav: NavGroup[] = [
  {
    label: "Puppy Training",
    href: "/new-puppy/",
    links: [
      { label: "New Puppy: First Week", href: "/new-puppy/first-week/" },
      { label: "Puppy Schedule", href: "/puppy-schedule/" },
      { label: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
    ],
  },
  {
    label: "Potty",
    href: "/potty-training/",
    links: [
      { label: "Potty Training Overview", href: "/potty-training/" },
      { label: "Potty Training Schedule", href: "/potty-training/schedule/" },
      {
        label: "Peeing Inside After Going Outside",
        href: "/potty-training/pees-inside-after-going-outside/",
      },
      { label: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
    ],
  },
  {
    label: "Biting",
    href: "/puppy-biting/",
    links: [
      { label: "Puppy Biting Overview", href: "/puppy-biting/" },
      { label: "Biting Hands", href: "/puppy-biting/hands/" },
      { label: "Biting Feet & Ankles", href: "/puppy-biting/feet-ankles/" },
      { label: "Biting At Night", href: "/puppy-biting/at-night/" },
    ],
  },
  {
    label: "Crate",
    href: "/crate-training/",
    links: [
      { label: "Crate Training Overview", href: "/crate-training/" },
      { label: "Crate Training Schedule", href: "/crate-training/schedule/" },
      { label: "Crying in the Crate", href: "/crate-training/crying/" },
      { label: "Crying at Night", href: "/crate-training/crying-at-night/" },
    ],
  },
  {
    label: "Shop",
    href: "/shop/",
    links: [],
  },
  {
    label: "Resources",
    href: "/puppy-socialization-checklist/",
    links: [
      {
        label: "Puppy Socialization Checklist",
        href: "/puppy-socialization-checklist/",
      },
      { label: "Puppy Sleep", href: "/puppy-sleep/" },
      { label: "Puppy Teething", href: "/puppy-teething/" },
      {
        label: "Best Online Puppy Training Programs",
        href: "/best-online-puppy-training-programs/",
      },
      { label: "About Dog Plan Lab", href: "/about/" },
      { label: "Editorial Policy", href: "/editorial-policy/" },
    ],
  },
];

export const footerLinks = {
  guides: [
    { label: "New Puppy", href: "/new-puppy/" },
    { label: "Puppy Schedule", href: "/puppy-schedule/" },
    { label: "Potty Training", href: "/potty-training/" },
    { label: "Puppy Biting", href: "/puppy-biting/" },
    { label: "Crate Training", href: "/crate-training/" },
    { label: "Socialization Checklist", href: "/puppy-socialization-checklist/" },
    { label: "Puppy Gear Shop", href: "/shop/" },
  ],
  company: [
    { label: "About", href: "/about/" },
    { label: "Editorial Policy", href: "/editorial-policy/" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure/" },
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Terms of Use", href: "/terms/" },
  ],
};

export const ctaLabel = "Build My Puppy Plan";
export const ctaHref = "/puppy-plan/";
