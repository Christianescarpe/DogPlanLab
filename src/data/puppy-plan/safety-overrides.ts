import { AgeRangeId, AvailabilityId } from "./types";

/**
 * Central place for safety/caution notes injected into the plan output.
 * Keep this list additive and high-level — it should never introduce
 * exact durations, amounts, or medical/behavioral specifics.
 */
export function safetyNotesFor(input: {
  ageRange: AgeRangeId;
  ownerAvailability: AvailabilityId;
}): string[] {
  const notes: string[] = [];

  const youngAges: AgeRangeId[] = ["AGE_8_9", "AGE_10_11", "AGE_12_15"];
  const longAbsence: AvailabilityId[] = ["AVAILABILITY_AWAY_4_6", "AVAILABILITY_AWAY_7_PLUS"];

  if (youngAges.includes(input.ageRange) && longAbsence.includes(input.ownerAvailability)) {
    notes.push(
      "Younger puppies generally need more frequent care and potty opportunities than older dogs. Plan your puppy's day with that in mind."
    );
  }

  notes.push(
    "This plan is general educational guidance, not veterinary or professional behavioral advice. If something feels off with your puppy's health or behavior, talk to your veterinarian or a qualified trainer."
  );

  return notes;
}
