"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { API_BASE, API_V1 } from "@/lib/api-base";

export function CoverImage({
  src,
  alt,
  fallbackText,
  className,
  sizes = "(max-width: 768px) 100vw, 360px",
  priority = false,
  unoptimized = true
}: {
  src?: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const initial = useMemo(() => {
    const value = fallbackText?.trim();
    if (!value) return "A";
    return value[0]?.toUpperCase() ?? "A";
  }, [fallbackText]);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const isApiHosted =
    Boolean(src) && (src?.startsWith(API_BASE) || src?.startsWith(API_V1));
  const isRemote = Boolean(src) && (src?.startsWith("http") || isApiHosted);
  const showImage = Boolean(src) && !hasError;

  const frameClass = showImage
    ? "ring-1 ring-cyan-300/20 shadow-[0_0_12px_rgba(56,189,248,0.12)]"
    : "";

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-primary/5",
        frameClass,
        className
      )}
    >
      {showImage ? (
        <>
          {isRemote ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src as string}
              alt={alt}
              className="h-full w-full object-cover"
              loading={priority ? "eager" : "lazy"}
              onError={() => setHasError(true)}
            />
          ) : (
            <Image
              src={src as string}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              unoptimized={unoptimized}
              className="h-full w-full object-cover"
              onError={() => setHasError(true)}
            />
          )}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/18 via-transparent to-blue-500/28" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_10%,rgba(56,189,248,0.35)_0%,rgba(56,189,248,0)_60%)]" />
            <div className="absolute inset-0 ring-1 ring-cyan-200/20" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-gradient">
          <span className="text-2xl font-semibold uppercase tracking-[0.18em] text-surface/90">
            {initial}
          </span>
        </div>
      )}
    </div>
  );
}
