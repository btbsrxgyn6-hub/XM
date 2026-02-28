"use client";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { CoverImage } from "@/components/atoms/cover-image";
import { ProductMetaRow } from "@/components/molecules/product-meta-row";
import { ProductInteractionsBar } from "@/components/organisms/product-interactions-bar";
import { cn } from "@/lib/cn";
import { tagKey } from "@/lib/tags";
import type { Product } from "@/lib/types";

export function ProductMarketplaceCard({
  product,
  variant = "default"
}: {
  product: Product;
  variant?: "default" | "compact";
}) {
  const t = useTranslations("products");
  const productName = product.fields.productName || t("untitled");
  const organizationName = product.fields.organizationName || t("organizationFallback");
  const description =
    product.shortDescription || product.fields.introSlogan || t("defaultSlogan");
  const tags = product.fields.classificationTags.slice(0, variant === "compact" ? 2 : 3);
  const interactionInitial = {
    followCount: product.followCount,
    bookmarkCount: product.bookmarkCount,
    commentCount: product.commentCount,
    isFollowedByMe: product.isFollowedByMe,
    isBookmarkedByMe: product.isBookmarkedByMe
  };

  return (
    <Card
      className={cn(
        "group relative h-full transition hover:-translate-y-[1px] hover:border-primary/20 hover:shadow-soft",
        variant === "compact" ? "p-4" : "p-5"
      )}
    >
      <div
        className={cn(
          "flex h-full gap-4",
          variant === "compact" ? "flex-col" : "flex-col sm:flex-row sm:items-stretch"
        )}
      >
        <div className={cn("w-full", variant === "compact" ? "" : "sm:w-56")}>
          <div className="aspect-video w-full">
            <CoverImage src={product.coverImage} alt={productName} fallbackText={productName} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-[1fr_auto] items-start gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-primary">{productName}</h3>
              <ProductMetaRow
                organizationName={organizationName}
                updatedAt={product.updatedAt}
                showUpdated={false}
                className={variant === "compact" ? "min-h-[2.5rem]" : ""}
              />
            </div>
            {product.isFeatured || typeof product.featuredRank === "number" ? (
              <Badge variant="success" className="justify-self-end">
                {t("featured")}
              </Badge>
            ) : null}
          </div>

          <p className="min-h-[2.5rem] text-sm text-primary/70 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
            {description}
          </p>

          <div
            className={cn(
              "flex flex-nowrap gap-2 overflow-x-auto overflow-y-visible py-1",
              "scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.12)_transparent] [&::-webkit-scrollbar]:h-[2px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400/10 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/18",
              variant === "compact" ? "min-h-[3.25rem]" : ""
            )}
          >
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="info"
                className={cn(
                  "h-9 shrink-0 min-w-0 px-3 py-0 text-center leading-none ring-inset",
                  variant === "compact" ? "max-w-[12.5rem]" : "max-w-[15rem]"
                )}
              >
                <span className="block truncate">{t(`tags.${tagKey(tag)}`)}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "flex w-full flex-wrap items-center justify-between gap-3 sm:h-full sm:w-48",
            variant === "compact"
              ? "mt-auto sm:w-full sm:flex-row"
              : "sm:flex-col sm:items-end sm:justify-between"
          )}
        >
          <ProductInteractionsBar
            productId={product.id}
            initial={interactionInitial}
            autoFetch={false}
            variant="compact"
            className={cn(variant === "compact" ? "" : "sm:self-stretch")}
          />
          <div
            className={cn(
              "flex flex-wrap items-center gap-2",
              variant === "compact" ? "sm:flex-row" : "sm:flex-col sm:items-end sm:self-stretch"
            )}
          >
            <Button
              href={`/products/${product.id}`}
              size="sm"
              className={cn("min-w-[5.5rem]", variant === "compact" ? "" : "sm:w-full")}
            >
              {t("view")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
