"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/cn";
import { LocaleLink } from "@/components/atoms/locale-link";
import { Sidebar } from "@/components/organisms/sidebar";
import { Topbar } from "@/components/organisms/topbar";
import { useAuth } from "@/lib/hooks/use-auth";
import { stripLocale, withLocale, type AppLocale } from "@/lib/locale";

export function ConsoleLayout({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const strippedPath = stripLocale(pathname ?? "");
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("console");
  const { currentUser, isLoading } = useAuth();
  const navItems = [
    { label: t("nav.dashboard"), href: "/console" },
    { label: t("nav.products"), href: "/console/products" },
    { label: t("nav.newProduct"), href: "/console/products/new" }
  ];

  useEffect(() => {
    if (!isLoading && !currentUser) {
      const nextPath = pathname ?? withLocale("/console", locale);
      const signInPath = withLocale("/auth/sign-in", locale);
      router.replace(`${signInPath}?next=${encodeURIComponent(nextPath)}`);
    }
  }, [currentUser, isLoading, pathname, router, locale]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-primary/60">
        {t("checkingSession")}
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-primary/60">
        {t("redirecting")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="flex">
        <Sidebar currentPath={strippedPath} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar title={title} />
          <nav className="flex flex-wrap gap-2 border-b border-primary/10 bg-surface/70 px-6 py-3 lg:hidden">
            {navItems.map((item) => {
              const active =
                strippedPath === item.href ||
                (item.href === "/console/products"
                  ? strippedPath.startsWith("/console/products/") &&
                    !strippedPath.startsWith("/console/products/new")
                  : item.href !== "/console" && strippedPath.startsWith(item.href));

              return (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-xs font-semibold transition",
                    active
                      ? "bg-brand-gradient text-surface shadow-sm"
                      : "bg-surface text-primary/70 hover:bg-primary/3 hover:text-primary"
                  )}
                >
                  {item.label}
                </LocaleLink>
              );
            })}
          </nav>
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
