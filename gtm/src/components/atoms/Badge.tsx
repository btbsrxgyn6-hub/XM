import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs font-medium text-foreground shadow-soft backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}
