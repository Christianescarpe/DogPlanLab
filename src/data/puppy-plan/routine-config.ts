import { MealsPerDayOption, RoutineBlock } from "./types";

/**
 * Builds a generic structural routine skeleton from the owner's reported
 * wake time, bedtime, and meal count. This intentionally contains no
 * specific bladder-holding times, feeding amounts, or interval claims —
 * only the shape of a day. Precise numbers belong in reviewed article
 * content, never in this config.
 */
export function buildDailyRoutine(input: {
  wakeTime: string;
  bedtime: string;
  mealsPerDay: MealsPerDayOption;
}): RoutineBlock[] {
  const blocks: RoutineBlock[] = [
    {
      label: "Wake up + first potty break",
      timeHint: input.wakeTime || "Morning",
    },
    {
      label: "Breakfast",
      timeHint: "Shortly after waking",
    },
    {
      label: "Short play or training session",
      timeHint: "Mid-morning",
    },
    {
      label: "Rest / nap",
      timeHint: "Late morning",
    },
  ];

  const mealCount = input.mealsPerDay === "not-sure" ? 3 : Number(input.mealsPerDay);

  if (mealCount >= 3) {
    blocks.push({ label: "Midday meal + potty break", timeHint: "Midday" });
  }

  blocks.push(
    { label: "Afternoon play, training, or a walk", timeHint: "Afternoon" },
    { label: "Rest / nap", timeHint: "Afternoon" }
  );

  if (mealCount >= 4) {
    blocks.push({ label: "Additional meal + potty break", timeHint: "Late afternoon" });
  }

  blocks.push(
    { label: "Dinner", timeHint: "Early evening" },
    { label: "Calm wind-down time", timeHint: "Evening" },
    {
      label: "Final potty break before bed",
      timeHint: `Before ${input.bedtime || "bedtime"}`,
    },
    { label: "Bedtime", timeHint: input.bedtime || "Evening" }
  );

  return blocks;
}
