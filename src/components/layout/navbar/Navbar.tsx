"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FiHeart, FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";

import { STORE_NAV_LINKS } from "@/config/storefront";
import { useManager } from "@/hooks/useManager";
import { useSession } from "@/lib/auth/client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CartLink } from "./CartLink";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";
import { WishlistLink } from "./WishlistLink";

const EditProfile = dynamic(() => import("./EditProfile"), { ssr: false });

export const Navbar = () => {
  const { data: session, isPending } = useSession();
  const editProfileManager = useManager();

  return (
    <>
      <header className="pointer-events-auto w-full border-b border-slate-200 bg-white text-slate-900">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center gap-3 px-4 sm:min-h-[76px] sm:gap-4 sm:px-6 lg:px-10">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-200 text-[#073c55] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073c55] lg:hidden"
                aria-label="Abrir menú"
              >
                <FiMenu size={22} aria-hidden />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[88%] max-w-sm p-0">
              <div className="border-b border-slate-200 px-6 py-5">
                <SheetTitle className="text-xl font-black text-[#073c55]">INCOFER</SheetTitle>
                <p className="mt-1 text-xs text-slate-500">Ferretería online</p>
              </div>

              <nav className="p-4" aria-label="Navegación mobile">
                {STORE_NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-12 items-center border-b border-slate-100 px-3 text-sm font-semibold text-slate-700 transition hover:text-[#d7193f]"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <SheetClose asChild>
                  <Link href="/cart" className="flex min-h-12 items-center gap-2 border-b border-slate-100 px-3 text-sm font-semibold text-slate-700">
                    <FiShoppingCart aria-hidden /> Carrito
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/wishlist" className="flex min-h-12 items-center gap-2 border-b border-slate-100 px-3 text-sm font-semibold text-slate-700">
                    <FiHeart aria-hidden /> Favoritos
                  </Link>
                </SheetClose>

                {session?.user && !isPending ? (
                  <SheetClose asChild>
                    <Link href="/orders" className="flex min-h-12 items-center border-b border-slate-100 px-3 text-sm font-semibold text-slate-700">
                      Mis pedidos
                    </Link>
                  </SheetClose>
                ) : null}

                {!session?.user && !isPending ? (
                  <SheetClose asChild>
                    <Link href="/login" className="mt-4 flex min-h-12 items-center gap-2 rounded-md bg-[#073c55] px-4 text-sm font-bold text-white">
                      <FiUser aria-hidden /> Iniciar sesión
                    </Link>
                  </SheetClose>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="shrink-0 leading-none" aria-label="INCOFER - Inicio">
            <span className="block text-2xl font-black tracking-[-0.06em] text-[#d7193f] sm:text-3xl">INCOFER</span>
            <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#073c55] sm:mt-1 sm:text-[10px]">Ferretería</span>
          </Link>

          <div className="mx-auto hidden w-full max-w-2xl sm:block">
            <SearchInput />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {!isPending && session?.user ? (
              <div className="hidden lg:block">
                <UserMenu manager={editProfileManager} />
              </div>
            ) : !isPending ? (
              <Link
                href="/login"
                className="hidden min-h-11 items-center gap-2 px-3 text-sm font-semibold text-[#073c55] transition hover:text-[#d7193f] lg:flex"
              >
                <FiUser size={19} aria-hidden />
                <span>Mi cuenta</span>
              </Link>
            ) : null}

            <div className="hidden sm:block">
              <WishlistLink />
            </div>
            <CartLink />
          </div>
        </div>

        <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:hidden">
          <SearchInput />
        </div>

        <nav className="hidden border-t border-slate-200 lg:block" aria-label="Navegación principal">
          <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-10 px-10 py-3.5">
            {STORE_NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-h-11 items-center text-sm font-semibold transition hover:text-[#d7193f] ${index === 0 ? "text-[#d7193f]" : "text-slate-700"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <EditProfile manager={editProfileManager} />
    </>
  );
};
