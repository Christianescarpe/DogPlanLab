import Link from "next/link";
import { Container } from "@/components/ui/Container";

const points = [
  {
    title: "Research-backed approach",
    description:
      "Each guide is researched against veterinary and animal-behavior organizations' published material, not written from opinion alone.",
  },
  {
    title: "No invented specifics",
    description:
      "We don't guess at medical, feeding, or behavioral specifics. Guidance still awaiting a professional's confirmation is held out of search results until that's done.",
  },
  {
    title: "Sources cited",
    description: "Articles link to their reference material so you can see where guidance comes from.",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-paper-alt py-16 sm:py-20">
      <Container size="wide">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          How we approach guidance
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {points.map((point) => (
            <div key={point.title}>
              <h3 className="font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{point.description}</p>
            </div>
          ))}
        </div>
        <Link
          href="/editorial-policy/"
          className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-dark"
        >
          Read our editorial policy &rarr;
        </Link>
      </Container>
    </section>
  );
}
