"use client";

import { cn } from "@/lib/cn";

export function ChevronIcon({
  className,
  direction = "down"
}: {
  className?: string;
  direction?: "down" | "up";
}) {
  const rotate = direction === "up" ? "rotate-180" : "";
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn("h-4 w-4 transition-transform", rotate, className)}
      fill="none"
    >
      <path
        d="M5.5 7.5L10 12l4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

