import { Skeleton } from "@/components/ui/skeleton";

interface ProductsSkeletonProps {
  extraClassname?: string;
  items: number;
}

export const ProductsSkeleton = ({
  extraClassname,
  items,
}: ProductsSkeletonProps) => {
  const productSkeletons = Array.from({ length: items }, (_, index) => (
    <div
      key={index}
      className={`overflow-hidden rounded-md border border-slate-200 bg-white ${
        extraClassname === "cart-ord-mobile" ? "flex sm:block" : ""
      }`}
    >
      <Skeleton
        className={
          extraClassname === "cart-ord-mobile"
            ? "aspect-square w-32 shrink-0 sm:w-full"
            : "aspect-[4/3] w-full"
        }
      />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-6 w-2/5" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  ));

  if (extraClassname === "cart-ord-mobile") {
    return <div className="grid grid-cols-1 gap-4">{productSkeletons}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {productSkeletons}
    </div>
  );
};

export default ProductsSkeleton;
