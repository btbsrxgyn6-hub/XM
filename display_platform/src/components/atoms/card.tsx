"use client";

import { cn } from "@/lib/cn";

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-primary/10 bg-surface shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
