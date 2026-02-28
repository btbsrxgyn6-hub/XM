"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

function formatCount(value?: number) {
  if (value === undefined || value === null) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}

export function CountIcon({
  icon: Icon,
  count,
  label,
  className,
  onClick
}: {
  icon: LucideIcon;
  count?: number;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/10 bg-surface px-3 py-1.5 text-xs font-semibold text-primary/70 shadow-sm transition hover:bg-primary/3",
        className
      )}
      onClick={onClick}
      aria-label={`${label} ${formatCount(count)}`}
    >
      <Icon className="h-4 w-4" />
      <span>{formatCount(count)}</span>
    </button>
  );
}
