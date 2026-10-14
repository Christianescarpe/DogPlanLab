import { AgeRangeId, AvailabilityId, ChallengeId, MealsPerDayOption, ProgressId } from "./types";

export const ageOptions: { id: AgeRangeId; label: string }[] = [
  { id: "AGE_8_9", label: "8–9 weeks" },
  { id: "AGE_10_11", label: "10–11 weeks" },
  { id: "AGE_12_15", label: "12–15 weeks" },
  { id: "AGE_4_5_MONTHS", label: "4–5 months" },
  { id: "AGE_6_8_MONTHS", label: "6–8 months" },
  { id: "AGE_9_12_MONTHS", label: "9–12 months" },
  { id: "AGE_ADULT", label: "1+ year" },
];

export const mealsOptions: { id: MealsPerDayOption; label: string }[] = [
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "not-sure", label: "Not sure" },
];

export const availabilityOptions: { id: AvailabilityId; label: string }[] = [
  { id: "AVAILABILITY_HOME_MOST_DAY", label: "Home most of the day" },
  { id: "AVAILABILITY_AWAY_1_3", label: "Away 1–3 hours" },
  { id: "AVAILABILITY_AWAY_4_6", label: "Away 4–6 hours" },
  { id: "AVAILABILITY_AWAY_7_PLUS", label: "Away 7+ hours" },
  { id: "AVAILABILITY_VARIES", label: "Varies" },
];

export const challengeOptions: { id: ChallengeId; label: string }[] = [
  { id: "PROBLEM_POTTY", label: "Potty accidents" },
  { id: "PROBLEM_BITING", label: "Biting" },
  { id: "PROBLEM_CRATE", label: "Crate training" },
  { id: "PROBLEM_SLEEP", label: "Sleep" },
  { id: "PROBLEM_TRAINING", label: "Basic training" },
  { id: "PROBLEM_STARTING", label: "Just getting started" },
];

export const progressOptions: { id: ProgressId; label: string }[] = [
  { id: "STATUS_STARTING", label: "We're just starting" },
  { id: "STATUS_PROGRESS", label: "Some progress, but inconsistent" },
  { id: "STATUS_GOING_WELL", label: "Going pretty well" },
  { id: "STATUS_STRUGGLING", label: "We're struggling" },
];

export const totalQuizSteps = 8;
