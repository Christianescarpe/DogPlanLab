/**
 * Analytics event hooks. No analytics provider is wired up in V1 — calls
 * below log to the console in development only. To connect a real provider
 * (GA4, Segment, PostHog, etc.), implement `dispatch` and set
 * NEXT_PUBLIC_ANALYTICS_ENABLED=true. See README.md → "Analytics integration".
 */

export type AnalyticsEvent =
  | { name: "puppy_plan_started" }
  | { name: "puppy_plan_step_completed"; step: number; totalSteps: number }
  | { name: "puppy_plan_completed"; primaryChallenge: string; ageRange: string }
  | { name: "puppy_plan_email_submitted"; signupSource: string }
  | { name: "cta_clicked"; ctaId: string; location: string }
  | { name: "article_viewed"; slug: string; category: string }
  | { name: "related_article_clicked"; fromSlug: string; toSlug: string };

function dispatch(event: AnalyticsEvent) {
  // Real provider integration goes here, e.g.:
  // window.gtag?.("event", event.name, event);
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event);
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  dispatch(event);
}
