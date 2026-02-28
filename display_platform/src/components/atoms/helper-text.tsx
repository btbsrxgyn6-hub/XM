"use client";

import { cn } from "@/lib/cn";

export function HelperText({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-xs text-gray", className)}>{children}</p>;
}
