import { QuizContainer } from "@/components/puppy-plan/QuizContainer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Build My Puppy Plan",
  description: "Answer a few quick questions to get a personalized puppy plan.",
  path: "/puppy-plan/",
});

export default function PuppyPlanPage() {
  return <QuizContainer />;
}
