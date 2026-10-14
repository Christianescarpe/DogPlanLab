import { ChallengeId, ResourceLink } from "./types";

export type ChallengeModule = {
  id: ChallengeId;
  label: string;
  priorities: string[];
  principle?: string;
  cta: ResourceLink;
  links: ResourceLink[];
};

/**
 * High-level priorities only. Do not add exact durations, counts, or
 * step-by-step behavioral protocols — those live in reviewed article
 * content, not the rules engine. See safety-overrides.ts.
 */
export const challengeModules: Record<ChallengeId, ChallengeModule> = {
  PROBLEM_POTTY: {
    id: "PROBLEM_POTTY",
    label: "Potty training",
    priorities: [
      "Build a consistent potty routine",
      "Reward successes outside right away",
      "Watch for early signals so you can get outside in time",
    ],
    cta: { label: "Get the 7-Day Potty Plan", href: "/potty-training/" },
    links: [
      { label: "Potty Training Overview", href: "/potty-training/" },
      { label: "Keeps Having Accidents", href: "/potty-training/accidents/" },
      { label: "Potty Training Schedule", href: "/potty-training/schedule/" },
      {
        label: "Peeing Inside After Going Outside",
        href: "/potty-training/pees-inside-after-going-outside/",
      },
      { label: "Won't Pee Outside", href: "/potty-training/wont-pee-outside/" },
    ],
  },
  PROBLEM_BITING: {
    id: "PROBLEM_BITING",
    label: "Biting",
    priorities: [
      "Stop the interaction when biting starts",
      "Calmly disengage rather than escalating",
      "Redirect once your puppy has settled",
    ],
    principle: "Stop interaction → calmly disengage → redirect when settled.",
    cta: { label: "Start the 5-Day Biting Reset", href: "/puppy-biting/" },
    links: [
      { label: "Puppy Biting Overview", href: "/puppy-biting/" },
      { label: "Biting Hands", href: "/puppy-biting/hands/" },
      { label: "Biting Feet & Ankles", href: "/puppy-biting/feet-ankles/" },
      { label: "Biting At Night", href: "/puppy-biting/at-night/" },
      { label: "Won't Stop, Even With Redirection", href: "/puppy-biting/wont-stop/" },
    ],
  },
  PROBLEM_CRATE: {
    id: "PROBLEM_CRATE",
    label: "Crate training",
    priorities: [
      "Build a positive association with the crate",
      "Start with short, successful exposures",
      "Progress gradually as your puppy stays comfortable",
      "Learn to tell mild protest apart from genuine distress",
    ],
    cta: { label: "Get the 7-Day Crate Plan", href: "/crate-training/schedule/" },
    links: [
      { label: "Crate Training Overview", href: "/crate-training/" },
      { label: "Crate Training Schedule", href: "/crate-training/schedule/" },
      { label: "Crying in the Crate", href: "/crate-training/crying/" },
      { label: "Crying at Night", href: "/crate-training/crying-at-night/" },
    ],
  },
  PROBLEM_SLEEP: {
    id: "PROBLEM_SLEEP",
    label: "Sleep",
    // High-level priorities intentionally left empty — see the module-level
    // doc comment above. See CONTENT-PLACEHOLDERS.md.
    priorities: [],
    cta: { label: "Explore Puppy Sleep", href: "/puppy-sleep/" },
    links: [
      { label: "Puppy Sleep Overview", href: "/puppy-sleep/" },
      { label: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
      { label: "Nighttime Sleep Problems", href: "/puppy-sleep/nighttime-problems/" },
      { label: "Crying at Night", href: "/crate-training/crying-at-night/" },
      { label: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
    ],
  },
  PROBLEM_TRAINING: {
    id: "PROBLEM_TRAINING",
    label: "Basic training",
    priorities: [
      "Keep early training sessions short and positive",
      "Focus on one skill at a time",
    ],
    cta: { label: "Explore Puppy Training", href: "/puppy-training/" },
    links: [
      { label: "Puppy Training Overview", href: "/puppy-training/" },
      { label: "First Things to Teach", href: "/puppy-training/first-things-to-teach/" },
      { label: "Training Around Distractions", href: "/puppy-training/distracted/" },
      { label: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
    ],
  },
  PROBLEM_STARTING: {
    id: "PROBLEM_STARTING",
    label: "Just getting started",
    priorities: [
      "Start with your puppy's first-week routine",
      "Get the basics of schedule, potty, and crate in place",
      "Take it one habit at a time",
    ],
    cta: { label: "Start With Your Puppy's First Week", href: "/new-puppy/first-week/" },
    links: [
      { label: "New Puppy: First Week", href: "/new-puppy/first-week/" },
      { label: "Puppy Schedule", href: "/puppy-schedule/" },
      { label: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
      { label: "Potty Training Overview", href: "/potty-training/" },
      { label: "Crate Training Overview", href: "/crate-training/" },
      { label: "Puppy Biting Overview", href: "/puppy-biting/" },
      { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
    ],
  },
};
