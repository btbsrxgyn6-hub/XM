"use client";

import { useEffect, useMemo, useState } from "react";

import { IconCircle } from "@/components/atoms/icon-circle";
import { cn } from "@/lib/cn";
import { getIconForProduct, ICON_MAP } from "@/lib/productIcons";
import { previewKey } from "@/lib/storageKeys";
import type { Product } from "@/lib/types";

type ProductIconSource = Pick<Product, "fields" | "iconKey">;

const iconSizeMap: Record<"sm" | "md" | "lg", number> = {
  sm: 18,
  md: 20,
  lg: 24
};

export function ProductIcon({
  product,
  size = "md",
  showInitialFallback = true,
  className
}: {
  product: ProductIconSource;
  size?: "sm" | "md" | "lg";
  showInitialFallback?: boolean;
  className?: string;
}) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const logoId = product.fields.productLogo?.id;
    if (!logoId) {
      setLogoUrl(null);
      return;
    }
    const stored = window.sessionStorage.getItem(previewKey(logoId));
    setLogoUrl(stored);
  }, [product.fields.productLogo?.id]);

  const initials = useMemo(() => {
    const name = product.fields.productName || "";
    const parts = name.trim().split(" ");
    if (parts.length === 0 || !parts[0]) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }, [product.fields.productName]);

  if (logoUrl) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-2xl bg-primary/5 shadow-sm ring-1 ring-primary/10",
          size === "sm" ? "h-10 w-10" : size === "lg" ? "h-16 w-16" : "h-12 w-12",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={product.fields.productName || "Product logo"}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const iconKey = getIconForProduct(product);
  const Icon = ICON_MAP[iconKey];

  if ((iconKey === "default" || !Icon) && showInitialFallback) {
    return (
      <IconCircle size={size} className={className}>
        <span className="text-sm font-semibold text-primary">{initials || "AI"}</span>
      </IconCircle>
    );
  }

  return (
    <IconCircle size={size} className={className}>
      <Icon className="text-primary" size={iconSizeMap[size]} aria-hidden="true" />
    </IconCircle>
  );
}
