"use client";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { ProductIcon } from "@/components/molecules/product-icon";
import { cn } from "@/lib/cn";
import { tagKey } from "@/lib/tags";
import type { Product } from "@/lib/types";
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

export function ProductCard({
  product,
  variant = "default"
}: {
  product: Product;
  variant?: "default" | "featured";
}) {
  const t = useTranslations("products");
  const statusT = useTranslations("status");
  const meta = { label: statusT(product.status), variant: statusVariants[product.status] };
  const tags = product.fields.classificationTags.slice(0, 3);
  const productName = product.fields.productName || t("untitled");
  const orgName = product.fields.organizationName || t("organizationFallback");

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col justify-between p-5",
        variant === "featured" ? "border-brand/25 bg-brand/8" : ""
      )}
    >
      {variant === "featured" ? (
        <span className="absolute right-4 top-4 rounded-full bg-brand-gradient px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-surface shadow-sm">
          {t("featured")}
        </span>
      ) : null}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <ProductIcon product={product} size="md" />
            <div>
              <p className="text-sm font-semibold text-primary">{productName}</p>
              <p className="text-xs text-primary/60">{orgName}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={meta.variant}>{meta.label}</Badge>
          <span className="text-xs text-primary/50">
            {t("updated", { date: formatDate(product.updatedAt) })}
          </span>
        </div>

        <p className="text-sm text-primary/70">
          {product.fields.introSlogan || t("defaultSlogan")}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="info">
              {t(`tags.${tagKey(tag)}`)}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <Button href={`/products/${product.id}`} size="sm" variant="secondary">
          {t("view")}
        </Button>
      </div>
    </Card>
  );
}
