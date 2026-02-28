"use client";

import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { ProductPreviewCard } from "@/components/organisms/product-preview-card";
import { ProductPreviewHero } from "@/components/organisms/product-preview-hero";
import type { ProductFields } from "@/lib/types";
import { useTranslations } from "next-intl";

export function StepPreview({
  fields,
  coverImage,
  onSaveDraft,
  onSubmit,
  onBack
}: {
  fields: ProductFields;
  coverImage?: string;
  onSaveDraft: () => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const t = useTranslations("wizard");

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary">{t("preview.detailTitle")}</p>
          <ProductPreviewHero fields={fields} coverImage={coverImage} />
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary">{t("preview.cardTitle")}</p>
          <ProductPreviewCard fields={fields} />
        </div>
      </div>

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">{t("preview.readyTitle")}</p>
          <p className="text-xs text-primary/60">
            {t("preview.readySubtitle")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onSaveDraft}>
            {t("preview.saveDraft")}
          </Button>
          <Button onClick={onSubmit}>{t("preview.submit")}</Button>
          <Button variant="ghost" onClick={onBack}>
            {t("preview.back")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
