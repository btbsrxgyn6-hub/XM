"use client";

import { cn } from "@/lib/cn";

export function Toggle({
  checked,
  onChange,
  label,
  className
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full border shadow-sm outline-none transition focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-surface",
        checked ? "border-brand/35 bg-brand/20" : "border-primary/10 bg-surface",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 rounded-full shadow-sm transition",
          checked ? "bg-brand" : "bg-primary/60",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
