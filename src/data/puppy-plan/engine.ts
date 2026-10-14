import { ageModules } from "./age-modules";
import { availabilityModules } from "./availability-modules";
import { challengeModules } from "./challenge-modules";
import { progressModules } from "./progress-modules";
import { buildDailyRoutine } from "./routine-config";
import { safetyNotesFor } from "./safety-overrides";
import { PuppyPlanResult, QuizAnswers } from "./types";

/**
 * Combines Age + Challenge + Availability + Progress modules into one
 * plan result. This function contains no behavioral/medical content of
 * its own — it only assembles content already defined in the modules
 * above. Do not add new recommendation strings inline here.
 */
export function buildPuppyPlan(answers: QuizAnswers): PuppyPlanResult {
  const age = ageModules[answers.puppyAgeRange];
  const challenge = challengeModules[answers.primaryChallenge];
  const availability = availabilityModules[answers.ownerAvailability];
  const progress = progressModules[answers.progressLevel];

  const puppyName = answers.puppyName.trim() || "Your puppy";

  if (age.hasGraduated) {
    return {
      puppyName,
      ageLabel: age.label,
      hasGraduated: true,
      primaryFocus: age.graduatedMessage ?? "has graduated from puppyhood.",
      topPriorities: [],
      dailyRoutine: [],
      challengeFocus: {
        title: challenge.label,
        priorities: [],
        cta: challenge.cta,
        links: challenge.links,
      },
      availabilityNote: null,
      resources: [],
      safetyNotes: [],
    };
  }

  const topPriorities = buildTopPriorities({
    ageFocusAreas: age.focusAreas,
    maxPriorities: progress.maxPriorities,
    isStruggling: answers.progressLevel === "STATUS_STRUGGLING",
  });

  const dailyRoutine = buildDailyRoutine({
    wakeTime: answers.wakeTime,
    bedtime: answers.bedtime,
    mealsPerDay: answers.mealsPerDay,
  });

  const safetyNotes = safetyNotesFor({
    ageRange: answers.puppyAgeRange,
    ownerAvailability: answers.ownerAvailability,
  });

  return {
    puppyName,
    ageLabel: age.label,
    hasGraduated: false,
    primaryFocus: progress.focus,
    topPriorities,
    dailyRoutine,
    challengeFocus: {
      title: challenge.label,
      priorities: challenge.priorities,
      principle: challenge.principle,
      cta: challenge.cta,
      links: challenge.links,
    },
    availabilityNote:
      availability.calloutLevel === "none"
        ? null
        : { level: availability.calloutLevel, text: availability.calloutText ?? availability.guidance },
    resources: challenge.links,
    safetyNotes,
  };
}

function buildTopPriorities(input: {
  ageFocusAreas: string[];
  maxPriorities: number;
  isStruggling: boolean;
}): string[] {
  // Sourced from age-stage focus areas only, so this section stays
  // genuinely distinct from the Challenge Focus checklist below it (which
  // already carries the challenge-specific priorities). When the owner is
  // struggling, we skip this section entirely rather than repeat the same
  // few items twice — Challenge Focus alone carries the "keep it simple"
  // framing for that case.
  if (input.isStruggling) return [];

  return Array.from(new Set(input.ageFocusAreas)).slice(0, input.maxPriorities);
}
