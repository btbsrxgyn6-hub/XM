"use client";

import { useMemo } from "react";

import { Button } from "@/components/atoms/button";
import { Container } from "@/components/atoms/container";
import { EmptyState } from "@/components/molecules/empty-state";
import { SectionHeader } from "@/components/molecules/section-header";
import { ProductsList } from "@/components/organisms/products-list";
import { useAllProducts } from "@/lib/hooks/use-all-products";
import type { Product } from "@/lib/types";
import { useTranslations } from "next-intl";

function pickCurated(products: Product[]) {
  const featured = products.filter(
    (product) => product.isFeatured || typeof product.featuredRank === "number"
  );
  if (featured.length > 0) {
    return featured
      .sort((a, b) => {
        const rankA = a.featuredRank ?? 999;
        const rankB = b.featuredRank ?? 999;
        if (rankA !== rankB) return rankA - rankB;
        return (b.views ?? 0) - (a.views ?? 0);
      })
      .slice(0, 6);
  }
  return [...products]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 6);
}

export function CuratedProductsSection() {
  const { products, isLoading } = useAllProducts();
  const curatedProducts = useMemo(() => pickCurated(products), [products]);
  const t = useTranslations("products");

  return (
    <section className="py-12">
      <Container>
        <SectionHeader
          title={t("curatedTitle")}
          subtitle={t("curatedSubtitle")}
          action={
            <Button href="/products" variant="secondary" size="sm">
              {t("viewAll")}
            </Button>
          }
        />
        <div className="mt-6">
          {!isLoading && curatedProducts.length === 0 ? (
            <EmptyState
              title={t("curatedEmpty.title")}
              description={t("curatedEmpty.description")}
              action={{ label: t("curatedEmpty.action"), href: "/products" }}
            />
          ) : (
            <ProductsList
              products={curatedProducts}
              isLoading={isLoading}
              variant="compact"
              skeletonCount={3}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
