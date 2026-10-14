import { AvailabilityId, CalloutLevel } from "./types";

export type AvailabilityModule = {
  id: AvailabilityId;
  label: string;
  guidance: string;
  calloutLevel: CalloutLevel;
  calloutText?: string;
};

export const availabilityModules: Record<AvailabilityId, AvailabilityModule> = {
  AVAILABILITY_HOME_MOST_DAY: {
    id: "AVAILABILITY_HOME_MOST_DAY",
    label: "Home most of the day",
    guidance: "Your routine can stay flexible since you're around for most of the day.",
    calloutLevel: "none",
  },
  AVAILABILITY_AWAY_1_3: {
    id: "AVAILABILITY_AWAY_1_3",
    label: "Away 1–3 hours",
    guidance: "Plan around your departures and returns so your puppy's routine stays predictable.",
    calloutLevel: "info",
    calloutText: "Build a short, calm routine around leaving and coming home.",
  },
  AVAILABILITY_AWAY_4_6: {
    id: "AVAILABILITY_AWAY_4_6",
    label: "Away 4–6 hours",
    guidance: "Longer absences may call for extra planning depending on your puppy's age.",
    calloutLevel: "caution",
    calloutText:
      "Younger puppies may need appropriate care or potty arrangements during longer absences.",
  },
  AVAILABILITY_AWAY_7_PLUS: {
    id: "AVAILABILITY_AWAY_7_PLUS",
    label: "Away 7+ hours",
    guidance: "A full workday takes extra planning to make sure your puppy's needs are covered.",
    calloutLevel: "strong",
    calloutText:
      "A full workday may be too long for a young puppy to manage without an appropriate break and care arrangement. Consider a family member or friend, a dog walker, a pet sitter, or an appropriate safe puppy area.",
  },
  AVAILABILITY_VARIES: {
    id: "AVAILABILITY_VARIES",
    label: "Varies",
    guidance: "Since your schedule shifts, build a routine flexible enough to hold up on busier days.",
    calloutLevel: "info",
    calloutText: "Plan for your longest typical day, then adjust down on shorter days.",
  },
};
