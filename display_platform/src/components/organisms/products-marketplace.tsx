"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/atoms/button";
import { SegmentedControl } from "@/components/atoms/segmented-control";
import { EmptyState } from "@/components/molecules/empty-state";
import { SectionHeader } from "@/components/molecules/section-header";
import type { SortOption } from "@/components/molecules/sort-select";
import { FeaturedRow } from "@/components/organisms/featured-row";
import { ProductsList } from "@/components/organisms/products-list";
import { ProductsToolbar } from "@/components/organisms/products-toolbar";
import { TrendingStrip } from "@/components/organisms/trending-strip";
import { useAllProducts } from "@/lib/hooks/use-all-products";
import { withLocale, type AppLocale } from "@/lib/locale";
import {
  CLASSIFICATION_TAG_OPTIONS,
  type ClassificationTag,
  type Product,
  type ProductStatus,
  type Region
} from "@/lib/types";

type TabOption = "all" | "newest" | "popular";

const PAGE_SIZE = 12;

function sortProducts(products: Product[], sort: SortOption, fallbackName: string) {
  const sorted = [...products];
  if (sort === "newest") {
    sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } else if (sort === "popular") {
    sorted.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  } else {
    sorted.sort((a, b) =>
      (a.fields.productName || fallbackName).localeCompare(
        b.fields.productName || fallbackName
      )
    );
  }
  return sorted;
}

function filterProducts({
  products,
  query,
  status,
  region,
  tags,
  showDemoListings
}: {
  products: Product[];
  query: string;
  status: "all" | ProductStatus;
  region: "all" | Region;
  tags: ClassificationTag[];
  showDemoListings: boolean;
}) {
  const normalized = query.trim().toLowerCase();
  return products.filter((product) => {
    if (!showDemoListings && product.isSeededDemo) return false;
    if (status !== "all" && product.status !== status) return false;
    if (region !== "all" && product.fields.region !== region) return false;
    if (tags.length > 0) {
      const matchesTag = tags.some((tag) =>
        product.fields.classificationTags.includes(tag)
      );
      if (!matchesTag) return false;
    }
    if (!normalized) return true;
    const name = product.fields.productName.toLowerCase();
    const org = product.fields.organizationName.toLowerCase();
    return name.includes(normalized) || org.includes(normalized);
  });
}

function getFeaturedProducts(products: Product[]) {
  const featured = products.filter(
    (product) => product.isFeatured || typeof product.featuredRank === "number"
  );
  return featured
    .sort((a, b) => {
      const rankA = a.featuredRank ?? 999;
      const rankB = b.featuredRank ?? 999;
      if (rankA !== rankB) return rankA - rankB;
      return (b.views ?? 0) - (a.views ?? 0);
    })
    .slice(0, 6);
}

export function ProductsMarketplaceClient() {
  const t = useTranslations("products");
  const locale = useLocale() as AppLocale;
  const { products, isLoading } = useAllProducts();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ProductStatus>("all");
  const [region, setRegion] = useState<"all" | Region>("all");
  const [tags, setTags] = useState<ClassificationTag[]>([]);
  const [sort, setSort] = useState<SortOption>("newest");
  const [tab, setTab] = useState<TabOption>("all");
  const [showDemoListings, setShowDemoListings] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const tabOptions = [
    { label: t("tabs.all"), value: "all" },
    { label: t("tabs.newest"), value: "newest" },
    { label: t("tabs.popular"), value: "popular" }
  ] satisfies Array<{ label: string; value: TabOption }>;

  const filteredProducts = useMemo(
    () => filterProducts({ products, query, status, region, tags, showDemoListings }),
    [products, query, status, region, tags, showDemoListings]
  );

  const nextPath = withLocale("/console/products/new", locale);
  const signInHref = `${withLocale("/auth/sign-in", locale)}?next=${encodeURIComponent(nextPath)}`;

  const featuredProducts = useMemo(
    () => getFeaturedProducts(filteredProducts),
    [filteredProducts]
  );

  const trendingProducts = useMemo(() => {
    return [...filteredProducts]
      .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
      .slice(0, 3);
  }, [filteredProducts]);

  const activeSort: SortOption = tab === "all" ? sort : tab;
  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, activeSort, t("untitled")),
    [filteredProducts, activeSort, t]
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, status, region, tags, sort, tab, showDemoListings]);

  const paginatedProducts = useMemo(
    () => sortedProducts.slice(0, visibleCount),
    [sortedProducts, visibleCount]
  );
  const canLoadMore = visibleCount < sortedProducts.length;

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-primary/10 bg-surface/70 p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
              {t("marketplaceEyebrow")}
            </p>
            <h1 className="font-display text-3xl text-primary sm:text-4xl">
              {t("marketplaceTitle")}
            </h1>
            <p className="max-w-xl text-sm text-primary/70">
              {t("marketplaceSubtitle")}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <ProductsToolbar
            query={query}
            status={status}
            region={region}
            tags={tags}
            tagOptions={CLASSIFICATION_TAG_OPTIONS}
            sort={sort}
            sortDisabled={tab !== "all"}
            showDemoListings={showDemoListings}
            onQueryChange={setQuery}
            onStatusChange={setStatus}
            onRegionChange={setRegion}
            onTagsChange={setTags}
            onSortChange={setSort}
            onShowDemoChange={setShowDemoListings}
          />
        </div>
      </section>

      {!isLoading && products.length === 0 ? (
        <EmptyState
          title={t("empty.title")}
          description={t("empty.description")}
          action={{
            label: t("empty.action"),
            href: signInHref
          }}
        />
      ) : (
        <>
          <FeaturedRow products={featuredProducts} isLoading={isLoading} />
          <TrendingStrip products={trendingProducts} isLoading={isLoading} />
          <section className="space-y-4">
            <SectionHeader
              title={t("browseTitle")}
              subtitle={t("browseSubtitle", { count: filteredProducts.length })}
              action={
                <SegmentedControl
                  options={tabOptions}
                  value={tab}
                  onChange={setTab}
                />
              }
            />
            <ProductsList products={paginatedProducts} isLoading={isLoading} />
            {!isLoading && canLoadMore ? (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  onClick={() =>
                    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedProducts.length))
                  }
                >
                  {t("loadMore")}
                </Button>
              </div>
            ) : null}
          </section>
        </>
      )}
    </div>
  );
}
