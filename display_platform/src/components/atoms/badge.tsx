"use client";

import { cn } from "@/lib/cn";

type Variant = "default" | "success" | "warning" | "danger" | "info";

const variants: Record<Variant, string> = {
  // draft
  default: "bg-primary/2 text-gray ring-1 ring-muted/60",
  // published
  success: "bg-brand/12 text-brand ring-1 ring-brand/25",
  // submitted
  warning: "bg-primary/4 text-dark ring-1 ring-muted/60",
  danger: "bg-brand/15 text-brand ring-1 ring-brand/35",
  info: "bg-primary/3 text-dark ring-1 ring-primary/10"
};

export function Badge({
  children,
  variant = "default",
  className
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
