import Link from "next/link";

import { STORE_CATEGORIES, STOREFRONT } from "@/config/storefront";

const purchaseLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/cart", label: "Carrito" },
  { href: "/wishlist", label: "Favoritos" },
];

const accountLinks = [
  { href: "/login", label: "Iniciar sesión" },
  { href: "/orders", label: "Mis pedidos" },
];

function FooterList({ links }: { links: ReadonlyArray<{ href: string; label: string }> }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-sm text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const Footer = () => {
  const categoryLinks = STORE_CATEGORIES.map((category) => ({
    href: `/${category.slug}`,
    label: category.name,
  }));

  return (
    <footer className="pointer-events-auto border-t border-white/10 bg-[#062f43] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <Link href="/" className="inline-block" aria-label="INCOFER - Inicio">
              <span className="text-3xl font-black tracking-tight">{STOREFRONT.name}</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.34em] text-slate-300">Ferretería</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Ecommerce de ferretería preparado para organizar productos, categorías, carrito y compra online.
            </p>
          </div>

          <div className="hidden md:block">
            <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white">Categorías</h2>
            <FooterList links={categoryLinks} />
          </div>
          <div className="hidden md:block">
            <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white">Comprar</h2>
            <FooterList links={purchaseLinks} />
          </div>
          <div className="hidden md:block">
            <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white">Mi cuenta</h2>
            <FooterList links={accountLinks} />
          </div>
        </div>

        <div className="mt-8 divide-y divide-white/10 border-y border-white/10 md:hidden">
          <details className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-sm font-bold">
              Categorías <span aria-hidden className="text-slate-400 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-4"><FooterList links={categoryLinks} /></div>
          </details>
          <details className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-sm font-bold">
              Comprar <span aria-hidden className="text-slate-400 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-4"><FooterList links={purchaseLinks} /></div>
          </details>
          <details className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-sm font-bold">
              Mi cuenta <span aria-hidden className="text-slate-400 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-4"><FooterList links={accountLinks} /></div>
          </details>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
          <p>© 2026 {STOREFRONT.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
