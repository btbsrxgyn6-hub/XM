"use client";

import { cn } from "@/lib/cn";

export function PriceTag({
  label,
  className,
  size = "md"
}: {
  label: string;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      {label}
    </span>
  );
}
