/**
 * Email/CRM provider abstraction.
 *
 * V1 ships only a local mock implementation — no ESP is connected. Swap
 * `activeProvider` below for a real implementation (ConvertKit, Beehiiv,
 * GoHighLevel, etc.) once credentials exist. See README.md → "Connecting an
 * email provider" for the integration steps and required env vars.
 */

export type Lead = {
  email: string;
  puppyName?: string;
  puppyAgeRange?: string;
  wakeTime?: string;
  bedtime?: string;
  mealsPerDay?: string;
  ownerAvailability?: string;
  primaryChallenge?: string;
  progressLevel?: string;
  signupSource: string;
  signupPage: string;
  signupDate: string;
  tags: string[];
};

export interface EmailProvider {
  name: string;
  /** Returns true only if the lead was actually accepted by the provider. */
  subscribe(lead: Lead): Promise<{ success: boolean; message: string }>;
}

/**
 * Mock provider for local development. Logs the lead and appends it to
 * .data/leads.ndjson (gitignored) when the filesystem is writable — never
 * assume delivery to a real list. In serverless/production environments
 * where the filesystem is read-only, it logs only.
 */
class MockEmailProvider implements EmailProvider {
  name = "mock";

  async subscribe(lead: Lead): Promise<{ success: boolean; message: string }> {
    console.log("[email-provider:mock] captured lead", {
      email: lead.email,
      signupSource: lead.signupSource,
      tags: lead.tags,
    });

    try {
      const { appendFile, mkdir } = await import("node:fs/promises");
      const path = await import("node:path");
      const dir = path.join(process.cwd(), ".data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "leads.ndjson"), `${JSON.stringify(lead)}\n`, "utf8");
    } catch {
      // Read-only filesystem (e.g. serverless) — logging above is sufficient for V1.
    }

    return {
      success: true,
      message:
        "Saved locally (mock provider). No email service is connected yet — see README.md.",
    };
  }
}

/**
 * Example real-provider stub. Fill in with an actual API call once an ESP
 * is chosen, then set EMAIL_PROVIDER=convertkit (or similar) in the
 * environment to switch `activeProvider` below.
 */
class ConvertKitProvider implements EmailProvider {
  name = "convertkit";

  async subscribe(): Promise<{ success: boolean; message: string }> {
    throw new Error(
      "ConvertKitProvider is not implemented. Add the API call in src/lib/email-provider.ts."
    );
  }
}

function resolveProvider(): EmailProvider {
  switch (process.env.EMAIL_PROVIDER) {
    case "convertkit":
      return new ConvertKitProvider();
    default:
      return new MockEmailProvider();
  }
}

export const activeProvider = resolveProvider();
