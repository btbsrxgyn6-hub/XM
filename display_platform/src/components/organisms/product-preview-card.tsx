"use client";

import { Badge } from "@/components/atoms/badge";
import { Card } from "@/components/atoms/card";
import { ProductIcon } from "@/components/molecules/product-icon";
import { tagKey } from "@/lib/tags";
import type { ProductFields } from "@/lib/types";
import { useTranslations } from "next-intl";

export function ProductPreviewCard({
  fields,
  iconKey
}: {
  fields: ProductFields;
  iconKey?: string;
}) {
  const t = useTranslations("products");
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <ProductIcon product={{ fields, iconKey }} size="md" />
          <div>
            <p className="text-sm font-semibold text-primary">
              {fields.productName || t("untitled")}
            </p>
            <p className="text-xs text-primary/60">
              {fields.organizationName || t("organizationFallback")}
            </p>
          </div>
        </div>
        <p className="text-sm text-primary/70">
          {fields.introSlogan || t("previewSloganFallback")}
        </p>
        <div className="flex flex-wrap gap-2">
          {fields.classificationTags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="info">
              {t(`tags.${tagKey(tag)}`)}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
