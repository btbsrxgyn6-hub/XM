import { cx } from "@/lib/cx";

export function ComparisonCard({
  title,
  items,
  tone = "neutral"
}: {
  title: string;
  items: ReadonlyArray<string>;
  tone?: "neutral" | "emphasis";
}) {
  return (
    <div
      className={cx(
        "rounded-3xl border border-border bg-background p-6 shadow-soft",
        tone === "emphasis" &&
          "border-transparent bg-gradient-to-br from-foreground to-accent text-background"
      )}
    >
      <div
        className={cx(
          "text-sm font-semibold",
          tone === "emphasis" ? "text-background" : "text-foreground"
        )}
      >
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed">
        {items.map((item) => (
          <li
            key={item}
            className={cx(
              "flex gap-2",
              tone === "emphasis" ? "text-background/85" : "text-muted"
            )}
          >
            <span
              className={cx(
                "mt-1 size-2 shrink-0 rounded-full",
                tone === "emphasis" ? "bg-background/85" : "bg-foreground/20"
              )}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
