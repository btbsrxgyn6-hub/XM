"use client";

import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  className
}: {
  value: number;
  className?: string;
}) {
  const safe = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  return (
    <div className={cn("h-2 w-full rounded-full bg-primary/10", className)}>
      <div
        className="h-full rounded-full bg-brand transition-[width]"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}
