"use client";

import { Button } from "@/components/atoms/button";
import { LocaleLink } from "@/components/atoms/locale-link";
import { Wordmark } from "@/components/atoms/wordmark";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

type NavItem = {
  label: string;
  href: string;
};

export function Sidebar({ currentPath }: { currentPath: string }) {
  const t = useTranslations("console");
  const navItems: NavItem[] = [
    { label: t("nav.dashboard"), href: "/console" },
    { label: t("nav.products"), href: "/console/products" },
    { label: t("nav.newProduct"), href: "/console/products/new" }
  ];

  return (
    <aside className="hidden min-h-screen w-64 border-r border-primary/10 bg-surface/70 p-6 lg:block">
      <LocaleLink href="/products" className="flex items-center gap-2">
        <Wordmark />
      </LocaleLink>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          let active = currentPath === item.href;
          if (item.href === "/console/products") {
            active =
              currentPath === item.href ||
              (currentPath.startsWith("/console/products/") &&
                !currentPath.startsWith("/console/products/new"));
          } else if (item.href !== "/console") {
            active = active || currentPath.startsWith(item.href);
          }
          return (
            <LocaleLink
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
                active
                  ? "bg-brand/12 text-primary shadow-sm ring-1 ring-brand/25"
                  : "bg-surface/60 text-primary/70 hover:bg-primary/3 hover:text-primary"
              )}
            >
              <span>{item.label}</span>
              {item.href === "/console/products/new" ? (
                <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-semibold text-brand ring-1 ring-brand/25">
                  {t("nav.start")}
                </span>
              ) : null}
            </LocaleLink>
          );
        })}
      </nav>

      <div className="mt-12 rounded-3xl bg-primary/3 p-5 text-sm text-primary ring-1 ring-primary/10">
        <p className="font-semibold">{t("cta.title")}</p>
        <p className="mt-2 text-xs text-primary/70">
          {t("cta.description")}
        </p>
        <div className="mt-4">
          <Button href="/console/products/new" size="sm">
            {t("cta.action")}
          </Button>
        </div>
      </div>
    </aside>
  );
}
