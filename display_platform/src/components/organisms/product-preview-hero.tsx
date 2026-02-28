"use client";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { CoverImage } from "@/components/atoms/cover-image";
import { ProductIcon } from "@/components/molecules/product-icon";
import { tagKey } from "@/lib/tags";
import type { ProductFields } from "@/lib/types";
import { useTranslations } from "next-intl";

export function ProductPreviewHero({
  fields,
  label,
  iconKey,
  coverImage
}: {
  fields: ProductFields;
  label?: string;
  iconKey?: string;
  coverImage?: string;
}) {
  const t = useTranslations("products");
  const resolvedLabel = label ?? t("previewLabel");

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ProductIcon product={{ fields, iconKey }} size="lg" />
            <div>
              <p className="text-sm text-primary/60">{resolvedLabel}</p>
              <h3 className="text-2xl font-semibold text-primary">
                {fields.productName || t("untitled")}
              </h3>
              <p className="text-sm text-primary/60">
                {fields.organizationName || t("organizationFallback")}
              </p>
            </div>
          </div>
          <p className="text-sm text-primary/70">
            {fields.productDetails
              ? fields.productDetails.slice(0, 220) + (fields.productDetails.length > 220 ? "…" : "")
              : t("previewDescriptionFallback")}
          </p>
          <div className="flex flex-wrap gap-2">
            {fields.classificationTags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="info">
                {t(`tags.${tagKey(tag)}`)}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="#" variant="secondary">
              {t("actions.follow")}
            </Button>
            <Button href={fields.officialWebsiteUrl || "#"} variant="ghost">
              {t("actions.visitSite")}
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-primary/3 p-4">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-surface/70">
            <CoverImage
              src={coverImage}
              alt={fields.productName || t("untitled")}
              fallbackText={fields.productName || t("untitled")}
            />
          </div>
          {!coverImage ? (
            <p className="mt-3 text-xs text-primary/60">{t("coverPlaceholder")}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
