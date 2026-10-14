"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { buildPuppyPlan } from "@/data/puppy-plan/engine";
import { ageModules } from "@/data/puppy-plan/age-modules";
import { challengeModules } from "@/data/puppy-plan/challenge-modules";
import { QuizAnswers } from "@/data/puppy-plan/types";
import { trackEvent } from "@/lib/analytics";

const lockedSections = [
  "Full daily routine",
  "Challenge plan",
  "Recommended next steps",
  "Relevant resources",
];

export function PlanPreview({
  answers,
  onBack,
  onUnlocked,
}: {
  answers: QuizAnswers;
  onBack: () => void;
  onUnlocked: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const plan = buildPuppyPlan(answers);
  const age = ageModules[answers.puppyAgeRange];
  const challenge = challengeModules[answers.primaryChallenge];

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/puppy-plan-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          puppyName: answers.puppyName,
          puppyAgeRange: answers.puppyAgeRange,
          wakeTime: answers.wakeTime,
          bedtime: answers.bedtime,
          mealsPerDay: answers.mealsPerDay,
          ownerAvailability: answers.ownerAvailability,
          primaryChallenge: answers.primaryChallenge,
          progressLevel: answers.progressLevel,
          signupPage: "/puppy-plan/",
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        trackEvent({ name: "puppy_plan_completed", primaryChallenge: answers.primaryChallenge, ageRange: answers.puppyAgeRange });
        trackEvent({ name: "puppy_plan_email_submitted", signupSource: "puppy_plan_quiz" });
        onUnlocked();
      } else {
        setStatus("error");
        setError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {plan.puppyName}&rsquo;s plan is ready
      </h1>

      <Card className="mt-6">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted">Age</dt>
            <dd className="font-medium text-ink">{age.label}</dd>
          </div>
          <div>
            <dt className="text-muted">Main challenge</dt>
            <dd className="font-medium text-ink">{challenge.label}</dd>
          </div>
        </dl>

        {!plan.hasGraduated && plan.topPriorities.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Top priorities
            </p>
            <ul className="mt-2 space-y-1.5">
              {plan.topPriorities.slice(0, 3).map((priority) => (
                <li key={priority} className="text-sm text-ink-soft">
                  &bull; {priority}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-paper-alt p-6">
        <ul className="space-y-2 blur-[3px] select-none" aria-hidden="true">
          {lockedSections.map((section) => (
            <li key={section} className="text-sm font-medium text-ink-soft">
              {section}
            </li>
          ))}
        </ul>
        <div className="absolute inset-0 flex items-center justify-center bg-paper-alt/60">
          <span className="rounded-full border border-border-strong bg-surface px-4 py-1.5 text-xs font-semibold text-ink-soft">
            Locked — enter your email to unlock
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="plan-email" className="block text-sm font-medium text-ink">
          Where should we send {plan.puppyName}&rsquo;s complete plan?
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="plan-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-xl border border-border-strong bg-surface px-4 py-3 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent"
          />
          <Button type="submit" size="lg" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : `Get ${plan.puppyName}'s Plan`}
          </Button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-caution">{error}</p>}
      </form>

      <button type="button" onClick={onBack} className="mt-4 text-sm text-muted hover:text-ink-soft">
        &larr; Back to questions
      </button>
    </div>
  );
}
