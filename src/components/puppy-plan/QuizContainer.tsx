"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/puppy-plan/ProgressBar";
import { OptionButton } from "@/components/puppy-plan/OptionButton";
import { QuestionCard } from "@/components/puppy-plan/QuestionCard";
import { PlanPreview } from "@/components/puppy-plan/PlanPreview";
import { PlanResult } from "@/components/puppy-plan/PlanResult";
import {
  ageOptions,
  availabilityOptions,
  challengeOptions,
  mealsOptions,
  progressOptions,
  totalQuizSteps,
} from "@/data/puppy-plan/quiz-config";
import { QuizAnswers } from "@/data/puppy-plan/types";
import { trackEvent } from "@/lib/analytics";

type PartialAnswers = Partial<QuizAnswers>;

const initialAnswers: PartialAnswers = {};

export function QuizContainer() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<PartialAnswers>(initialAnswers);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    trackEvent({ name: "puppy_plan_started" });
  }, []);

  const puppyName = answers.puppyName?.trim() || "your puppy";

  function goNext() {
    trackEvent({ name: "puppy_plan_step_completed", step, totalSteps: totalQuizSteps });
    setStep((s) => Math.min(s + 1, totalQuizSteps + 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function update<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  if (showResult && isComplete(answers)) {
    return (
      <Container size="narrow" className="py-10">
        <PlanResult answers={answers} />
      </Container>
    );
  }

  if (step === totalQuizSteps + 1 && isComplete(answers)) {
    return (
      <Container size="narrow" className="py-10">
        <PlanPreview answers={answers} onBack={goBack} onUnlocked={() => setShowResult(true)} />
      </Container>
    );
  }

  return (
    <Container size="narrow" className="py-10">
      <h1 className="mb-6 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Build Your Free Personalized Puppy Plan
      </h1>
      <ProgressBar step={Math.min(step, totalQuizSteps)} total={totalQuizSteps} />

      {step === 1 && (
        <QuestionCard title="What's your puppy's name?" subtitle="We'll use this to personalize your plan.">
          <label htmlFor="quiz-puppy-name" className="sr-only">
            What&rsquo;s your puppy&rsquo;s name?
          </label>
          <input
            id="quiz-puppy-name"
            type="text"
            value={answers.puppyName ?? ""}
            onChange={(e) => update("puppyName", e.target.value)}
            placeholder="e.g. Charlie"
            autoFocus
            className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent"
          />
        </QuestionCard>
      )}

      {step === 2 && (
        <QuestionCard title={`How old is ${puppyName}?`}>
          <div className="grid gap-2 sm:grid-cols-2">
            {ageOptions.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers.puppyAgeRange === option.id}
                onClick={() => update("puppyAgeRange", option.id)}
              />
            ))}
          </div>
        </QuestionCard>
      )}

      {step === 3 && (
        <QuestionCard title={`What time does ${puppyName} usually wake up?`}>
          <label htmlFor="quiz-wake-time" className="sr-only">
            What time does {puppyName} usually wake up?
          </label>
          <input
            id="quiz-wake-time"
            type="time"
            value={answers.wakeTime ?? ""}
            onChange={(e) => update("wakeTime", e.target.value)}
            className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-accent"
          />
        </QuestionCard>
      )}

      {step === 4 && (
        <QuestionCard title={`What time is ${puppyName}'s bedtime?`}>
          <label htmlFor="quiz-bedtime" className="sr-only">
            What time is {puppyName}&rsquo;s bedtime?
          </label>
          <input
            id="quiz-bedtime"
            type="time"
            value={answers.bedtime ?? ""}
            onChange={(e) => update("bedtime", e.target.value)}
            className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-accent"
          />
        </QuestionCard>
      )}

      {step === 5 && (
        <QuestionCard title={`How many meals does ${puppyName} eat per day?`}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {mealsOptions.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers.mealsPerDay === option.id}
                onClick={() => update("mealsPerDay", option.id)}
              />
            ))}
          </div>
        </QuestionCard>
      )}

      {step === 6 && (
        <QuestionCard title="How much time are you away from home on a typical day?">
          <div className="grid gap-2">
            {availabilityOptions.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers.ownerAvailability === option.id}
                onClick={() => update("ownerAvailability", option.id)}
              />
            ))}
          </div>
        </QuestionCard>
      )}

      {step === 7 && (
        <QuestionCard title={`What's ${puppyName}'s biggest challenge right now?`}>
          <div className="grid gap-2 sm:grid-cols-2">
            {challengeOptions.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers.primaryChallenge === option.id}
                onClick={() => update("primaryChallenge", option.id)}
              />
            ))}
          </div>
        </QuestionCard>
      )}

      {step === 8 && (
        <QuestionCard title={`How is it going with ${puppyName} so far?`}>
          <div className="grid gap-2">
            {progressOptions.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers.progressLevel === option.id}
                onClick={() => update("progressLevel", option.id)}
              />
            ))}
          </div>
        </QuestionCard>
      )}

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={goBack} disabled={step === 1}>
          Back
        </Button>
        <Button onClick={goNext} disabled={!canProceed(step, answers)}>
          {step === totalQuizSteps ? "See my plan" : "Next"}
        </Button>
      </div>
    </Container>
  );
}

function canProceed(step: number, answers: PartialAnswers): boolean {
  switch (step) {
    case 1:
      return Boolean(answers.puppyName?.trim());
    case 2:
      return Boolean(answers.puppyAgeRange);
    case 3:
      return Boolean(answers.wakeTime);
    case 4:
      return Boolean(answers.bedtime);
    case 5:
      return Boolean(answers.mealsPerDay);
    case 6:
      return Boolean(answers.ownerAvailability);
    case 7:
      return Boolean(answers.primaryChallenge);
    case 8:
      return Boolean(answers.progressLevel);
    default:
      return true;
  }
}

function isComplete(answers: PartialAnswers): answers is QuizAnswers {
  return (
    Boolean(answers.puppyName?.trim()) &&
    Boolean(answers.puppyAgeRange) &&
    Boolean(answers.wakeTime) &&
    Boolean(answers.bedtime) &&
    Boolean(answers.mealsPerDay) &&
    Boolean(answers.ownerAvailability) &&
    Boolean(answers.primaryChallenge) &&
    Boolean(answers.progressLevel)
  );
}
