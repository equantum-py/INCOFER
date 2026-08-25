import Link from "next/link";

import { formatStorePrice } from "@/config/storefront";
import type {
  CartItem,
  Product,
  ProductVariant,
} from "@/lib/db/drizzle/schema";

import { ProductImage } from "../products/ProductImage";
import { DeleteButton } from "./DeleteButton";
import { ProductCartInfo } from "./ProductCartInfo";

interface CartProductProps {
  product: Product;
  cartItemId: CartItem["id"];
  size: CartItem["size"];
  quantity: CartItem["quantity"];
  variant: ProductVariant;
}

export const CartProduct = ({
  product,
  cartItemId,
  size,
  quantity,
  variant,
}: CartProductProps) => {
  const { name, price, category, id } = product;
  const productLink = `/${category}/${id}?variant=${encodeURIComponent(variant.color)}`;
  const image = variant.images[0] ?? product.img;

  return (
    <div className="grid overflow-hidden rounded-md border border-slate-200 bg-white sm:grid-cols-[180px_1fr]">
      <Link href={productLink} className="block bg-white">
        <ProductImage
          image={image}
          name={name}
          width={4}
          height={3}
          sizes="(max-width: 639px) 100vw, 180px"
        />
      </Link>
      <div className="flex min-w-0 flex-col justify-between gap-3 p-4">
        <div className="flex w-full items-start justify-between gap-3">
          <Link href={productLink} className="min-w-0 flex-1">
            <h2 className="line-clamp-2 text-sm font-extrabold text-[#073c55] sm:text-base">{name}</h2>
          </Link>
          <DeleteButton cartItemId={cartItemId} />
        </div>
        <div className="text-base font-black text-[#e91d46]">{formatStorePrice(price)}</div>
        <ProductCartInfo
          cartItemId={cartItemId}
          size={size}
          quantity={quantity}
          color={variant.color}
        />
      </div>
    </div>
  );
};
