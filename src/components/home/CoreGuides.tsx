import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const guides = [
  {
    category: "New Puppy",
    title: "Your Puppy's First Week Home",
    description: "What to set up before you arrive and how to get through day one.",
    href: "/new-puppy/first-week/",
  },
  {
    category: "Schedule",
    title: "Daily Puppy Schedule",
    description: "A wake-to-bedtime rhythm for potty, meals, naps, and play.",
    href: "/puppy-schedule/",
  },
  {
    category: "Potty Training",
    title: "How to Potty Train a Puppy",
    description: "The core method, plus what to do when accidents keep happening.",
    href: "/potty-training/",
  },
  {
    category: "Biting",
    title: "Why Puppies Bite Hands",
    description: "Why it happens and how to redirect it without escalating.",
    href: "/puppy-biting/hands/",
  },
  {
    category: "Crate Training",
    title: "Crate Training Schedule",
    description: "A step-by-step pace for building real crate comfort.",
    href: "/crate-training/schedule/",
  },
  {
    category: "Resources",
    title: "Puppy Socialization Checklist",
    description: "Safe, positive exposure to people, sounds, and places.",
    href: "/puppy-socialization-checklist/",
  },
];

export function CoreGuides() {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Core guides
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/40"
            >
              <Badge tone="accent">{guide.category}</Badge>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{guide.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{guide.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
