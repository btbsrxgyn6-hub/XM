"use client";

import Image from "next/image";

import { useTheme } from "@/components/organisms/ThemeProvider";
import { cn } from "@/lib/cn";

export function Wordmark({
  className,
  alt = "Attrax AI",
  locale = "en"
}: {
  className?: string;
  alt?: string;
  locale?: "en" | "zh";
}) {
  const { resolvedTheme } = useTheme();

  const lightSrc = locale === "zh" ? "/brand/wordmark-zh.png" : "/brand/wordmark-en.png";
  const src = resolvedTheme === "dark" ? "/brand/brand-transparent-dk.png" : lightSrc;
  const dimensions =
    resolvedTheme === "dark"
      ? { width: 2768, height: 825 }
      : locale === "zh"
      ? { width: 1548, height: 370 }
      : { width: 1439, height: 370 };

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={cn("h-[20px] w-auto", className)}
      priority={false}
    />
  );
}
