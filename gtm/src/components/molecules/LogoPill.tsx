import { cx } from "@/lib/cx";

export function LogoPill({
  name,
  className
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold tracking-tight text-muted shadow-soft transition-colors hover:border-accent/30 hover:text-foreground",
        className
      )}
    >
      {name}
    </div>
  );
}
