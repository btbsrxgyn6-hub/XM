"use client";

import { Badge } from "@/components/atoms/badge";
import { PriceTag } from "@/components/atoms/price-tag";
import type { Product } from "@/lib/types";
import { useTranslations } from "next-intl";

function formatCurrency(value: number) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function PricingRow({
  pricing,
  discountPercent
}: {
  pricing?: Product["pricing"];
  discountPercent?: number;
}) {
  const t = useTranslations("products");
  if (!pricing) return null;

  let label = t("pricing.contact");
  if (pricing.model === "free") {
    label = t("pricing.free");
  } else if (typeof pricing.price === "number") {
    if (pricing.model === "subscription") {
      const intervalLabel = pricing.interval === "year" ? t("pricing.perYear") : t("pricing.perMonth");
      label = `${formatCurrency(pricing.price)}${intervalLabel}`;
    } else {
      label = `${formatCurrency(pricing.price)} ${t("pricing.oneTime")}`;
    }
  }

  const price = typeof pricing.price === "number" ? pricing.price : null;
  const showDiscount =
    price !== null &&
    typeof discountPercent === "number" &&
    discountPercent > 0;
  const originalPrice = showDiscount
    ? price / (1 - discountPercent / 100)
    : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <PriceTag label={label} />
      {showDiscount && originalPrice ? (
        <span className="text-xs text-primary/40 line-through">
          {formatCurrency(Math.round(originalPrice))}
        </span>
      ) : null}
      {showDiscount ? (
        <Badge variant="info">-{Math.round(discountPercent)}%</Badge>
      ) : null}
    </div>
  );
}
