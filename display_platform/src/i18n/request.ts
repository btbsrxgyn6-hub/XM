import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const resolvedLocale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});
