import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ctaHref } from "@/data/nav";

const pillars = [
  {
    eyebrow: "01",
    title: "Personalized Plans",
    description:
      "Answer a few quick questions and get a routine built around your puppy's age, schedule, and biggest challenge right now.",
    linkLabel: "Build my plan",
    href: ctaHref,
  },
  {
    eyebrow: "02",
    title: "Expert Journal",
    description:
      "Research-backed guides on potty training, biting, crate training, sleep, socialization, and everyday puppy life.",
    linkLabel: "Start reading",
    href: "/new-puppy/",
  },
  {
    eyebrow: "03",
    title: "Curated Gear",
    description:
      "Buyer guides for crates, cleanup, chew toys, and more — organized by what you're actually trying to solve. No live product links yet.",
    linkLabel: "Browse the shop",
    href: "/shop/",
  },
];

export function StruggleCards() {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-accent/25">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="sm:px-8 first:sm:pl-0 last:sm:pr-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {pillar.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold text-ink sm:text-2xl">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-dark"
              >
                {pillar.linkLabel} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
