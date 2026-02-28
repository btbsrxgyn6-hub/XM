"use client";

import { HelperText } from "@/components/atoms/helper-text";
import { Label } from "@/components/atoms/label";
import { cn } from "@/lib/cn";

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        {htmlFor ? (
          <Label htmlFor={htmlFor}>
            {label}
            {required ? <span className="text-brand"> *</span> : null}
          </Label>
        ) : (
          <span className="text-sm font-semibold text-primary">
            {label}
            {required ? <span className="text-brand"> *</span> : null}
          </span>
        )}
        {hint ? <HelperText className="text-right">{hint}</HelperText> : null}
      </div>
      {children}
      {error ? (
        <p className="text-xs font-medium text-brand" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
