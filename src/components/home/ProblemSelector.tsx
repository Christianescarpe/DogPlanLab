import Link from "next/link";
import { Container } from "@/components/ui/Container";

const problems = [
  {
    title: "Potty accidents",
    description: "Accidents, schedules, and getting consistent outside.",
    href: "/potty-training/accidents/",
  },
  {
    title: "Biting",
    description: "Hands, feet, and mouthing that won't stop.",
    href: "/puppy-biting/",
  },
  {
    title: "Crate crying",
    description: "Screaming or whining the second the door shuts.",
    href: "/crate-training/crying/",
  },
  {
    title: "Sleep & nighttime",
    description: "Naps, bedtime, and waking up in the middle of the night.",
    href: "/puppy-sleep/",
  },
  {
    title: "Fear & socialization",
    description: "Nervous around people, dogs, or new places.",
    href: "/puppy-fear/",
  },
  {
    title: "I just brought my puppy home",
    description: "Where to start in the first days and weeks.",
    href: "/new-puppy/first-week/",
  },
];

export function ProblemSelector() {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container size="wide">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Start Where You Are
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          What are you struggling with today?
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <Link
              key={problem.title}
              href={problem.href}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{problem.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-accent group-hover:text-accent-dark">
                Get help &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
