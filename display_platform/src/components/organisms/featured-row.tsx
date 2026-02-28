"use client";

import { SectionHeader } from "@/components/molecules/section-header";
import { ProductsList } from "@/components/organisms/products-list";
import type { Product } from "@/lib/types";
import { useTranslations } from "next-intl";

export function FeaturedRow({
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
      <SectionHeader title={t("featuredTitle")} subtitle={t("featuredSubtitle")} />
      <ProductsList
        products={products}
        isLoading={isLoading}
        variant="compact"
        skeletonCount={4}
      />
    </section>
  );
}
