import { NextRequest, NextResponse } from "next/server";
import { activeProvider, type Lead } from "@/lib/email-provider";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: { email?: string; signupPage?: string };

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
    signupSource: "newsletter",
    signupPage: body.signupPage ?? "/",
    signupDate: new Date().toISOString(),
    tags: ["NEWSLETTER"],
  };

  const result = await activeProvider.subscribe(lead);

  return NextResponse.json(result, { status: result.success ? 200 : 502 });
}
