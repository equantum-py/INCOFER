import Link from "next/link";
import { Suspense } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiHome,
  FiPackage,
  FiSearch,
  FiShoppingCart,
  FiTool,
  FiZap,
} from "react-icons/fi";

import { getAllProducts } from "./actions";
import { STORE_CATEGORIES } from "@/config/storefront";
import {
  GridProducts,
  ProductItem,
  ProductsSkeleton,
} from "@/components/products";

const benefits = [
  {
    icon: FiSearch,
    title: "Búsqueda rápida",
    text: "Buscá productos por nombre, descripción o categoría.",
  },
  {
    icon: FiPackage,
    title: "Catálogo organizado",
    text: "Accedé a los productos desde categorías claras.",
  },
  {
    icon: FiShoppingCart,
    title: "Carrito asociado a tu cuenta",
    text: "Tu selección se gestiona de forma segura al iniciar sesión.",
  },
  {
    icon: FiCheckCircle,
    title: "Compra informada",
    text: "Revisá el detalle del producto antes de avanzar al pago.",
  },
];

function CategoryIcon({ slug }: { slug: string }) {
  if (slug === "t-shirts") return <FiZap aria-hidden />;
  if (slug === "pants") return <FiTool aria-hidden />;
  return <FiHome aria-hidden />;
}

const Home = async () => {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-[1440px] px-4 pb-5 pt-4 sm:px-6 sm:pt-5 lg:px-10">
        <div className="grid gap-3 lg:grid-cols-[2.05fr_1fr] lg:gap-4">
          <div className="relative min-h-[340px] overflow-hidden rounded-md bg-[#062f43] p-6 text-white shadow-sm sm:min-h-[400px] sm:p-10 lg:min-h-[520px] lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,rgba(35,148,190,0.28),transparent_34%),linear-gradient(120deg,rgba(3,25,36,0.98),rgba(7,60,85,0.88))]" />
            <div className="absolute -right-20 bottom-[-50px] hidden h-[410px] w-[410px] rounded-full border-[44px] border-white/5 sm:block" />
            <div className="absolute right-10 top-16 hidden h-64 w-64 rotate-[-12deg] items-center justify-center rounded-[44px] border border-white/10 bg-white/5 text-[150px] text-[#ef244b] shadow-2xl backdrop-blur-sm lg:flex lg:right-16 lg:h-72 lg:w-72">
              <FiTool aria-hidden />
            </div>

            <div className="relative z-10 flex min-h-[288px] max-w-xl flex-col justify-center sm:min-h-[320px] lg:min-h-[430px]">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 sm:mb-5 sm:px-4 sm:py-2 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-[#ef244b]" /> Potencia profesional
              </div>
              <h1 className="max-w-[620px] text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl lg:leading-[0.98]">
                Herramientas para hacer más
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-200 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                Equipá tu obra, taller o casa con soluciones para construcción, electricidad y ferretería.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                <Link
                  href="/catalogo"
                  className="inline-flex min-h-11 items-center gap-2 rounded bg-[#e91d46] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c91539] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#062f43] sm:px-7 sm:text-sm"
                >
                  Ver productos <FiArrowRight aria-hidden />
                </Link>
                <Link
                  href="#categorias"
                  className="inline-flex min-h-11 items-center gap-2 rounded border border-white/25 bg-white/5 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-7 sm:text-sm"
                >
                  Explorar categorías
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
            <Link
              href="/search?q=taladro"
              className="group relative min-h-[160px] overflow-hidden rounded-md bg-[#eef3f6] p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:min-h-[190px] sm:p-6 lg:min-h-[250px] lg:p-7"
            >
              <div className="relative z-10 max-w-[90%] sm:max-w-[75%]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#e91d46] sm:text-xs">Destacado</p>
                <h2 className="mt-1.5 text-lg font-black leading-tight text-[#073c55] sm:text-2xl lg:text-3xl">Taladros y potencia</h2>
                <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">Buscá equipos para perforación y montaje.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#073c55] sm:mt-5 sm:text-sm">Ver productos <FiArrowRight aria-hidden /></span>
              </div>
              <FiTool className="absolute -bottom-5 -right-3 text-[88px] text-[#137da4]/15 transition duration-300 group-hover:scale-105 sm:text-[120px] lg:text-[150px]" aria-hidden />
            </Link>

            <Link
              href="/search?q=electricidad"
              className="group relative min-h-[160px] overflow-hidden rounded-md bg-[#071d31] p-4 text-white transition hover:-translate-y-0.5 hover:shadow-md sm:min-h-[190px] sm:p-6 lg:min-h-[250px] lg:p-7"
            >
              <div className="relative z-10 max-w-[90%] sm:max-w-[75%]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#ef244b] sm:text-xs">Explorar</p>
                <h2 className="mt-1.5 text-lg font-black leading-tight sm:text-2xl lg:text-3xl">Electricidad y obra</h2>
                <p className="mt-2 hidden text-sm leading-6 text-slate-300 sm:block">Encontrá productos relacionados desde el buscador.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold sm:mt-5 sm:text-sm">Buscar ahora <FiArrowRight aria-hidden /></span>
              </div>
              <FiZap className="absolute -bottom-3 right-1 text-[88px] text-[#ef244b]/15 transition duration-300 group-hover:scale-105 sm:text-[120px] lg:text-[145px]" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex min-h-20 items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:gap-4 sm:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#073c55]/10 text-xl text-[#073c55]"><Icon aria-hidden /></span>
              <div>
                <p className="text-sm font-extrabold text-[#073c55]">{title}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="categorias" className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6 sm:py-10 lg:px-10">
        <div className="mb-5 flex items-end justify-between border-b border-slate-200 pb-4 sm:mb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e91d46] sm:text-xs">Encontrá lo que necesitás</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#073c55] sm:text-4xl">Comprar por categorías</h2>
          </div>
          <Link href="/catalogo" className="hidden min-h-11 items-center gap-2 text-sm font-extrabold text-[#073c55] hover:text-[#e91d46] sm:inline-flex">Ver catálogo <FiArrowRight aria-hidden /></Link>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:px-0">
          {STORE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group flex min-h-36 min-w-[165px] snap-start flex-col items-center justify-center rounded-md border border-slate-200 bg-[#fafbfc] p-5 text-center transition duration-200 hover:-translate-y-1 hover:border-[#e91d46]/50 hover:bg-white hover:shadow-md md:min-w-0"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-[#073c55] shadow-sm ring-1 ring-slate-200 transition group-hover:bg-[#073c55] group-hover:text-white sm:h-16 sm:w-16 sm:text-3xl">
                <CategoryIcon slug={category.slug} />
              </span>
              <span className="mt-4 text-sm font-extrabold leading-5 text-[#073c55]">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f6f8fa] py-10 sm:py-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mb-6 flex items-end justify-between sm:mb-7">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e91d46] sm:text-xs">Selección INCOFER</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#073c55] sm:text-4xl">Productos destacados</h2>
            </div>
            <Link href="/catalogo" className="hidden min-h-11 items-center gap-2 text-sm font-extrabold text-[#073c55] hover:text-[#e91d46] sm:inline-flex">Ver todos <FiArrowRight aria-hidden /></Link>
          </div>
          <Suspense fallback={<ProductsSkeleton items={8} />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

const FeaturedProducts = async () => {
  const products = await getAllProducts();

  if (products.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-white px-5 py-10 text-center sm:py-12">
        <h3 className="text-lg font-extrabold text-[#073c55]">Catálogo en actualización</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Todavía no hay productos publicados para mostrar en esta sección. No mostramos productos ficticios mientras se carga el catálogo real de INCOFER.
        </p>
      </div>
    );
  }

  return (
    <GridProducts>
      {products.slice(0, 8).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </GridProducts>
  );
};

export default Home;
