import type { MetadataRoute } from "next";

import { LOCALES } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/case-studies",
  "/community",
  "/community/events",
  "/community/partners",
  "/community/newsletter",
  "/launch",
  "/pricing",
  "/products",
  "/resources",
  "/resources/blog",
  "/resources/docs",
  "/resources/guides",
  "/resources/faq"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((path) => {
      const localizedPath = path ? `/${locale}${path}` : `/${locale}`;
      return {
        url: `${SITE_URL}${localizedPath}`,
        lastModified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7
      };
    })
  );
}
