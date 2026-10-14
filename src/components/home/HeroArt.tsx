import Image from "next/image";

/**
 * Hero photo: "Adorable golden retriever puppy outdoors" by Michelle
 * Chadwick, via Pexels (free-to-use license, no attribution required) —
 * credited anyway in README.md. Bright, happy, direct-eye-contact shot
 * (swapped from an earlier dark/cinematic sleeping-puppy concept). Swap
 * `public/hero-puppy.jpg` and update that credit if this photo is ever
 * replaced.
 */
export function HeroArt() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border">
      <Image
        src="/hero-puppy.jpg"
        alt="A happy golden retriever puppy smiling outdoors"
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
