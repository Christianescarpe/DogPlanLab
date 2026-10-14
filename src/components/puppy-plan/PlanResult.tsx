import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Checklist } from "@/components/article/Checklist";
import { ScheduleTable } from "@/components/article/ScheduleTable";
import { buildPuppyPlan } from "@/data/puppy-plan/engine";
import { QuizAnswers } from "@/data/puppy-plan/types";

export function PlanResult({ answers }: { answers: QuizAnswers }) {
  const plan = buildPuppyPlan(answers);

  if (plan.hasGraduated) {
    return (
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {plan.puppyName} {plan.primaryFocus}
        </h1>
        <p className="mt-4 text-ink-soft leading-relaxed">
          The Puppy Plan is built for puppies working through the first year. A Personalized Dog
          Training Plan for adult dogs is on our roadmap — check back soon, or browse our guides in
          the meantime.
        </p>
        <ButtonLink href="/new-puppy/" className="mt-6">
          Browse Puppy Guides
        </ButtonLink>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {plan.puppyName}&rsquo;s Puppy Plan
      </h1>

      <Card className="mt-6">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted">Age</dt>
            <dd className="font-medium text-ink">{plan.ageLabel}</dd>
          </div>
          <div>
            <dt className="text-muted">Primary focus</dt>
            <dd className="font-medium text-ink">{plan.primaryFocus}</dd>
          </div>
        </dl>
      </Card>

      {plan.topPriorities.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-ink">
            {plan.puppyName}&rsquo;s Top Priorities
          </h2>
          <div className="mt-3">
            <Checklist items={plan.topPriorities} />
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          {plan.puppyName}&rsquo;s Daily Routine
        </h2>
        <div className="mt-3">
          <ScheduleTable
            rows={plan.dailyRoutine.map((block) => ({
              time: block.timeHint,
              activity: block.label,
              note: block.note,
            }))}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          {plan.puppyName}&rsquo;s Challenge Focus: {plan.challengeFocus.title}
        </h2>
        {plan.challengeFocus.principle && (
          <p className="mt-2 text-sm font-medium text-ink-soft">{plan.challengeFocus.principle}</p>
        )}
        {plan.challengeFocus.priorities.length > 0 && (
          <div className="mt-3">
            <Checklist items={plan.challengeFocus.priorities} />
          </div>
        )}
      </section>

      {plan.availabilityNote && (
        <section className="mt-8">
          <Callout tone={plan.availabilityNote.level === "strong" ? "caution" : "info"} title="Planning around your schedule">
            {plan.availabilityNote.text}
          </Callout>
        </section>
      )}

      {plan.resources.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-ink">
            Recommended Dog Plan Lab Resources
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {plan.resources.map((resource) => (
              <li key={resource.href}>
                <a
                  href={resource.href}
                  className="block rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink hover:border-accent/40"
                >
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {plan.safetyNotes.length > 0 && (
        <section className="mt-8 space-y-3">
          {plan.safetyNotes.map((note) => (
            <Callout key={note} tone="info" title="Good to know">
              {note}
            </Callout>
          ))}
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-brand/25 bg-brand-light/30 p-6 text-center">
        <h2 className="font-display text-xl font-semibold text-ink">Next step</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Start with {plan.challengeFocus.title.toLowerCase()} — it&rsquo;s what {plan.puppyName}{" "}
          needs most right now.
        </p>
        <ButtonLink href={plan.challengeFocus.cta.href} size="lg" className="mt-4">
          {plan.challengeFocus.cta.label}
        </ButtonLink>
      </section>
    </div>
  );
}
