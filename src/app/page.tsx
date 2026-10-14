import { Hero } from "@/components/home/Hero";
import { ProblemSelector } from "@/components/home/ProblemSelector";
import { StruggleCards } from "@/components/home/StruggleCards";
import { PuppyPlanExplainer } from "@/components/home/PuppyPlanExplainer";
import { CoreGuides } from "@/components/home/CoreGuides";
import { TrustSection } from "@/components/home/TrustSection";
import { FreeResources } from "@/components/home/FreeResources";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSelector />
      <StruggleCards />
      <PuppyPlanExplainer />
      <CoreGuides />
      <TrustSection />
      <FreeResources />
      <NewsletterCTA />
    </>
  );
}
