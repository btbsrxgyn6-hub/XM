"use client";

import { cn } from "@/lib/cn";

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-lg"
};

export function IconCircle({
  children,
  size = "md",
  className
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
}
