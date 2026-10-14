import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctaHref } from "@/data/nav";

const steps = [
  {
    title: "Tell us about your puppy",
    description: "Age, routine, availability, and the challenge you're facing right now.",
  },
  {
    title: "We build a plan around those answers",
    description:
      "A rules-based engine matches your inputs to age-appropriate, research-backed guidance.",
  },
  {
    title: "Get a plan you can actually follow",
    description: "Top priorities, a daily routine skeleton, and next steps for your challenge.",
  },
];

export function PuppyPlanExplainer() {
  return (
    <section className="border-y border-border bg-accent-light/40 py-16 sm:py-20">
      <Container size="wide" className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            One plan, built around your puppy
          </h2>
          <p className="mt-4 max-w-md text-ink-soft">
            No generic advice. Your Puppy Plan combines your puppy&rsquo;s age, routine, and
            biggest challenge into a single, focused starting point.
          </p>
          <ButtonLink href={ctaHref} className="mt-6">
            Build My Puppy Plan
          </ButtonLink>
        </div>

        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl bg-surface p-5 shadow-sm shadow-ink/[0.03]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
