import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroArt } from "@/components/home/HeroArt";
import { ctaHref } from "@/data/nav";

export function Hero() {
  return (
    <section className="border-b border-border bg-paper">
      <Container size="wide" className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Training &amp; Care, Made Simple.
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Raising a puppy shouldn&rsquo;t feel like guesswork.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Practical, research-backed plans for puppy schedules, potty training, biting,
            crate training, and everyday puppy life.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <ButtonLink href={ctaHref} size="lg">
              Build Your Free Personalized Puppy Plan
            </ButtonLink>
            <ButtonLink href="/new-puppy/" size="lg" variant="secondary">
              Browse Puppy Guides
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
            <li>Free to use</li>
            <li aria-hidden="true" className="text-accent">
              &bull;
            </li>
            <li>Takes about 2 minutes</li>
            <li aria-hidden="true" className="text-accent">
              &bull;
            </li>
            <li>No account required</li>
          </ul>
        </div>

        <HeroArt />
      </Container>
    </section>
  );
}
