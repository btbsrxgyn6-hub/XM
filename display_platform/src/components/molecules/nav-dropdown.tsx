"use client";

import { LocaleLink } from "@/components/atoms/locale-link";
import { useEffect, useId, useRef } from "react";

import { ChevronIcon } from "@/components/atoms/chevron-icon";
import { navLinkPillClasses } from "@/components/atoms/nav-link-pill";
import { cn } from "@/lib/cn";

export type NavDropdownItem = {
  label: string;
  href: string;
  description?: string;
};

export function NavDropdown({
  label,
  items,
  open,
  onOpenChange,
  active
}: {
  label: string;
  items: NavDropdownItem[];
  open: boolean;
  onOpenChange: (next: boolean) => void;
  active?: boolean;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      const root = rootRef.current;
      const target = event.target as Node | null;
      if (!root || !target) return;
      if (!root.contains(target)) onOpenChange(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={cn(navLinkPillClasses({ active: active || open }), "gap-1.5")}
        aria-haspopup="menu"
        aria-controls={id}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        {label}
        <ChevronIcon className={cn(open ? "rotate-180" : "")} />
      </button>

      {open ? (
        <div
          id={id}
          role="menu"
          className="absolute left-0 top-full z-40 mt-2 w-[22rem] rounded-3xl border border-primary/10 bg-surface/95 backdrop-blur-md p-2 shadow-card"
        >
          {items.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              role="menuitem"
              className="group flex items-start gap-3 rounded-2xl px-3 py-2.5 text-sm text-primary/80 transition hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              onClick={() => onOpenChange(false)}
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-brand/60" />
              <span className="min-w-0">
                <span className="block font-semibold">{item.label}</span>
                {item.description ? (
                  <span className="mt-0.5 block text-xs text-primary/60 group-hover:text-primary/70">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </LocaleLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
