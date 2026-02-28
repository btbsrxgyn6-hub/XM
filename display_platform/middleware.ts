import createMiddleware from "next-intl/middleware";

import { DEFAULT_LOCALE, LOCALES } from "./src/lib/locale";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: "locale",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax"
  }
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
