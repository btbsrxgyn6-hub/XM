"use client";

import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

export function TagPicker<T extends string>({
  options,
  selected,
  max = 3,
  min = 1,
  getLabel,
  onChange
}: {
  options: readonly T[];
  selected: T[];
  max?: number;
  min?: number;
  getLabel?: (tag: T) => string;
  onChange: (next: T[]) => void;
}) {
  const t = useTranslations("wizard");

  function toggle(tag: T) {
    if (selected.includes(tag)) {
      const next = selected.filter((t) => t !== tag);
      onChange(next);
      return;
    }
    if (selected.length >= max) return;
    onChange([...selected, tag]);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((tag) => {
          const active = selected.includes(tag);
          const disabled = !active && selected.length >= max;
          const label = getLabel ? getLabel(tag) : tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              disabled={disabled}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                active
                  ? "bg-brand/12 text-brand ring-brand/25"
                  : "bg-surface text-dark ring-muted/60 hover:bg-primary/3",
                disabled ? "cursor-not-allowed opacity-60" : ""
              )}
              aria-pressed={active}
            >
              {label}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray">
        {t("tags.helper", { min, max })}{" "}
        <span className={cn(selected.length < min ? "text-brand" : "")}>
          {t("tags.selectedCount", { selected: selected.length, max })}
        </span>
        .
      </p>
    </div>
  );
}
