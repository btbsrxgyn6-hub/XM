"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { EmptyState } from "@/components/molecules/empty-state";
import { ProductPreviewCard } from "@/components/organisms/product-preview-card";
import { ProductPreviewHero } from "@/components/organisms/product-preview-hero";
import { useProducts } from "@/lib/hooks/use-products";

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const { products, isLoading } = useProducts();
  const t = useTranslations("console");

  const product = useMemo(() => products.find((item) => item.id === id), [products, id]);

  if (isLoading) {
    return <div className="text-sm text-primary/60">{t("loadingProduct")}</div>;
  }

  if (!product) {
    return (
      <EmptyState
        title={t("notFound.title")}
        description={t("notFound.description")}
        action={{ label: t("notFound.action"), href: "/console/products" }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
            {t("preview.label")}
          </p>
          <p className="text-lg font-semibold text-primary">
            {product.fields.productName || t("untitledProduct")}
          </p>
        </div>
        <Button href={`/console/products/${product.id}/edit`} size="sm">
          {t("editProduct")}
        </Button>
      </div>

      <ProductPreviewHero
        fields={product.fields}
        iconKey={product.iconKey}
        coverImage={product.coverImage}
      />

      <Card className="p-6">
        <p className="text-sm font-semibold text-primary">{t("preview.brochure")}</p>
        <div className="mt-4 max-w-md">
          <ProductPreviewCard fields={product.fields} iconKey={product.iconKey} />
        </div>
      </Card>
    </div>
  );
}
