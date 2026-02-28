import { cx } from "@/lib/cx";

import { Icon, type IconName } from "@/components/atoms/Icon";

export function IconMark({
  className,
  label,
  icon = "sparkles"
}: {
  className?: string;
  label?: string;
  icon?: IconName;
}) {
  return (
    <div
      className={cx(
        "grid size-11 place-items-center rounded-2xl border border-border bg-accent/10 text-accent shadow-soft",
        className
      )}
      {...(label
        ? { role: "img" as const, "aria-label": label }
        : { "aria-hidden": true as const })}
    >
      <Icon name={icon} className="size-5" />
    </div>
  );
}
