"use client";

import { SectionHeader } from "@/components/molecules/section-header";
import { ProductsGrid } from "@/components/organisms/products-grid";
import type { Product } from "@/lib/types";
import { useTranslations } from "next-intl";

export function FeaturedProductsRow({
  products,
  isLoading
}: {
  products: Product[];
  isLoading?: boolean;
}) {
  const t = useTranslations("products");
  if (!isLoading && products.length === 0) return null;

  return (
    <section className="space-y-4">
      <SectionHeader
        title={t("featuredTitle")}
        subtitle={t("featuredSubtitle")}
      />
      <ProductsGrid
        products={products}
        isLoading={isLoading}
        variant="featured"
        skeletonCount={4}
      />
    </section>
  );
}
