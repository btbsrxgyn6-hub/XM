"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

export function RatingStars({
  rating,
  max = 5,
  className,
  size = "md"
}: {
  rating?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const resolvedRating = Number.isFinite(rating) ? Math.max(rating ?? 0, 0) : 0;
  const filled = Math.round(resolvedRating);
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < filled;
        return (
          <Star
            key={`star-${index}`}
            className={cn(
              sizeClass,
              isFilled ? "fill-brand/35 text-brand/80" : "text-primary/20"
            )}
          />
        );
      })}
    </div>
  );
}
