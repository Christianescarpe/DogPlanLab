/**
 * Email/CRM provider abstraction.
 *
 * Includes GoHighLevel (GHL) provider for the Puppy Schedule Starter Kit
 * funnel, plus fallback mock provider for other V1 endpoints.
 */

export type Lead = {
  email: string;
  puppyName?: string;
  puppyAgeRange?: string;
  puppyAgeLabel?: string;
  puppyAgeScheduleUrl?: string;
  wakeTime?: string;
  bedtime?: string;
  mealsPerDay?: string;
  ownerAvailability?: string;
  primaryChallenge?: string;
  progressLevel?: string;
  signupSource: string;
  signupPage: string;
  placement?: string;
  consent?: boolean;
  signupDate: string;
  tags: string[];
  workflowTrigger?: string;
};

export interface EmailProvider {
  name: string;
  /** Returns true only if the lead was actually accepted by the provider. */
  subscribe(lead: Lead): Promise<{ success: boolean; message: string; contactId?: string }>;
}

/**
 * Checks whether GoHighLevel credentials (either Inbound Webhook URL or
 * Private Integration API v2 Key + Location ID) are configured on the server.
 */
export function isGhlConfigured(): boolean {
  const hasWebhook = Boolean(
    process.env.GHL_STARTER_KIT_WEBHOOK_URL?.trim() || process.env.GHL_WEBHOOK_URL?.trim()
  );
  const hasApiV2 = Boolean(
    process.env.GHL_API_KEY?.trim() && process.env.GHL_LOCATION_ID?.trim()
  );
  return hasWebhook || hasApiV2;
}

/**
 * GoHighLevel (LeadConnector) Provider.
 *
 * Supports two official GHL integration modes (or both simultaneously):
 * 1. GHL Workflow Inbound Webhook (`GHL_STARTER_KIT_WEBHOOK_URL` or `GHL_WEBHOOK_URL`)
 * 2. GHL API v2 Contacts Upsert (`GHL_API_KEY` + `GHL_LOCATION_ID`, with optional `GHL_WORKFLOW_ID`)
 *
 * Never fakes a successful response: returns `success: true` ONLY when GoHighLevel
 * responds with HTTP 2xx confirming the contact/webhook was accepted.
 */
export class GoHighLevelProvider implements EmailProvider {
  name = "gohighlevel";

  async subscribe(lead: Lead): Promise<{ success: boolean; message: string; contactId?: string }> {
    if (!isGhlConfigured()) {
      return {
        success: false,
        message:
          "GoHighLevel integration is not connected yet. Form submissions remain disabled until GHL credentials are configured.",
      };
    }

    const webhookUrl =
      process.env.GHL_STARTER_KIT_WEBHOOK_URL?.trim() || process.env.GHL_WEBHOOK_URL?.trim();
    const apiKey = process.env.GHL_API_KEY?.trim();
    const locationId = process.env.GHL_LOCATION_ID?.trim();
    const workflowId = process.env.GHL_WORKFLOW_ID?.trim();

    let contactId: string | undefined;

    try {
      // Mode 1: GHL Official API v2 Contact Upsert (+ Tags & Custom Fields)
      if (apiKey && locationId) {
        const customFields: Array<{ id?: string; key?: string; field_value: string | boolean }> = [];

        if (lead.puppyAgeRange) {
          customFields.push({
            key: process.env.GHL_FIELD_PUPPY_AGE || "puppy_age",
            field_value: lead.puppyAgeRange,
          });
        }
        if (lead.puppyAgeLabel) {
          customFields.push({
            key: process.env.GHL_FIELD_PUPPY_AGE_LABEL || "puppy_age_label",
            field_value: lead.puppyAgeLabel,
          });
        }
        if (lead.puppyAgeScheduleUrl) {
          customFields.push({
            key: process.env.GHL_FIELD_PUPPY_AGE_URL || "puppy_age_schedule_url",
            field_value: lead.puppyAgeScheduleUrl,
          });
        }
        customFields.push({
          key: process.env.GHL_FIELD_SOURCE_PAGE || "source_page",
          field_value: lead.signupPage,
        });
        customFields.push({
          key: process.env.GHL_FIELD_CONSENT || "email_consent",
          field_value: Boolean(lead.consent),
        });

        const upsertResponse = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            locationId,
            email: lead.email,
            source: `DogPlanLab Starter Kit (${lead.signupPage})`,
            tags: lead.tags,
            customFields,
          }),
        });

        if (!upsertResponse.ok) {
          const errText = await upsertResponse.text().catch(() => "Unknown GHL API error");
          console.error("[email-provider:ghl] Contact upsert failed:", upsertResponse.status, errText);
          return {
            success: false,
            message: "Unable to save your signup right now. Please try again shortly.",
          };
        }

        const upsertData = (await upsertResponse.json().catch(() => ({}))) as {
          contact?: { id?: string };
        };
        contactId = upsertData?.contact?.id;

        // Ensure the tag is merged even if the contact already existed with prior tags
        if (contactId && lead.tags.length > 0) {
          await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ tags: lead.tags }),
          }).catch((err) => console.warn("[email-provider:ghl] Tag append warning:", err));
        }

        // Optional direct workflow enrollment if GHL_WORKFLOW_ID is specified
        if (contactId && workflowId) {
          const wfRes = await fetch(
            `https://services.leadconnectorhq.com/contacts/${contactId}/workflow/${workflowId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                Version: "2021-07-28",
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ eventStartTime: new Date().toISOString() }),
            }
          );
          if (!wfRes.ok) {
            console.warn("[email-provider:ghl] Direct workflow trigger warning:", wfRes.status);
          }
        }
      }

      // Mode 2: GHL Workflow Inbound Webhook Trigger
      if (webhookUrl) {
        const webhookPayload = {
          email: lead.email,
          puppy_age: lead.puppyAgeRange || "",
          puppy_age_label: lead.puppyAgeLabel || "",
          puppy_age_schedule_url:
            lead.puppyAgeScheduleUrl || "https://dogplanlab.com/puppy-schedule/by-age/",
          source_page: lead.signupPage,
          placement: lead.placement || "primary",
          signup_source: lead.signupSource,
          consent: Boolean(lead.consent),
          consent_status: lead.consent ? "granted" : "declined",
          consent_timestamp: lead.signupDate,
          tag: "DPL - Puppy Schedule Starter Kit",
          tags: lead.tags,
          workflow_trigger: lead.workflowTrigger || "starter_kit_8_email_sequence",
          contact_id: contactId || undefined,
        };

        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(webhookPayload),
        });

        if (!webhookResponse.ok) {
          const errText = await webhookResponse.text().catch(() => "Unknown GHL Webhook error");
          console.error(
            "[email-provider:ghl] Inbound webhook failed:",
            webhookResponse.status,
            errText
          );
          return {
            success: false,
            message: "Unable to complete your signup right now. Please try again shortly.",
          };
        }
      }

      return {
        success: true,
        message: "Your Starter Kit is on its way!",
        contactId,
      };
    } catch (error) {
      console.error("[email-provider:ghl] Network or unexpected error:", error);
      return {
        success: false,
        message: "Connection error while submitting your request. Please try again.",
      };
    }
  }
}

/**
 * Mock provider for local development of non-GHL endpoints.
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

export const goHighLevelProvider = new GoHighLevelProvider();

function resolveProvider(): EmailProvider {
  if (process.env.EMAIL_PROVIDER === "gohighlevel" || isGhlConfigured()) {
    return goHighLevelProvider;
  }
  return new MockEmailProvider();
}

export const activeProvider = resolveProvider();
