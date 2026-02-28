"use client";

import { cn } from "@/lib/cn";

export function SectionHeader({
  title,
  subtitle,
  action,
  className
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <div>
        <p className="text-lg font-semibold text-primary">{title}</p>
        {subtitle ? <p className="text-sm text-primary/60">{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
