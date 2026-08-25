"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight, FiShoppingCart } from "react-icons/fi";

import { formatStorePrice } from "@/config/storefront";

type ProductAvailability = "available" | "out-of-stock" | "on-request";

type ProductCardAction =
  | { type: "link"; href: string; label: string }
  | { type: "button"; label: string; onClick: () => void; loading?: boolean }
  | { type: "disabled"; label: string };

interface ProductCardProps {
  href: string;
  image?: string | null;
  name: string;
  brand?: string | null;
  price?: number | null;
  previousPrice?: number | null;
  discountLabel?: string | null;
  availability?: ProductAvailability;
  action: ProductCardAction;
  accessory?: ReactNode;
}

const availabilityCopy: Record<ProductAvailability, string> = {
  available: "Disponible",
  "out-of-stock": "Agotado",
  "on-request": "Precio a consultar",
};

export function ProductCard({
  href,
  image,
  name,
  brand,
  price,
  previousPrice,
  discountLabel,
  availability,
  action,
  accessory,
}: ProductCardProps) {
  const cannotPurchase = availability === "out-of-stock";
  const requiresConsultation = price == null || availability === "on-request";

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="relative">
        <Link
          href={href}
          className="relative block aspect-[4/3] overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073c55] focus-visible:ring-inset"
          aria-label={`Ver ${name}`}
        >
          {image ? (
            <Image
              fill
              src={image}
              alt={name}
              sizes="(max-width: 389px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
              className="object-contain p-4 transition duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <span className="flex h-full items-center justify-center px-4 text-center text-xs font-semibold text-slate-400">
              Imagen pendiente
            </span>
          )}
        </Link>

        {discountLabel ? (
          <span className="absolute left-3 top-3 rounded bg-[#e91d46] px-2 py-1 text-[11px] font-extrabold text-white">
            {discountLabel}
          </span>
        ) : null}

        {accessory ? <div className="absolute right-2 top-2">{accessory}</div> : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {brand ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            {brand}
          </p>
        ) : null}

        <Link href={href} className="mt-1 focus-visible:outline-none focus-visible:underline">
          <h3 className="line-clamp-2 min-h-10 text-sm font-extrabold leading-5 text-[#073c55] sm:text-[15px]">
            {name}
          </h3>
        </Link>

        {availability ? (
          <p
            className={`mt-2 text-xs font-semibold ${
              availability === "out-of-stock" ? "text-slate-500" : "text-emerald-700"
            }`}
          >
            {availabilityCopy[availability]}
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          {price != null ? (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-lg font-black text-[#e91d46] sm:text-xl">
                {formatStorePrice(price)}
              </span>
              {previousPrice != null && previousPrice > price ? (
                <span className="text-xs text-slate-400 line-through">
                  {formatStorePrice(previousPrice)}
                </span>
              ) : null}
            </div>
          ) : (
            <p className="text-base font-extrabold text-[#073c55]">Consultar precio</p>
          )}

          <div className="mt-4">
            {cannotPurchase ? (
              <button
                type="button"
                disabled
                className="flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded bg-slate-200 px-3 text-xs font-extrabold uppercase tracking-wide text-slate-500"
              >
                Agotado
              </button>
            ) : action.type === "link" ? (
              <Link
                href={action.href}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded bg-[#073c55] px-3 text-center text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-[#0a4d6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073c55] focus-visible:ring-offset-2"
              >
                {action.label}
                <FiArrowRight aria-hidden />
              </Link>
            ) : action.type === "button" && !requiresConsultation ? (
              <button
                type="button"
                onClick={action.onClick}
                disabled={action.loading}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded bg-[#073c55] px-3 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-[#0a4d6c] disabled:cursor-wait disabled:opacity-60"
              >
                <FiShoppingCart aria-hidden />
                {action.loading ? "Agregando..." : action.label}
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded border border-slate-300 bg-white px-3 text-xs font-extrabold uppercase tracking-wide text-slate-500"
              >
                {action.type === "disabled" ? action.label : "Consulta pendiente"}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export type { ProductAvailability, ProductCardAction, ProductCardProps };
