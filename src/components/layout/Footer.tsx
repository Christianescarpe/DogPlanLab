import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DogMark } from "@/components/ui/DogMark";
import { footerLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-paper-alt">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
              <DogMark className="h-6 w-6 text-accent" />
              Dog Plan Lab
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Guides</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Company</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Educational content only. Not a substitute for veterinary or professional behavioral advice.</p>
        </div>
      </Container>
    </footer>
  );
}
