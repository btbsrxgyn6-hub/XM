import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

export function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<"input"> & { className?: string }) {
  return (
    <input
      className={cx(
        "h-12 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground shadow-soft placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    />
  );
}
