"use client";

import { Label } from "@/components/atoms/label";
import { Select } from "@/components/atoms/select";
import { Toggle } from "@/components/atoms/toggle";
import { cn } from "@/lib/cn";
import { regionKey } from "@/lib/product-options";
import { tagKey } from "@/lib/tags";
import type { ClassificationTag, ProductStatus, Region } from "@/lib/types";
import { useTranslations } from "next-intl";

export function FilterBar({
  status,
  region,
  tags,
  tagOptions,
  showDemoListings,
  onStatusChange,
  onRegionChange,
  onTagsChange,
  onShowDemoChange
}: {
  status: "all" | ProductStatus;
  region: "all" | Region;
  tags: ClassificationTag[];
  tagOptions: readonly ClassificationTag[];
  showDemoListings: boolean;
  onStatusChange: (value: "all" | ProductStatus) => void;
  onRegionChange: (value: "all" | Region) => void;
  onTagsChange: (value: ClassificationTag[]) => void;
  onShowDemoChange: (value: boolean) => void;
}) {
  const t = useTranslations("products");
  const statusT = useTranslations("status");

  function toggleTag(tag: ClassificationTag) {
    if (tags.includes(tag)) {
      onTagsChange(tags.filter((item) => item !== tag));
      return;
    }
    onTagsChange([...tags, tag]);
  }

  const regionOptions: Array<{ label: string; value: "all" | Region }> = [
    { label: t("regions.all"), value: "all" },
    { label: t(`regions.${regionKey("Global")}`), value: "Global" },
    { label: t(`regions.${regionKey("NA")}`), value: "NA" },
    { label: t(`regions.${regionKey("EU")}`), value: "EU" },
    { label: t(`regions.${regionKey("APAC")}`), value: "APAC" },
    { label: t(`regions.${regionKey("Other")}`), value: "Other" }
  ];

  return (
    <div className="space-y-4 rounded-3xl border border-primary/10 bg-surface p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_0.8fr_1.4fr]">
        <div className="space-y-1">
          <Label className="text-xs uppercase tracking-[0.2em] text-primary/50">
            {t("filters.status")}
          </Label>
          <Select
            value={status}
            onChange={(event) => onStatusChange(event.target.value as "all" | ProductStatus)}
          >
            <option value="all">{t("filters.statusAll")}</option>
            <option value="published">{statusT("published")}</option>
            <option value="submitted">{statusT("submitted")}</option>
            <option value="draft">{statusT("draft")}</option>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs uppercase tracking-[0.2em] text-primary/50">
            {t("filters.region")}
          </Label>
          <Select
            value={region}
            onChange={(event) => onRegionChange(event.target.value as "all" | Region)}
          >
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.2em] text-primary/50">
            {t("filters.tags")}
          </Label>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => {
              const active = tags.includes(tag);
              const tagLabel = t(`tags.${tagKey(tag)}`);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    active
                      ? "bg-brand/12 text-brand ring-brand/25"
                      : "bg-surface text-dark ring-muted/60 hover:bg-primary/3"
                  )}
                  aria-pressed={active}
                >
                  {tagLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/10 pt-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
            {t("filters.demo")}
          </p>
          <p className="text-xs text-primary/60">{t("filters.demoHint")}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-primary/70">
            {t("filters.showDemo")}
          </span>
          <Toggle
            checked={showDemoListings}
            onChange={onShowDemoChange}
            label={t("filters.showDemo")}
          />
        </div>
      </div>
    </div>
  );
}
