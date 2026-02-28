"use client";

import { cn } from "@/lib/cn";

export function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-muted/70 bg-surface text-brand shadow-sm outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-surface",
        className
      )}
      {...props}
    />
  );
}
