"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const age = searchParams.get("age");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "joined">("idle");

  const ageRecommendations: Record<
    string,
    { href: string; label: string }
  > = {
    "8–10 weeks": {
      href: "/puppy-schedule/by-age/#8-weeks",
      label: "The 8-week schedule, in full",
    },
    "10–12 weeks": {
      href: "/puppy-schedule/by-age/#10-weeks",
      label: "The 10-week schedule, in full",
    },
    "12–16 weeks": {
      href: "/puppy-schedule/by-age/#12-weeks",
      label: "The 12-week schedule, in full",
    },
    "4–6 months": {
      href: "/puppy-schedule/by-age/#4-6-months",
      label: "The 4–6 month schedule, in full",
    },
  };

  const currentRec =
    age && ageRecommendations[age]
      ? ageRecommendations[age]
      : {
          href: "/puppy-schedule/by-age/",
          label: "Puppy Schedule by Age — the timetable for your puppy's exact age",
        };

  return (
    <Container size="narrow" className="py-12 sm:py-16">
      {/* 1. Confirmation header (Priority 1) */}
      <div className="rounded-3xl border border-accent/30 bg-surface/80 p-8 text-center sm:p-12">
        <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          Instant Download
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Your Starter Kit is ready 🎉
        </h1>
        <p className="mt-3 text-base text-ink-soft">
          Check your inbox too — we sent a backup link. But you don&rsquo;t have to wait:
        </p>

        <div className="mt-6">
          <a
            href="/downloads/Puppy-Schedule-Starter-Kit.pdf"
            download
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-paper shadow-md transition-colors hover:bg-accent-dark"
          >
            Download your Puppy Schedule Starter Kit
          </a>
          <p className="mt-2.5 text-xs text-muted">
            12 printable pages · PDF · no signup needed ever again for this file
          </p>
        </div>
      </div>

      {/* 2. What to do first (60-second win) */}
      <section className="mt-10 rounded-2xl border border-border bg-paper-alt p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Start here (takes 60 seconds)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
          Print page 2 — the Daily Routine Chart — and stick it on the fridge. That&rsquo;s the whole day at a glance. The 7-day tracker (pages 8–9) is worth printing fresh each week.
        </p>
      </section>

      {/* 3. Next recommended article (Priority 2) */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-ink">
          Your next read
        </h2>
        <div className="mt-3 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
          <Link href={currentRec.href} className="group block">
            <p className="text-base font-semibold text-ink group-hover:text-accent">
              {currentRec.label} &rarr;
            </p>
            <p className="mt-1.5 text-xs text-ink-soft">
              The kit gave you the chart. This gives you the why behind every number.
            </p>
          </Link>
        </div>
      </section>

      {/* 4. Personalized Puppy Plan (Priority 3) */}
      <section className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Want it built around <em>your</em> puppy?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          The Starter Kit is the printable version. Answer a few quick questions and we&rsquo;ll build a schedule around your puppy&rsquo;s actual wake time and age.
        </p>
        <div className="mt-5">
          <Link
            href="/puppy-plan/"
            className="inline-flex items-center justify-center rounded-full border border-accent/60 bg-transparent px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-paper"
          >
            Build my Puppy Plan
          </Link>
        </div>
      </section>

      {/* 5. Soft affiliate shopping list (Priority 4) */}
      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-display text-lg font-semibold text-ink">
          Setting up for the first week?
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Here&rsquo;s our new-puppy shopping list — only the things worth buying before the puppy arrives:{" "}
          <Link
            href="/shop/new-puppy-shopping-list/"
            className="text-accent underline underline-offset-2 hover:text-accent-dark"
          >
            view the new-puppy shopping list
          </Link>
          .
        </p>
      </section>

      {/* 6. Planner seed (Priority 5 — quiet, bottom) */}
      <div className="mt-12 text-center text-xs text-muted">
        We&rsquo;re building a fillable 12-week Puppy Planner for kit owners.{" "}
        {waitlistStatus === "joined" ? (
          <span className="font-semibold text-accent">You&rsquo;re on the early list!</span>
        ) : (
          <button
            type="button"
            onClick={() => setWaitlistStatus("joined")}
            className="text-accent underline hover:text-accent-dark"
          >
            Notify me when it&rsquo;s ready
          </button>
        )}
      </div>
    </Container>
  );
}
