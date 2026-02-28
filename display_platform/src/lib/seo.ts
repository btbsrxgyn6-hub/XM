import type { Metadata } from "next";

import { LOCALES, stripLocale, withLocale } from "@/lib/locale";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
};

function buildOgTitle(title?: string) {
  if (!title) return SITE_NAME;
  return `${title} — ${SITE_NAME}`;
}

function buildLanguageAlternates(path: string) {
  const basePath = stripLocale(path);
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, withLocale(basePath, locale)])
  );
}

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex
}: PageMetadataOptions): Metadata {
  const resolvedTitle = title ?? SITE_NAME;
  const resolvedDescription = description ?? SITE_DESCRIPTION;
  const ogTitle = buildOgTitle(title);
  const ogImageUrl = ogImage ?? SITE_OG_IMAGE;
  const canonicalUrl = path ? new URL(path, SITE_URL).toString() : SITE_URL;

  const alternates = path
    ? { canonical: path, languages: buildLanguageAlternates(path) }
    : undefined;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates,
    openGraph: {
      title: ogTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      images: [{ url: ogImageUrl, alt: `${SITE_NAME} preview` }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: resolvedDescription,
      images: [ogImageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true
        }
      : undefined
  };
}
