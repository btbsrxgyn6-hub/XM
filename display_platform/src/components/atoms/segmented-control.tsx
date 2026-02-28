"use client";

import { cn } from "@/lib/cn";

type Option<T extends string> = {
  label: string;
  value: T;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className
}: {
  options: Option<T>[];
  value: T;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-primary/10 bg-surface p-1 shadow-sm",
        className
      )}
      role="tablist"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              active
                ? "bg-brand-gradient text-surface shadow-sm"
                : "text-gray hover:bg-primary/5 hover:text-primary"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
