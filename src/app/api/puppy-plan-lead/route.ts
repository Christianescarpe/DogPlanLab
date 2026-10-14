import { NextRequest, NextResponse } from "next/server";
import { activeProvider, type Lead } from "@/lib/email-provider";
import { buildTags } from "@/data/puppy-plan/tags";

type RequestBody = {
  email?: string;
  puppyName?: string;
  puppyAgeRange?: string;
  wakeTime?: string;
  bedtime?: string;
  mealsPerDay?: string;
  ownerAvailability?: string;
  primaryChallenge?: string;
  progressLevel?: string;
  signupPage?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: RequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "A valid email address is required." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    email,
    puppyName: body.puppyName?.trim(),
    puppyAgeRange: body.puppyAgeRange,
    wakeTime: body.wakeTime,
    bedtime: body.bedtime,
    mealsPerDay: body.mealsPerDay,
    ownerAvailability: body.ownerAvailability,
    primaryChallenge: body.primaryChallenge,
    progressLevel: body.progressLevel,
    signupSource: "puppy_plan_quiz",
    signupPage: body.signupPage ?? "/puppy-plan/",
    signupDate: new Date().toISOString(),
    tags: buildTags({
      ageRange: body.puppyAgeRange,
      challenge: body.primaryChallenge,
      progress: body.progressLevel,
    }),
  };

  const result = await activeProvider.subscribe(lead);

  return NextResponse.json(result, { status: result.success ? 200 : 502 });
}
