"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { ProductWizard } from "@/components/organisms/product-wizard/product-wizard";
import { EmptyState } from "@/components/molecules/empty-state";
import { useProducts } from "@/lib/hooks/use-products";

export default function EditProductPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const { products, isLoading } = useProducts();
  const t = useTranslations("console");

  const product = useMemo(() => products.find((item) => item.id === id), [products, id]);

  if (isLoading) {
    return (
      <div className="text-sm text-primary/60">{t("loadingProduct")}</div>
    );
  }

  if (!product) {
    return (
      <EmptyState
        title={t("notFound.title")}
        description={t("notFound.editDescription")}
        action={{ label: t("notFound.action"), href: "/console/products" }}
      />
    );
  }

  return <ProductWizard mode="edit" productId={product.id} initialProduct={product} />;
}
