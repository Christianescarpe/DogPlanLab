import Image from "next/image";
import clsx from "clsx";
import { categoryImages } from "@/data/category-images";

export function CategoryImage({ category, className }: { category: string; className?: string }) {
  const image = categoryImages[category];
  if (!image) return null;

  return (
    <div
      className={clsx(
        "relative aspect-[4/3] overflow-hidden rounded-2xl border border-border",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 288px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
