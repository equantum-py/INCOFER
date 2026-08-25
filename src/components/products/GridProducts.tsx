import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const GridProducts = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
