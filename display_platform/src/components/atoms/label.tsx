"use client";

import { cn } from "@/lib/cn";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) {
  return (
    <label
      className={cn("text-sm font-semibold text-primary", className)}
      {...props}
    />
  );
}
