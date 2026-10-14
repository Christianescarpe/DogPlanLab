export type CategoryImage = { src: string; alt: string };

// One representative photo per content category, shown on article pages via
// CategoryImage.tsx. Reused across every article in that category rather than
// sourced per-article. See README.md "Image credits" for photographer credit.
export const categoryImages: Record<string, CategoryImage> = {
  "new-puppy": {
    src: "/categories/new-puppy.jpg",
    alt: "A puppy curled up asleep on a soft blanket",
  },
  "crate-training": {
    src: "/categories/crate-training.jpg",
    alt: "Three puppies sitting together inside a wire crate",
  },
  "potty-training": {
    src: "/categories/potty-training.jpg",
    alt: "A puppy sniffing the grass outside",
  },
  "puppy-barking": {
    src: "/categories/puppy-barking.jpg",
    alt: "A small dog mid-bark outdoors",
  },
  "puppy-biting": {
    src: "/categories/puppy-biting.jpg",
    alt: "A puppy gently mouthing a person's finger",
  },
  "puppy-body-language": {
    src: "/categories/puppy-body-language.jpg",
    alt: "A puppy tilting its head with a curious expression",
  },
  "puppy-chewing": {
    src: "/categories/puppy-chewing.jpg",
    alt: "A puppy chewing on a toy outdoors",
  },
  "puppy-enrichment": {
    src: "/categories/puppy-enrichment.jpg",
    alt: "A dog lying with plush enrichment toys",
  },
  "puppy-exercise": {
    src: "/categories/puppy-exercise.jpg",
    alt: "A puppy running across a grassy field",
  },
  "puppy-fear": {
    src: "/categories/puppy-fear.jpg",
    alt: "A cautious puppy peeking out from a doorway",
  },
  "puppy-handling": {
    src: "/categories/puppy-handling.jpg",
    alt: "A hand gently petting a puppy's chin",
  },
  "puppy-home-alone": {
    src: "/categories/puppy-home-alone.jpg",
    alt: "A dog sitting and waiting by a door",
  },
  "puppy-play": {
    src: "/categories/puppy-play.jpg",
    alt: "A dog playing with a ball outdoors",
  },
  "puppy-schedule": {
    src: "/categories/puppy-schedule.jpg",
    alt: "A puppy on a leash walking outdoors with its owner",
  },
  "puppy-sleep": {
    src: "/categories/puppy-sleep.jpg",
    alt: "A dog resting on a bed",
  },
  "puppy-socialization": {
    src: "/categories/puppy-socialization.jpg",
    alt: "Two dogs playing together on a grassy field",
  },
  // A handful of frontmatter files use "socialization" instead of
  // "puppy-socialization" — alias it to the same image rather than fixing
  // frontmatter across content files as part of this change.
  socialization: {
    src: "/categories/puppy-socialization.jpg",
    alt: "Two dogs playing together on a grassy field",
  },
  "puppy-teething": {
    src: "/categories/puppy-teething.jpg",
    alt: "A puppy chewing on a teething toy",
  },
  "puppy-training": {
    src: "/categories/puppy-training.jpg",
    alt: "A person training a dog outdoors with a treat",
  },
  "puppy-zoomies": {
    src: "/categories/puppy-zoomies.jpg",
    alt: "A puppy running at full speed outdoors",
  },
  shop: {
    src: "/categories/shop.jpg",
    alt: "A dog lying on the floor near its bowl and toys",
  },
};
