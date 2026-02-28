"use client";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { EmptyState } from "@/components/molecules/empty-state";
import { Modal } from "@/components/molecules/modal";
import { ProductIcon } from "@/components/molecules/product-icon";
import { useProducts } from "@/lib/hooks/use-products";
import type { Product } from "@/lib/types";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const statusVariants: Record<Product["status"], "default" | "success" | "warning"> = {
  draft: "default",
  submitted: "warning",
  published: "success"
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function ProductsTable() {
  const { products, remove, duplicate, isLoading } = useProducts();
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const t = useTranslations("console");
  const statusT = useTranslations("status");

  const rows = useMemo(() => products, [products]);

  if (isLoading) {
    return (
      <Card className="p-6 text-sm text-primary/60">{t("loadingProducts")}</Card>
    );
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        title={t("emptyProducts.title")}
        description={t("emptyProducts.description")}
        action={{ label: t("emptyProducts.action"), href: "/console/products/new" }}
      />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr_1fr] gap-4 border-b border-primary/10 bg-surface/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
        <span>{t("table.product")}</span>
        <span>{t("table.status")}</span>
        <span>{t("table.updated")}</span>
        <span>{t("table.actions")}</span>
      </div>
      <div className="divide-y divide-primary/10">
        {rows.map((product) => {
          const meta = {
            label: statusT(product.status),
            variant: statusVariants[product.status]
          };
          return (
            <div
              key={product.id}
              className="grid grid-cols-[1.6fr_0.7fr_0.7fr_1fr] items-center gap-4 px-6 py-4"
            >
              <div>
                <div className="flex items-center gap-3">
                  <ProductIcon product={product} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {product.fields.productName || t("untitledProduct")}
                    </p>
                    <p className="text-xs text-primary/60">
                      {product.fields.organizationName || t("organizationPending")}
                    </p>
                  </div>
                </div>
              </div>
              <Badge variant={meta.variant}>{meta.label}</Badge>
              <p className="text-sm text-primary/70">{formatDate(product.updatedAt)}</p>
              <div className="flex flex-wrap gap-2">
                <Button href={`/console/products/${product.id}`} size="sm" variant="secondary">
                  {t("actions.view")}
                </Button>
                <Button href={`/console/products/${product.id}/edit`} size="sm">
                  {t("actions.edit")}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => duplicate(product)}
                >
                  {t("actions.duplicate")}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setPendingDelete(product)}
                >
                  {t("actions.delete")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={!!pendingDelete}
        title={t("delete.title")}
        description={t("delete.description")}
        confirmLabel={t("delete.confirm")}
        tone="danger"
        onConfirm={() => {
          if (pendingDelete) remove(pendingDelete.id);
        }}
        onClose={() => setPendingDelete(null)}
      />
    </Card>
  );
}
