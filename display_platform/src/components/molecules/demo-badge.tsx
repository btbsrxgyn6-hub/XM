"use client";

import { Badge } from "@/components/atoms/badge";
import { useTranslations } from "next-intl";

export function DemoBadge({ label }: { label?: string }) {
  const t = useTranslations("products");
  return (
    <Badge variant="warning" className="text-[10px] uppercase tracking-[0.2em]">
      {label ?? t("demoBadge")}
    </Badge>
  );
}
