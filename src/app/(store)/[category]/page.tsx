import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getCategoryProducts } from "@/app/actions";
import { GridProducts, ProductItem, ProductsSkeleton } from "@/components/products";
import { STORE_CATEGORIES, getStoreCategory } from "@/config/storefront";
import {
  type ProductCategory,
  ProductCategoryZod,
} from "@/lib/db/drizzle/schema";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return STORE_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const parsedCategory = ProductCategoryZod.safeParse(category);

  if (!parsedCategory.success) {
    return {
      title: "Categoría | INCOFER",
      description: "Explorá el catálogo de INCOFER por categoría.",
    };
  }

  const storefrontCategory = getStoreCategory(parsedCategory.data);
  const label = storefrontCategory?.name ?? parsedCategory.data;

  return {
    title: `${label} | INCOFER`,
    description:
      storefrontCategory?.description ?? `Productos de ${label} disponibles en INCOFER.`,
  };
}

async function DynamicCategoryContent({ params }: Props) {
  const { category } = await params;
  const parsedCategory = ProductCategoryZod.safeParse(category);

  if (!parsedCategory.success) {
    notFound();
  }

  return <CategoryProducts category={parsedCategory.data} />;
}

const CategoryPage = async ({ params }: Props) => {
  return (
    <section className="mx-auto min-h-[50vh] max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <Suspense fallback={<ProductsSkeleton items={8} />}>
        <DynamicCategoryContent params={params} />
      </Suspense>
    </section>
  );
};

const CategoryProducts = async ({ category }: { category: ProductCategory }) => {
  const products = await getCategoryProducts(category);
  const storefrontCategory = getStoreCategory(category);
  const label = storefrontCategory?.name ?? category;

  return (
    <>
      <div className="mb-6 border-b border-slate-200 pb-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e91d46]">Categoría</p>
        <h1 className="mt-1 text-2xl font-black text-[#073c55] sm:text-3xl">{label}</h1>
        {storefrontCategory?.description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{storefrontCategory.description}</p>
        ) : null}
      </div>

      {products.length > 0 ? (
        <GridProducts>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </GridProducts>
      ) : (
        <div className="rounded-md border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <h2 className="text-lg font-extrabold text-[#073c55]">Sin productos publicados</h2>
          <p className="mt-2 text-sm text-slate-500">Esta categoría todavía no tiene productos disponibles para mostrar.</p>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
