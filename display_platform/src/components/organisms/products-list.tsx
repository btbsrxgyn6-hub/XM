"use client";

import { Card } from "@/components/atoms/card";
import { ProductMarketplaceCard } from "@/components/organisms/product-marketplace-card";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";

function ProductMarketplaceCardSkeleton({ variant }: { variant: "default" | "compact" }) {
  return (
    <Card
      className={cn(
        "animate-pulse",
        variant === "compact" ? "p-4" : "p-5"
      )}
    >
      <div
        className={cn(
          "flex gap-4",
          variant === "compact" ? "flex-col" : "flex-col sm:flex-row"
        )}
      >
        <div className={cn("w-full", variant === "compact" ? "" : "sm:w-56")}>
          <div className="aspect-video w-full rounded-xl bg-primary/10" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="space-y-2">
            <div className="h-4 w-40 rounded-full bg-primary/10" />
            <div className="h-3 w-32 rounded-full bg-primary/10" />
          </div>
          <div className="h-3 w-3/4 rounded-full bg-primary/10" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-primary/10" />
            <div className="h-6 w-20 rounded-full bg-primary/10" />
          </div>
          <div className="h-4 w-28 rounded-full bg-primary/10" />
        </div>
        <div
          className={cn(
            "flex w-full flex-wrap items-center gap-3 sm:w-44",
            variant === "compact"
              ? "sm:w-full sm:flex-row"
              : "sm:flex-col sm:items-end sm:justify-between"
          )}
        >
          <div className="flex gap-2">
            <div className="h-8 w-16 rounded-full bg-primary/10" />
            <div className="h-8 w-16 rounded-full bg-primary/10" />
          </div>
          <div className="flex gap-2 sm:flex-col sm:items-end">
            <div className="h-8 w-20 rounded-full bg-primary/10" />
            <div className="h-8 w-28 rounded-full bg-primary/10" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ProductsList({
  products,
  isLoading,
  skeletonCount = 6,
  variant = "default"
}: {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  variant?: "default" | "compact";
}) {
  const containerClass =
    variant === "compact"
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      : "space-y-4";

  if (isLoading) {
    return (
      <div className={containerClass}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductMarketplaceCardSkeleton
            key={`skeleton-${index}`}
            variant={variant}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {products.map((product) => (
        <ProductMarketplaceCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
