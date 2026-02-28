"use client";

import { ProductCard } from "@/components/organisms/product-card";
import { SkeletonCard } from "@/components/molecules/skeleton-card";
import type { Product } from "@/lib/types";

export function ProductsGrid({
  products,
  isLoading,
  skeletonCount = 6,
  variant = "default"
}: {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  variant?: "default" | "featured";
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
