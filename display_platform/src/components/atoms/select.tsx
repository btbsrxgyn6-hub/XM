"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full appearance-none rounded-2xl border border-muted/60 bg-surface px-4 py-3 text-sm text-primary shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
