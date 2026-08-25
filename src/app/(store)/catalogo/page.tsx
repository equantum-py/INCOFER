import type { Metadata } from "next";
import { Suspense } from "react";

import { getAllProductsState } from "@/app/actions";
import { GridProducts, ProductItem, ProductsSkeleton } from "@/components/products";

export const metadata: Metadata = {
  title: "Catálogo | INCOFER",
  description: "Explorá el catálogo de productos disponibles en INCOFER.",
};

async function CatalogContent() {
  const { products, error } = await getAllProductsState();

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-5 py-8 text-center">
        <h2 className="text-lg font-extrabold text-red-900">No pudimos cargar el catálogo</h2>
        <p className="mt-2 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
        <h2 className="text-lg font-extrabold text-[#073c55]">Catálogo en actualización</h2>
        <p className="mt-2 text-sm text-slate-500">Todavía no hay productos reales publicados.</p>
      </div>
    );
  }

  return (
    <GridProducts>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </GridProducts>
  );
}

export default function CatalogPage() {
  return (
    <section className="mx-auto min-h-[50vh] max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e91d46]">INCOFER</p>
        <h1 className="mt-1 text-2xl font-black text-[#073c55] sm:text-3xl">Catálogo de productos</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Encontrá los productos publicados actualmente y accedé a su ficha para ver opciones y detalles.
        </p>
      </div>

      <Suspense fallback={<ProductsSkeleton items={8} />}>
        <CatalogContent />
      </Suspense>
    </section>
  );
}
