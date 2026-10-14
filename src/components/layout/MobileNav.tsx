"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNav, ctaHref, ctaLabel } from "@/data/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-16 z-30 h-[calc(100dvh-4rem)] overflow-y-auto bg-paper px-4 pb-8 pt-4"
        >
          <Link
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="mb-6 block w-full rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-paper"
          >
            {ctaLabel}
          </Link>

          <nav aria-label="Mobile primary" className="space-y-6">
            {primaryNav.map((group) => (
              <div key={group.label}>
                <Link
                  href={group.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-lg font-semibold text-ink"
                >
                  {group.label}
                </Link>
                {group.links.length > 0 && (
                  <ul className="mt-2 space-y-2 border-l border-border pl-4">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block text-sm text-ink-soft"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
