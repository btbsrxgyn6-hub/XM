"use client";

import { Textarea } from "@/components/atoms/textarea";
import { cn } from "@/lib/cn";

export function CommentTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) {
  return (
    <Textarea
      className={cn("min-h-24 text-sm", className)}
      {...props}
    />
  );
}
