"use client";

import Link from "next/link";
import { formatStorePrice } from "@/config/storefront";
import { useCartDetails } from "@/hooks/cart";
import { useSession } from "@/lib/auth/client";
import { SVGLoadingIcon } from "@/components/ui/loader";
import { ButtonCheckout } from "./ButtonCheckout";
import { CartProduct } from "./CartProduct";
import { GridProducts } from "../products/GridProducts";

export const CartProducts = () => {
  const { data: session, isPending: isSessionPending } = useSession();
  const { items, isPending, isError, refetch } = useCartDetails();

  if (isSessionPending || (session?.user && isPending)) {
    return <div className="flex min-h-[50vh] items-center justify-center" aria-label="Cargando carrito"><SVGLoadingIcon height={30} width={30} /></div>;
  }

  if (!session?.user) {
    return <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center"><h1 className="text-2xl font-black text-[#073c55] sm:text-3xl">Iniciá sesión para usar tu carrito</h1><p className="mt-3 text-sm leading-6 text-slate-500">El carrito actual está asociado a una cuenta para mantener tus productos y cantidades.</p><Link href="/login" className="mt-6 flex min-h-12 min-w-40 items-center justify-center rounded-md bg-[#073c55] px-6 text-sm font-bold text-white">Iniciar sesión</Link></div>;
  }

  if (isError) {
    return <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center"><h1 className="text-2xl font-black text-[#073c55]">No pudimos cargar tu carrito</h1><p className="mt-3 text-sm text-slate-500">Intentá nuevamente. Tus productos no fueron modificados.</p><button type="button" onClick={() => void refetch()} className="mt-6 min-h-12 rounded-md bg-[#073c55] px-6 text-sm font-bold text-white">Reintentar</button></div>;
  }

  if (items.length > 0) {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return <div className="pb-36 pt-6 sm:pt-10"><div className="mb-6 border-b border-slate-200 pb-4"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e91d46]">Tu compra</p><h1 className="mt-1 text-2xl font-black text-[#073c55] sm:text-3xl">Carrito</h1></div><GridProducts className="grid-cols-1 min-[390px]:grid-cols-1 md:grid-cols-1 xl:grid-cols-1">{items.map(({ id, product, size, quantity, variant }) => <CartProduct key={id} product={product} cartItemId={id} size={size} quantity={quantity} variant={variant} />)}</GridProducts><div className="fixed bottom-3 left-1/2 z-30 w-[calc(100%-24px)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:bottom-5 sm:flex"><div className="flex items-center justify-between gap-4 px-4 py-3 sm:w-1/2 sm:flex-col sm:items-start sm:justify-center sm:gap-0 sm:px-5"><span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Subtotal</span><span className="text-lg font-black text-[#073c55]">{formatStorePrice(subtotal)}</span></div><div className="border-t border-slate-200 sm:w-1/2 sm:border-l sm:border-t-0"><ButtonCheckout cartItemIds={items.map((item) => item.id)} /></div></div></div>;
  }

  return <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center"><h1 className="text-2xl font-black text-[#073c55] sm:text-3xl">Tu carrito está vacío</h1><p className="mt-3 text-sm leading-6 text-slate-500">Cuando elijas un producto desde su ficha, aparecerá acá para que puedas revisar cantidades y subtotal.</p><Link className="mt-6 flex min-h-12 min-w-44 items-center justify-center rounded-md bg-[#073c55] px-6 text-sm font-bold text-white" href="/catalogo">Ver catálogo</Link></div>;
};
