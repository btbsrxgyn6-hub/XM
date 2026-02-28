import type { MetadataRoute } from "next";

import { LOCALES } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/auth",
    "/console",
    ...LOCALES.flatMap((locale) => [`/${locale}/auth`, `/${locale}/console`]),
  ];

  return {
    rules: [
      // Block OpenAI training crawler
      {
        userAgent: "GPTBot",
        disallow: "/",
      },

      // Default rules for everything else
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
