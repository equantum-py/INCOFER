import dynamic from "next/dynamic";

import type { ProductWithVariants } from "@/lib/db/drizzle/schema";

import { ProductCard } from "./ProductCard";

const WishlistButton = dynamic(() => import("../wishlist/WishlistButton"));

interface ProductItemProps {
  product: ProductWithVariants;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const { name, id, img, price, category, variants } = product;
  const primaryVariant = variants[0];
  const variantQuery = primaryVariant?.color
    ? `?variant=${encodeURIComponent(primaryVariant.color)}`
    : "";
  const productLink = `/${category}/${id}${variantQuery}`;
  const image = primaryVariant?.images?.[0] ?? img;

  return (
    <ProductCard
      href={productLink}
      image={image}
      name={name}
      price={price}
      availability={primaryVariant ? undefined : "out-of-stock"}
      action={{
        type: "link",
        href: productLink,
        label: primaryVariant ? "Ver producto" : "No disponible",
      }}
      accessory={<WishlistButton productId={id} />}
    />
  );
};
