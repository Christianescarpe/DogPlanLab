"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export type StarterKitCTAProps = {
  headline: string;
  copy: string;
  placement?: "primary" | "secondary";
  compact?: boolean;
};

export const PUPPY_AGE_CHOICES = [
  "8–10 weeks",
  "10–12 weeks",
  "12–16 weeks",
  "4–6 months",
  "Not sure yet",
] as const;

export function StarterKitCTA({
  headline,
  copy,
  placement = "primary",
  compact = false,
}: StarterKitCTAProps) {
  const [email, setEmail] = useState("");
  const [puppyAge, setPuppyAge] = useState("");
  const [consent, setConsent] = useState(false);
  const [ghlConnected, setGhlConnected] = useState<boolean>(false);
  const [checkingConfig, setCheckingConfig] = useState<boolean>(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    let active = true;
    fetch("/api/starter-kit-lead", { method: "GET" })
      .then((r) => r.json())
      .then((data) => {
        if (active) {
          setGhlConnected(Boolean(data?.configured));
          setCheckingConfig(false);
        }
      })
      .catch(() => {
        if (active) {
          setGhlConnected(false);
          setCheckingConfig(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackEvent({
            name: "starter_kit_cta_viewed",
            page: window.location.pathname,
            placement,
          });
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [placement]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!ghlConnected) {
      setStatus("error");
      setErrorMessage(
        "Signup form is disabled on this preview until GoHighLevel credentials are connected."
      );
      return;
    }

    if (!email) return;

    if (!consent) {
      setStatus("error");
      setErrorMessage("Please check the consent box so we can send you the Starter Kit.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    trackEvent({
      name: "starter_kit_cta_clicked",
      page: window.location.pathname,
      placement,
    });

    try {
      const res = await fetch("/api/starter-kit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          puppyAge: puppyAge || undefined,
          consent,
          signupPage: window.location.pathname,
          placement,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        trackEvent({
          name: "starter_kit_submitted",
          page: window.location.pathname,
          placement,
          puppyAge: puppyAge || undefined,
        });

        const redirectUrl =
          data.redirectUrl ||
          `/thank-you/?kit=ready${puppyAge ? `&age=${encodeURIComponent(puppyAge)}` : ""}`;
        window.location.href = redirectUrl;
      } else {
        setStatus("error");
        setErrorMessage(
          data.message || "Something went wrong. Please check your email and try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  const isFormDisabled = !checkingConfig && !ghlConnected;

  return (
    <div
      ref={containerRef}
      id={placement === "primary" ? "starter-kit-form" : "starter-kit-form-secondary"}
      className={`not-prose my-10 rounded-3xl border border-accent/30 bg-surface/90 shadow-sm transition-all ${
        compact ? "p-6 sm:p-7" : "p-7 sm:p-9"
      }`}
    >
      <div className="max-w-xl">
        <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          Free Printable Guide
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
          {copy}
        </p>

        <form
          onSubmit={handleSubmit}
          aria-disabled={isFormDisabled}
          className="mt-6 space-y-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={`email-${placement}`} className="block text-xs font-medium text-ink-soft">
                Email address <span className="text-accent">*</span>
              </label>
              <input
                id={`email-${placement}`}
                type="email"
                required
                disabled={isFormDisabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="mt-1 w-full rounded-xl border border-border-strong bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor={`age-${placement}`} className="block text-xs font-medium text-ink-soft">
                Puppy&rsquo;s age (optional — helps us send you the right schedule)
              </label>
              <select
                id={`age-${placement}`}
                value={puppyAge}
                onChange={(e) => setPuppyAge(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border-strong bg-paper px-3.5 py-2.5 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent"
              >
                <option value="">Select age (optional)</option>
                {PUPPY_AGE_CHOICES.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              id={`consent-${placement}`}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border-strong bg-paper text-accent focus:ring-accent"
            />
            <label htmlFor={`consent-${placement}`} className="text-xs leading-normal text-muted">
              Email me the Starter Kit and occasional puppy-schedule tips. Unsubscribe anytime. View our{" "}
              <Link href="/privacy/" className="underline hover:text-ink-soft">
                privacy policy
              </Link>
              .
            </label>
          </div>

          {errorMessage && (
            <p className="text-xs text-caution" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={checkingConfig || isFormDisabled || status === "loading"}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-dark sm:w-auto disabled:cursor-not-allowed disabled:opacity-55"
            >
              {status === "loading" ? "Preparing your kit..." : "Send me the free kit"}
            </button>
            <p className="mt-2 text-xs text-muted">
              Free forever. No spam — just the kit and genuinely useful puppy-schedule emails.
            </p>
            {isFormDisabled && (
              <p
                className="mt-2 rounded-lg border border-border bg-paper/70 px-3 py-1.5 text-xs text-ink-soft"
                data-testid="ghl-disabled-notice"
              >
                <strong className="font-semibold text-ink">Staging Preview:</strong> Form submission is disabled until GoHighLevel integration credentials are connected.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
