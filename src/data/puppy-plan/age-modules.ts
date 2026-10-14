import { AgeRangeId } from "./types";

export type AgeModule = {
  id: AgeRangeId;
  label: string;
  shortLabel: string;
  hasGraduated: boolean;
  graduatedMessage?: string;
  focusAreas: string[];
};

/**
 * High-level positioning only, per Dog Plan Lab content-safety rules.
 * Do not add precise medical, feeding, or behavioral specifics here —
 * those belong in reviewed article content, not the rules engine.
 *
 * DEPENDENCY NOTE (pre-launch cleanup audit): /puppy-schedule/by-age/ and
 * /puppy-socialization-checklist/ now exist as real (HOLD-status) content
 * that's directly relevant to these age brackets — the removed placeholder
 * socialization bullets on AGE_8_9/AGE_10_11/AGE_12_15 were about exactly
 * this topic. `focusAreas` is a plain string[] with no link field, so wiring
 * per-age links here would mean a type/engine/UI change, not a content
 * tweak. Documented rather than forced — see challenge-modules.ts for where
 * these two pages are already linked from the engine (PROBLEM_STARTING,
 * PROBLEM_SLEEP).
 */
export const ageModules: Record<AgeRangeId, AgeModule> = {
  AGE_8_9: {
    id: "AGE_8_9",
    label: "8–9 weeks",
    shortLabel: "8–9 weeks old",
    hasGraduated: false,
    focusAreas: [
      "Settling into a new routine",
      "Regular potty opportunities",
      "Plenty of rest",
      "A positive first introduction to the crate",
      "Very short, low-pressure training moments",
    ],
  },
  AGE_10_11: {
    id: "AGE_10_11",
    label: "10–11 weeks",
    shortLabel: "10–11 weeks old",
    hasGraduated: false,
    focusAreas: [
      "Building routine consistency",
      "Potty training progress",
      "Growing crate comfort",
      "Gentle handling practice",
      "Short, positive training sessions",
    ],
  },
  AGE_12_15: {
    id: "AGE_12_15",
    label: "12–15 weeks",
    shortLabel: "12–15 weeks old",
    hasGraduated: false,
    focusAreas: [
      "Structured training foundations",
      "Early recall and leash foundations",
      "Increasing independence",
    ],
  },
  AGE_4_5_MONTHS: {
    id: "AGE_4_5_MONTHS",
    label: "4–5 months",
    shortLabel: "4–5 months old",
    hasGraduated: false,
    focusAreas: [
      "Routine consistency",
      "Leash skills",
      "Recall practice",
      "Chewing and everyday manners",
    ],
  },
  AGE_6_8_MONTHS: {
    id: "AGE_6_8_MONTHS",
    label: "6–8 months",
    shortLabel: "6–8 months old",
    hasGraduated: false,
    focusAreas: [
      "Consistency through the adolescent stage",
      "Training around distractions",
      "Recall practice",
      "Leash manners",
      "Early impulse-control foundations",
    ],
  },
  AGE_9_12_MONTHS: {
    id: "AGE_9_12_MONTHS",
    label: "9–12 months",
    shortLabel: "9–12 months old",
    hasGraduated: false,
    focusAreas: [
      "Proofing known behaviors",
      "Training around real-world distractions",
      "Recall practice",
      "Settling on cue",
      "Leash behavior",
    ],
  },
  AGE_ADULT: {
    id: "AGE_ADULT",
    label: "1+ year",
    shortLabel: "1+ year old",
    hasGraduated: true,
    graduatedMessage: "has graduated from puppyhood.",
    focusAreas: [],
  },
};
