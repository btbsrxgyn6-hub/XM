"use client";

import { cn } from "@/lib/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary",
        className
      )}
      aria-hidden="true"
    />
  );
}
