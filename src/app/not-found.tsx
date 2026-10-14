import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctaHref, ctaLabel } from "@/data/nav";

const popularGuides = [
  { label: "New Puppy: First Week", href: "/new-puppy/first-week/" },
  { label: "Potty Training", href: "/potty-training/" },
  { label: "Puppy Biting", href: "/puppy-biting/" },
  { label: "Crate Training", href: "/crate-training/" },
];

export default function NotFound() {
  return (
    <Container size="wide" className="py-20 text-center sm:py-28">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-ink-soft leading-relaxed">
          The page you&rsquo;re looking for may have moved or no longer exists. Try one of the
          links below, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/" size="lg">
            Go to homepage
          </ButtonLink>
          <ButtonLink href={ctaHref} size="lg" variant="secondary">
            {ctaLabel}
          </ButtonLink>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm font-semibold text-ink">Popular guides</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {popularGuides.map((guide) => (
              <li key={guide.href}>
                <Link href={guide.href} className="text-sm font-medium text-accent hover:underline">
                  {guide.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
