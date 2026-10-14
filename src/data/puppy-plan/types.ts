export type AgeRangeId =
  | "AGE_8_9"
  | "AGE_10_11"
  | "AGE_12_15"
  | "AGE_4_5_MONTHS"
  | "AGE_6_8_MONTHS"
  | "AGE_9_12_MONTHS"
  | "AGE_ADULT";

export type ChallengeId =
  | "PROBLEM_POTTY"
  | "PROBLEM_BITING"
  | "PROBLEM_CRATE"
  | "PROBLEM_SLEEP"
  | "PROBLEM_TRAINING"
  | "PROBLEM_STARTING";

export type AvailabilityId =
  | "AVAILABILITY_HOME_MOST_DAY"
  | "AVAILABILITY_AWAY_1_3"
  | "AVAILABILITY_AWAY_4_6"
  | "AVAILABILITY_AWAY_7_PLUS"
  | "AVAILABILITY_VARIES";

export type ProgressId =
  | "STATUS_STARTING"
  | "STATUS_PROGRESS"
  | "STATUS_GOING_WELL"
  | "STATUS_STRUGGLING";

export type MealsPerDayOption = "2" | "3" | "4" | "not-sure";

export type QuizAnswers = {
  puppyName: string;
  puppyAgeRange: AgeRangeId;
  wakeTime: string;
  bedtime: string;
  mealsPerDay: MealsPerDayOption;
  ownerAvailability: AvailabilityId;
  primaryChallenge: ChallengeId;
  progressLevel: ProgressId;
};

export type ResourceLink = {
  label: string;
  href: string;
};

export type RoutineBlock = {
  label: string;
  timeHint: string;
  note?: string;
};

export type CalloutLevel = "none" | "info" | "caution" | "strong";

export type PuppyPlanResult = {
  puppyName: string;
  ageLabel: string;
  hasGraduated: boolean;
  primaryFocus: string;
  topPriorities: string[];
  dailyRoutine: RoutineBlock[];
  challengeFocus: {
    title: string;
    priorities: string[];
    principle?: string;
    cta: ResourceLink;
    links: ResourceLink[];
  };
  availabilityNote: {
    level: CalloutLevel;
    text: string;
  } | null;
  resources: ResourceLink[];
  safetyNotes: string[];
};
