"use client";

import Image from "next/image";

import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/mark.png"
      alt="Attrax"
      width={368}
      height={368}
      className={cn("h-7 w-7", className)}
      priority={false}
    />
  );
}
