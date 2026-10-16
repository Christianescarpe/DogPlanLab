import { Suspense } from "react";
import type { Metadata } from "next";
import { ThankYouContent } from "@/components/article/ThankYouContent";

export const metadata: Metadata = {
  title: "Your Puppy Schedule Starter Kit is Ready | Dog Plan Lab",
  description: "Download your free Puppy Schedule Starter Kit printable PDF templates and charts.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Suspense
        fallback={
          <div className="py-24 text-center text-ink-soft">
            <p>Loading your starter kit...</p>
          </div>
        }
      >
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
