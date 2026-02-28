"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { Spinner } from "@/components/atoms/spinner";
import { cn } from "@/lib/cn";

function formatCount(value?: number) {
  if (value === undefined || value === null) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}

export function ReplyToggleRow({
  isOpen,
  count,
  isLoading,
  onToggle,
  className
}: {
  isOpen: boolean;
  count?: number;
  isLoading?: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const t = useTranslations("comments");
  const label = isOpen ? t("hideReplies") : t("viewReplies");
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/10 bg-surface px-3 py-1 text-xs font-semibold text-primary/70 transition hover:bg-primary/5",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
      <span className="text-primary/50">{formatCount(count)}</span>
      {isLoading ? <Spinner className="h-3 w-3" /> : null}
    </button>
  );
}
