"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

export function IconToggleButton({
  icon: Icon,
  active = false,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 bg-surface text-primary/70 shadow-sm transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60",
        active && "border-brand/30 bg-brand/10 text-brand",
        className
      )}
      aria-pressed={active}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
