import { AgeRangeId, ChallengeId, ProgressId } from "./types";

const AGE_TAGS: Record<AgeRangeId, string> = {
  AGE_8_9: "AGE_8_9",
  AGE_10_11: "AGE_10_11",
  AGE_12_15: "AGE_12_15",
  AGE_4_5_MONTHS: "AGE_4_5_MONTHS",
  AGE_6_8_MONTHS: "AGE_6_8_MONTHS",
  AGE_9_12_MONTHS: "AGE_9_12_MONTHS",
  AGE_ADULT: "AGE_ADULT",
};

const PROBLEM_TAGS: Record<ChallengeId, string> = {
  PROBLEM_POTTY: "PROBLEM_POTTY",
  PROBLEM_BITING: "PROBLEM_BITING",
  PROBLEM_CRATE: "PROBLEM_CRATE",
  PROBLEM_SLEEP: "PROBLEM_SLEEP",
  PROBLEM_TRAINING: "PROBLEM_TRAINING",
  PROBLEM_STARTING: "PROBLEM_STARTING",
};

const STATUS_TAGS: Record<ProgressId, string> = {
  STATUS_STARTING: "STATUS_STARTING",
  STATUS_PROGRESS: "STATUS_PROGRESS",
  STATUS_GOING_WELL: "STATUS_GOING_WELL",
  STATUS_STRUGGLING: "STATUS_STRUGGLING",
};

export function buildTags(input: {
  ageRange?: string;
  challenge?: string;
  progress?: string;
}): string[] {
  const tags: string[] = [];

  if (input.ageRange && input.ageRange in AGE_TAGS) {
    tags.push(AGE_TAGS[input.ageRange as AgeRangeId]);
  }
  if (input.challenge && input.challenge in PROBLEM_TAGS) {
    tags.push(PROBLEM_TAGS[input.challenge as ChallengeId]);
  }
  if (input.progress && input.progress in STATUS_TAGS) {
    tags.push(STATUS_TAGS[input.progress as ProgressId]);
  }

  return tags;
}
