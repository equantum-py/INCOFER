import Fuse from "fuse.js";

import { getStoreCategory } from "@/config/storefront";
import type { ProductWithVariants } from "@/lib/db/drizzle/schema";

/**
 * Fuzzy search over the fields the current catalog actually has.
 * Brand and SKU are intentionally not indexed yet because those fields do not
 * exist in the current product schema.
 */
export function searchProducts(
  products: ProductWithVariants[],
  query?: string,
): ProductWithVariants[] {
  if (!query || query.trim() === "") {
    return products;
  }

  const searchableProducts = products.map((product) => ({
    product,
    categoryLabel: getStoreCategory(product.category)?.name ?? product.category,
  }));

  const fuse = new Fuse(searchableProducts, {
    keys: [
      "product.name",
      "product.description",
      "product.category",
      "categoryLabel",
      "product.variants.color",
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1,
  });

  return fuse.search(query.trim()).map((result) => result.item.product);
}
