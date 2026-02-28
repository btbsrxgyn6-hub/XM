"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/atoms/button";
import { CommentTextarea } from "@/components/atoms/comment-textarea";
import { cn } from "@/lib/cn";

export function CommentComposer({
  onSubmit,
  onCancel,
  cancelLabel = "Cancel",
  placeholder,
  submitLabel,
  isSubmitting,
  disabled,
  initialValue = "",
  autoFocus,
  className,
  error
}: {
  onSubmit: (value: string) => Promise<boolean>;
  onCancel?: () => void;
  cancelLabel?: string;
  placeholder?: string;
  submitLabel: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  initialValue?: string;
  autoFocus?: boolean;
  className?: string;
  error?: string | null;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  async function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || disabled || isSubmitting) return;
    const ok = await onSubmit(trimmed);
    if (ok) setValue("");
  }

  return (
    <div className={cn("space-y-3", className)}>
      <CommentTextarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        disabled={disabled || isSubmitting}
        autoFocus={autoFocus}
      />
      {error ? <p className="text-xs text-brand">{error}</p> : null}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleSubmit}
          disabled={disabled || isSubmitting || !value.trim()}
        >
          {submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
