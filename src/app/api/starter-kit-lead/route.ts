import { NextRequest, NextResponse } from "next/server";
import { goHighLevelProvider, isGhlConfigured, type Lead } from "@/lib/email-provider";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const STARTER_KIT_PRIMARY_TAG = "DPL - Puppy Schedule Starter Kit";

const AGE_METADATA_MAP: Record<
  string,
  { tag: string; label: string; scheduleUrl: string }
> = {
  "8–10 weeks": {
    tag: "DPL - Age: 8-10 weeks",
    label: "8-week-old",
    scheduleUrl: "https://dogplanlab.com/puppy-schedule/by-age/#8-weeks",
  },
  "10–12 weeks": {
    tag: "DPL - Age: 10-12 weeks",
    label: "10-week-old",
    scheduleUrl: "https://dogplanlab.com/puppy-schedule/by-age/#10-weeks",
  },
  "12–16 weeks": {
    tag: "DPL - Age: 12-16 weeks",
    label: "12-week-old",
    scheduleUrl: "https://dogplanlab.com/puppy-schedule/by-age/#12-weeks",
  },
  "4–6 months": {
    tag: "DPL - Age: 4-6 months",
    label: "4–6-month-old",
    scheduleUrl: "https://dogplanlab.com/puppy-schedule/by-age/#4-6-months",
  },
  "Not sure yet": {
    tag: "DPL - Age: Not sure yet",
    label: "",
    scheduleUrl: "https://dogplanlab.com/puppy-schedule/by-age/",
  },
};

export async function GET() {
  return NextResponse.json({
    configured: isGhlConfigured(),
    provider: "gohighlevel",
    tag: STARTER_KIT_PRIMARY_TAG,
  });
}

export async function POST(request: NextRequest) {
  if (!isGhlConfigured()) {
    return NextResponse.json(
      {
        success: false,
        code: "GHL_NOT_CONNECTED",
        message:
          "Email signup is currently disabled on this preview until GoHighLevel credentials are connected.",
      },
      { status: 503 }
    );
  }

  let body: {
    email?: string;
    puppyAge?: string;
    consent?: boolean;
    signupPage?: string;
    placement?: string;
  };

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

  if (body.consent !== true) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the consent box so we can email you the Starter Kit.",
      },
      { status: 400 }
    );
  }

  const tags: string[] = [STARTER_KIT_PRIMARY_TAG];
  const puppyAge = body.puppyAge?.trim();
  const ageMeta = puppyAge ? AGE_METADATA_MAP[puppyAge] : undefined;

  if (ageMeta?.tag) {
    tags.push(ageMeta.tag);
  }

  const lead: Lead = {
    email,
    puppyAgeRange: puppyAge || undefined,
    puppyAgeLabel: ageMeta?.label || undefined,
    puppyAgeScheduleUrl:
      ageMeta?.scheduleUrl || "https://dogplanlab.com/puppy-schedule/by-age/",
    signupSource: "starter_kit",
    signupPage: body.signupPage || "/puppy-schedule/",
    placement: body.placement || "primary",
    consent: true,
    signupDate: new Date().toISOString(),
    tags,
    workflowTrigger: "starter_kit_8_email_sequence",
  };

  const result = await goHighLevelProvider.subscribe(lead);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message:
          result.message ||
          "Could not submit your request to our email system. Please try again.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: result.message,
      redirectUrl: `/thank-you/?kit=ready${puppyAge ? `&age=${encodeURIComponent(puppyAge)}` : ""}`,
    },
    { status: 200 }
  );
}
