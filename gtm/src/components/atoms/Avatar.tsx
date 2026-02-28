import { cx } from "@/lib/cx";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = (parts[1]?.[0] ?? parts[0]?.[1] ?? "").toString();
  return `${first}${second}`.toUpperCase();
}

export function Avatar({
  name,
  className
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "grid size-10 place-items-center rounded-full bg-gradient-to-br from-accent to-foreground text-xs font-semibold text-accent-foreground",
        className
      )}
      aria-hidden="true"
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}

