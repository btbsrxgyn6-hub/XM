"use client";

import { LocaleLink } from "@/components/atoms/locale-link";

import { cn } from "@/lib/cn";

export function navLinkPillClasses({ active }: { active?: boolean }) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    active
      ? "bg-brand/10 text-primary ring-1 ring-brand/25"
      : "text-primary/70 hover:bg-primary/5 hover:text-primary"
  );
}

export function NavLinkPill({
  href,
  active,
  className,
  children,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <LocaleLink
      href={href}
      className={cn(navLinkPillClasses({ active }), className)}
      {...props}
    >
      {children}
    </LocaleLink>
  );
}
