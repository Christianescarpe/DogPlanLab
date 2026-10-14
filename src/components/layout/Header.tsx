import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { DogMark } from "@/components/ui/DogMark";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { primaryNav, ctaHref, ctaLabel } from "@/data/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between" size="wide">
        <div className="flex items-center gap-2.5">
          <DogMark className="h-7 w-7 text-accent" />
          <Logo />
        </div>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNav.map((group) => (
            <div key={group.label} className="group relative">
              <Link
                href={group.href}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
              >
                {group.label}
              </Link>
              {group.links.length > 0 && (
                <div className="invisible absolute left-0 top-full w-64 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="rounded-xl border border-border bg-surface p-2 shadow-lg shadow-black/30">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-alt hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href={ctaHref} size="md">
              {ctaLabel}
            </ButtonLink>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
