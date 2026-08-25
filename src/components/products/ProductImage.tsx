import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/db/drizzle/schema";

interface ProductImageProps {
  image: ProductVariant["images"][number];
  name: Product["name"];
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  blurDataURL?: string | null;
  className?: string;
}

export const ProductImage = ({
  image,
  name,
  width,
  height,
  priority,
  sizes,
  quality,
  unoptimized,
  blurDataURL,
  className,
}: ProductImageProps) => {
  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        fill
        src={image}
        alt={name}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL ?? undefined}
        quality={quality}
        unoptimized={unoptimized}
        sizes={sizes}
        className={cn("object-contain p-3", className)}
      />
    </div>
  );
};
