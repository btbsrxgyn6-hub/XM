import type { Metadata, Viewport } from "next";

import "./globals.css";
import { StructuredData } from "@/components/atoms/structured-data";
import { ThemeScript } from "@/components/atoms/theme-script";
import { ConsoleFilter } from "@/components/atoms/console-filter";
import {
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TAGLINE,
  SITE_URL
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    images: [{ url: SITE_OG_IMAGE, alt: `${SITE_NAME} preview` }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE]
  },
  icons: {
    icon: SITE_LOGO,
    apple: SITE_LOGO,
    shortcut: SITE_LOGO
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#FF6551"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <ThemeScript />
        <StructuredData />
      </head>
      <body className="page-bg font-sans antialiased">
        <ConsoleFilter />
        {children}
      </body>
    </html>
  );
}
