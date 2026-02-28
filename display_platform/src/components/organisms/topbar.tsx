"use client";
import { useState } from "react";

import { Button } from "@/components/atoms/button";
import { IconButton } from "@/components/atoms/icon-button";
import { LanguageSwitcher } from "@/components/atoms/language-switcher";
import { LocaleLink } from "@/components/atoms/locale-link";
import { Logo } from "@/components/atoms/logo";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { Wordmark } from "@/components/atoms/wordmark";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/hooks/use-auth";
import { useTranslations } from "next-intl";

export function Topbar({ title }: { title: string }) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const t = useTranslations("console");
  const common = useTranslations("common");

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 bg-surface/70 px-6 py-4">
      <div className="flex items-center gap-4">
        <LocaleLink href="/products" className="flex items-center gap-2 lg:hidden">
          <Logo className="h-8 w-8 sm:hidden" />
          <Wordmark className="hidden sm:block" />
        </LocaleLink>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-2xl text-primary">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />

        <div className="relative">
          <IconButton onClick={() => setOpen((prev) => !prev)} aria-label={common("menu.user")}>
            <span className="text-sm font-semibold">
              {currentUser?.name?.charAt(0).toUpperCase() ?? "U"}
            </span>
          </IconButton>
          <div
            className={cn(
              "absolute right-0 mt-3 w-56 rounded-2xl border border-primary/10 bg-surface p-3 shadow-card transition",
              open ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <p className="text-xs font-semibold text-primary/60">{t("signedInAs")}</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {currentUser?.name ?? t("unknownUser")}
            </p>
            <p className="text-xs text-primary/60">{currentUser?.email ?? ""}</p>
            <div className="mt-3">
              <Button href="/auth/sign-out" size="sm" variant="secondary" className="w-full">
                {t("signOut")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
