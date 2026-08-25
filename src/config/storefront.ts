import type { ProductCategory } from "@/lib/db/drizzle/schema";

export const STOREFRONT = {
  name: "INCOFER",
  country: "Paraguay",
  currency: "PYG",
  contact: {
    phone: null,
    email: null,
    whatsapp: null,
    instagram: null,
    facebook: null,
  },
} as const;

/**
 * Transitional storefront mapping.
 * The database still uses the original template slugs (t-shirts, pants,
 * sweatshirts). These labels keep the public UI coherent while the catalog
 * schema is migrated to real ferretería categories.
 */
export const STORE_CATEGORIES: Array<{
  slug: ProductCategory;
  name: string;
  description: string;
}> = [
  {
    slug: "t-shirts",
    name: "Herramientas eléctricas",
    description: "Equipos eléctricos para obra, taller y mantenimiento.",
  },
  {
    slug: "pants",
    name: "Herramientas manuales",
    description: "Herramientas de uso diario para profesionales y hogar.",
  },
  {
    slug: "sweatshirts",
    name: "Construcción",
    description: "Productos y soluciones para trabajos de construcción.",
  },
];

export const STORE_NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#categorias", label: "Categorías" },
] as const;

export function getStoreCategory(slug: string) {
  return STORE_CATEGORIES.find((category) => category.slug === slug);
}

export function formatStorePrice(value: number): string {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: STOREFRONT.currency,
    maximumFractionDigits: 0,
  }).format(value);
}
