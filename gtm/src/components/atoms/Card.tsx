import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

export function Card({
  children,
  className,
  hover = true
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-border bg-background shadow-soft",
        hover && "transition-transform hover:-translate-y-0.5 hover:border-accent/30",
        className
      )}
    >
      {children}
    </div>
  );
}
