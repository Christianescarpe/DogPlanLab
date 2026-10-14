import { ProgressId } from "./types";

export type ProgressModule = {
  id: ProgressId;
  label: string;
  focus: string;
  maxPriorities: number;
};

export const progressModules: Record<ProgressId, ProgressModule> = {
  STATUS_STARTING: {
    id: "STATUS_STARTING",
    label: "We're just starting",
    focus: "Establishing a routine you can stick to",
    maxPriorities: 3,
  },
  STATUS_PROGRESS: {
    id: "STATUS_PROGRESS",
    label: "Some progress, but inconsistent",
    focus: "Building consistency, with extra focus on your toughest area",
    maxPriorities: 3,
  },
  STATUS_GOING_WELL: {
    id: "STATUS_GOING_WELL",
    label: "Going pretty well",
    focus: "Maintaining progress and moving to age-appropriate next steps",
    maxPriorities: 3,
  },
  STATUS_STRUGGLING: {
    id: "STATUS_STRUGGLING",
    label: "We're struggling",
    focus: "Simplifying to a small number of priorities instead of adding more tasks",
    maxPriorities: 3,
  },
};
