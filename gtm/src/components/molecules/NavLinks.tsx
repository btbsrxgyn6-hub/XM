import Link from "next/link";

import { cx } from "@/lib/cx";

export function NavLinks({
  items,
  className
}: {
  items: ReadonlyArray<{ label: string; href: string }>;
  className?: string;
}) {
  return (
    <nav className={cx("flex items-center gap-6", className)} aria-label="Main">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm text-muted decoration-border/80 underline-offset-8 transition-colors hover:text-foreground hover:underline"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
