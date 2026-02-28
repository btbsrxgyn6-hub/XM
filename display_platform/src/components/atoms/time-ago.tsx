"use client";

export function TimeAgo({ value }: { value: string }) {
  const date = new Date(value);
  const label = Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
  return (
    <time dateTime={value} className="text-xs text-primary/50">
      {label}
    </time>
  );
}
