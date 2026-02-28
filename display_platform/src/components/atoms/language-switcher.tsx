"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/cn";
import { stripLocale, type AppLocale } from "@/lib/locale";
import { k } from "@/lib/storageKeys";

const STORAGE_KEY = k("locale");

function buildLocalizedPath(pathname: string, locale: AppLocale, search: string) {
  const base = stripLocale(pathname);
  const withLocalePath = base === "/" ? `/${locale}` : `/${locale}${base}`;
  return search ? `${withLocalePath}?${search}` : withLocalePath;
}

export function LanguageSwitcher({
  className
}: {
  className?: string;
}) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const locale = useLocale() as AppLocale;

  function switchLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) return;
    const search = typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : "";
    const nextPath = buildLocalizedPath(pathname, nextLocale, search);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
      document.cookie = `locale=${nextLocale};path=/;max-age=31536000`;
    } catch {
      // ignore
    }
    router.push(nextPath);
  }

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full border border-primary/10 bg-surface px-1 py-1", className)}>
      {(["en", "zh"] as AppLocale[]).map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => switchLocale(option)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              active
                ? "bg-brand/15 text-brand ring-1 ring-brand/25"
                : "text-primary/60 hover:bg-primary/5 hover:text-primary"
            )}
            aria-pressed={active}
            aria-label={t("language.switchTo", {
              locale: t(`language.${option}`)
            })}
          >
            {option === "en" ? "EN" : "中文"}
          </button>
        );
      })}
      <span className="sr-only">{t("language.current", { locale: t(`language.${locale}`) })}</span>
    </div>
  );
}
