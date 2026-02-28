"use client";

import { cn } from "@/lib/cn";

export type RadioOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export function RadioGroup<T extends string>({
  name,
  value,
  options,
  onChange,
  className
}: {
  name: string;
  value: T | "";
  options: ReadonlyArray<RadioOption<T>>;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              "cursor-pointer rounded-3xl border p-4 shadow-sm transition",
              checked
                ? "border-brand/35 bg-brand/12"
                : "border-primary/10 bg-surface hover:bg-primary/3"
            )}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="mt-1 h-4 w-4 border border-muted/70 bg-surface text-brand outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-surface"
              />
              <div>
                <p className="text-sm font-semibold text-primary">{option.label}</p>
                {option.description ? (
                  <p className="mt-1 text-xs text-gray">{option.description}</p>
                ) : null}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
