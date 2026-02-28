export const LOCALES = ["en", "zh"] as const;
export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export function isLocale(value: string | null | undefined): value is AppLocale {
  return value === "en" || value === "zh";
}

export function stripLocale(pathname: string) {
  if (!pathname.startsWith("/")) return pathname;
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (!isLocale(maybeLocale)) return pathname;
  const rest = segments.slice(2).join("/");
  return rest ? `/${rest}` : "/";
}

export function withLocale(href: string, locale: AppLocale) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (!href.startsWith("/")) {
    return `/${locale}/${href}`;
  }

  const segments = href.split("/");
  if (isLocale(segments[1])) return href;
  if (href.startsWith("/api") || href.startsWith("/_next")) return href;

  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
