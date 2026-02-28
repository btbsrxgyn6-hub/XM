import Link from "next/link";

import { cx } from "@/lib/cx";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cx("inline-flex items-center gap-2", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-foreground to-accent text-background shadow-soft">
        <span className="size-2 rounded-full bg-background/90" />
      </span>
      <span className="text-sm font-semibold tracking-tight">Company Name</span>
    </Link>
  );
}
