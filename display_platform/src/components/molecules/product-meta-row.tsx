"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function ProductMetaRow({
  organizationName,
  updatedAt,
  showUpdated = true,
  className
}: {
  organizationName: string;
  updatedAt: string;
  showUpdated?: boolean;
  className?: string;
}) {
  const t = useTranslations("products");

  return (
    <div className={cn("flex flex-wrap items-center gap-2 text-xs text-primary/60", className)}>
      <span className="font-semibold text-primary/80">{organizationName}</span>
      {showUpdated ? (
        <>
          <span className="text-primary/30">•</span>
          <span>{t("updated", { date: formatDate(updatedAt) })}</span>
        </>
      ) : null}
    </div>
  );
}
