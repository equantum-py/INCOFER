"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import type { CartItem } from "@/lib/db/drizzle/schema";
import LoadingButton from "@/components/ui/loadingButton";

interface ButtonCheckoutProps {
  cartItemIds: CartItem["id"][];
}

export const ButtonCheckout = ({ cartItemIds }: ButtonCheckoutProps) => {
  const checkoutStatus = useQuery({
    queryKey: ["checkout-status"],
    queryFn: async () => {
      const response = await fetch("/api/stripe/payment", { method: "GET" });
      if (!response.ok) throw new Error("No pudimos verificar el medio de pago");
      return (await response.json()) as { enabled: boolean };
    },
    staleTime: 60_000,
  });

  const { mutate: buyProducts, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/stripe/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemIds }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "No pudimos iniciar el pago");
      }

      const data = (await response.json()) as { url?: string };
      if (!data.url) throw new Error("El enlace de pago no está disponible");
      window.location.assign(data.url);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "No pudimos iniciar el pago");
    },
  });

  const enabled = checkoutStatus.data?.enabled === true;
  const checking = checkoutStatus.isPending;

  return (
    <LoadingButton
      onClick={() => buyProducts()}
      className="min-h-14 w-full rounded-none bg-[#073c55] p-3 text-sm font-bold text-white transition hover:bg-[#0a4d6c] disabled:bg-slate-200 disabled:text-slate-500"
      loading={isPending}
      disabled={cartItemIds.length === 0 || checking || !enabled}
    >
      {checking
        ? "Verificando pago..."
        : enabled
          ? "Continuar al pago"
          : "Pago online no configurado"}
    </LoadingButton>
  );
};
