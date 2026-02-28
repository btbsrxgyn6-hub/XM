"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { IconToggleButton } from "@/components/atoms/icon-toggle-button";
import { Spinner } from "@/components/atoms/spinner";
import { cn } from "@/lib/cn";

function formatCount(value?: number) {
  if (value === undefined || value === null) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}

export function BookmarkButton({
  isActive,
  count,
  isLoading,
  onToggle,
  showLabel = false,
  className
}: {
  isActive: boolean;
  count?: number;
  isLoading?: boolean;
  onToggle?: () => void;
  showLabel?: boolean;
  className?: string;
}) {
  const t = useTranslations("interactions");
  const label = isActive ? t("bookmarked") : t("bookmark");
  const Icon = isActive ? BookmarkCheck : Bookmark;

  return (
    <div
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border border-primary/10 bg-surface px-3 text-xs font-semibold text-primary/70 shadow-sm transition hover:bg-primary/5",
        isActive && "border-brand/30 bg-brand/10 text-brand hover:bg-brand/15",
        className
      )}
    >
      <IconToggleButton
        icon={Icon}
        active={isActive}
        aria-label={label}
        onClick={onToggle}
        disabled={isLoading}
        className={cn(
          "h-6 w-6 border-none bg-transparent shadow-none hover:bg-transparent",
          isActive ? "text-brand" : "text-primary/70"
        )}
      />
      {showLabel ? <span>{label}</span> : null}
      <span className="tabular-nums">{formatCount(count)}</span>
      {isLoading ? <Spinner className="h-3 w-3" /> : null}
    </div>
  );
}
