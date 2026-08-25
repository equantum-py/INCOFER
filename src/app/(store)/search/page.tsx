import { Suspense } from "react";

import { getAllProductsState } from "@/app/actions";
import { GridProducts, ProductItem, ProductsSkeleton } from "@/components/products";
import { pickFirst, searchProducts } from "@/utils";

interface SearchProps {
  searchParams: Promise<{ q: string | undefined }>;
}

async function SearchResults({ searchParams }: SearchProps) {
  const [{ products, error }, params] = await Promise.all([
    getAllProductsState(),
    searchParams,
  ]);
  const q = (pickFirst(params, "q") ?? "").trim();

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-5 py-8 text-center">
        <h1 className="text-lg font-extrabold text-red-900">No pudimos cargar la búsqueda</h1>
        <p className="mt-2 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  const filteredProducts = searchProducts(products, q);

  return (
    <>
      <div className="mb-6 border-b border-slate-200 pb-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e91d46]">Buscador INCOFER</p>
        <h1 className="mt-1 text-2xl font-black text-[#073c55] sm:text-3xl">
          {q ? `Resultados para “${q}”` : "Todos los productos"}
        </h1>
      </div>

      {filteredProducts.length > 0 ? (
        <GridProducts>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </GridProducts>
      ) : (
        <div className="rounded-md border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <h2 className="text-lg font-extrabold text-[#073c55]">Sin resultados</h2>
          <p className="mt-2 text-sm text-slate-500">
            {q
              ? `No encontramos productos relacionados con “${q}”. Probá con otro término.`
              : "Todavía no hay productos publicados en el catálogo."}
          </p>
        </div>
      )}
    </>
  );
}

export default function Search(props: SearchProps) {
  return (
    <section className="mx-auto min-h-[50vh] max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <Suspense fallback={<ProductsSkeleton items={8} />}>
        <SearchResults searchParams={props.searchParams} />
      </Suspense>
    </section>
  );
}
