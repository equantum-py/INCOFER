"use client";

import { useThrottleFn } from "ahooks";
import { IoAdd, IoRemove } from "react-icons/io5";

import { useCartMutation } from "@/hooks/cart";
import type { CartItem, ProductVariant } from "@/lib/db/drizzle/schema";

interface ProductCartInfoProps {
  cartItemId: CartItem["id"];
  size: CartItem["size"];
  quantity: CartItem["quantity"];
  color: ProductVariant["color"];
}

export const ProductCartInfo = ({
  cartItemId,
  size,
  quantity,
  color,
}: ProductCartInfoProps) => {
  const {
    update: editQuantity,
    remove: removeFromCart,
    isUpdating,
    isRemoving,
  } = useCartMutation();
  const disabled = isUpdating || isRemoving;

  const { run: throttledIncrease } = useThrottleFn(
    () => editQuantity({ itemId: cartItemId, quantity: quantity + 1 }),
    { wait: 300 },
  );

  const { run: throttledDecrease } = useThrottleFn(
    () => {
      if (quantity > 1) {
        editQuantity({ itemId: cartItemId, quantity: quantity - 1 });
      } else {
        removeFromCart({ itemId: cartItemId });
      }
    },
    { wait: 300 },
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="rounded bg-slate-100 px-2 py-1">Talle: {size}</span>
        <span className="rounded bg-slate-100 px-2 py-1">Variante: {color}</span>
      </div>

      <div className="flex w-min items-center overflow-hidden rounded-md border border-slate-300 bg-white">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-[#073c55] transition hover:bg-slate-50 disabled:opacity-50"
          onClick={throttledDecrease}
          disabled={disabled}
          aria-label={quantity > 1 ? "Disminuir cantidad" : "Quitar producto"}
        >
          <IoRemove className="h-4 w-4" aria-hidden />
        </button>
        <span className="flex h-11 min-w-11 items-center justify-center border-x border-slate-300 px-3 text-sm font-bold text-slate-700" aria-label={`Cantidad actual: ${quantity}`}>
          {quantity}
        </span>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-[#073c55] transition hover:bg-slate-50 disabled:opacity-50"
          onClick={throttledIncrease}
          disabled={disabled}
          aria-label="Aumentar cantidad"
        >
          <IoAdd className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
};
