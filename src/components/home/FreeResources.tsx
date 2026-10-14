import Link from "next/link";
import { Container } from "@/components/ui/Container";

const resources = [
  { label: "New Puppy Guide", href: "/new-puppy/" },
  { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
  { label: "Daily Puppy Schedule", href: "/puppy-schedule/" },
];

export function FreeResources() {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Free resources
        </h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
          {resources.map((resource) => (
            <li key={resource.href}>
              <Link
                href={resource.href}
                className="flex items-center justify-between px-6 py-4 text-sm font-medium text-ink hover:bg-paper-alt"
              >
                {resource.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
