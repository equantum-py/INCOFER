"use server";

import { cacheLife, cacheTag, updateTag } from "next/cache";
import { productsRepository } from "@/lib/db/drizzle/repositories";
import {
  type ProductCategory,
  productWithVariantsSchema,
  type ProductWithVariants,
} from "@/lib/db/drizzle/schema";

export interface ProductListState {
  products: ProductWithVariants[];
  error: string | null;
}

async function loadAllProducts(): Promise<ProductWithVariants[]> {
  const products = await productsRepository.findAll();
  const validatedProducts = productWithVariantsSchema.array().parse(products);
  return validatedProducts.sort((a, b) => a.name.localeCompare(b.name));
}

/** Fetch all products with caching for normal catalog surfaces. */
export async function getAllProducts(): Promise<ProductWithVariants[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  try {
    return await loadAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch all products while preserving an explicit UI error state.
 * Used by surfaces where "empty catalog" and "catalog failed" must not look
 * like the same thing.
 */
export async function getAllProductsState(): Promise<ProductListState> {
  try {
    return { products: await loadAllProducts(), error: null };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      error: "No pudimos cargar los productos. Intentá nuevamente en unos minutos.",
    };
  }
}

/** Fetch products by category with caching. */
export async function getCategoryProducts(
  category: ProductCategory,
): Promise<ProductWithVariants[]> {
  "use cache";
  cacheTag("products", `category-${category}`);
  cacheLife("hours");

  try {
    const products = await productsRepository.findByCategory(category);
    const validatedProducts = productWithVariantsSchema.array().parse(products);
    return validatedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

/** Fetch a single product by ID with caching. */
export async function getProduct(
  productId: number,
): Promise<ProductWithVariants | null> {
  "use cache";
  cacheTag("products", `product-${productId}`);
  cacheLife("hours");

  try {
    const product = await productsRepository.findById(productId);
    if (!product) return null;
    return productWithVariantsSchema.parse(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/** Fetch random products excluding a specific product. */
export async function getRandomProducts(
  productIdToExclude: number,
): Promise<ProductWithVariants[]> {
  try {
    const allProducts = await getAllProducts();
    const filtered = allProducts.filter((product) => product.id !== productIdToExclude);
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return productWithVariantsSchema.array().parse(shuffled.slice(0, 6));
  } catch (error) {
    console.error("Error fetching random products:", error);
    return [];
  }
}

/** Invalidates product caches after catalog writes. */
export async function revalidateProducts(productId?: number): Promise<void> {
  updateTag("products");

  if (productId) {
    updateTag(`product-${productId}`);
  }
}
