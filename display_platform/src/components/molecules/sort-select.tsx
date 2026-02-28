"use client";

import { Label } from "@/components/atoms/label";
import { Select } from "@/components/atoms/select";
import { useTranslations } from "next-intl";

export type SortOption = "newest" | "popular" | "name";

export function SortSelect({
  value,
  onChange,
  disabled
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("products");

  return (
    <div className="space-y-1">
      <Label className="text-xs uppercase tracking-[0.2em] text-primary/50">
        {t("sort.label")}
      </Label>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        disabled={disabled}
      >
        <option value="newest">{t("sort.newest")}</option>
        <option value="popular">{t("sort.popular")}</option>
        <option value="name">{t("sort.name")}</option>
      </Select>
    </div>
  );
}
