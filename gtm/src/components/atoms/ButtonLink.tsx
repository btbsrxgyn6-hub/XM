import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-foreground/90 border-transparent shadow-soft",
  accent:
    "bg-accent text-accent-foreground hover:bg-accent/90 border-transparent shadow-soft",
  secondary:
    "bg-background text-foreground hover:bg-surface border-border shadow-soft",
  ghost: "bg-transparent text-foreground hover:bg-surface border-transparent"
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md"
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-full border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
