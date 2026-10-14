"use client";

import { FormEvent, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, signupPage: window.location.pathname }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="py-16 sm:py-20">
      <Container size="narrow" className="rounded-3xl border border-border bg-brand-light/40 p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Get puppy guidance in your inbox
        </h2>
        <p className="mt-3 text-ink-soft">
          New guides, checklists, and plan updates — no spam, unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full border border-border-strong bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Submitting..." : "Subscribe"}
          </Button>
        </form>

        {message && (
          <p
            role="status"
            className={`mt-3 text-sm ${status === "error" ? "text-caution" : "text-accent-dark"}`}
          >
            {message}
          </p>
        )}
      </Container>
    </section>
  );
}
