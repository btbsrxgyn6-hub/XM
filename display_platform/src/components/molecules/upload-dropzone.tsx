"use client";

import { useId, useRef } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/cn";

export function UploadDropzone({
  label,
  accept,
  multiple,
  description,
  onFiles,
  disabled,
  className
}: {
  label: string;
  accept?: string;
  multiple?: boolean;
  description?: string;
  onFiles: (files: FileList) => void;
  disabled?: boolean;
  className?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations("common");

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "rounded-3xl border border-dashed border-primary/20 bg-surface/50 p-5 text-sm text-primary/70 shadow-sm transition hover:bg-surface",
          disabled ? "opacity-60 hover:bg-surface/50" : ""
        )}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          if (disabled) return;
          if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            onFiles(event.dataTransfer.files);
          }
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-primary">{label}</p>
            <p className="mt-1 text-xs text-primary/60">
              {description ?? t("upload.hint")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              className="sr-only"
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              onChange={(event) => {
                if (!event.target.files) return;
                onFiles(event.target.files);
                event.target.value = "";
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
            >
              {t("upload.choose")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
