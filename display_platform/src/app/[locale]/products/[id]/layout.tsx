import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { listPublicProducts } from "@/lib/api";
import { withLocale, type AppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

function toDescription(value: string | null | undefined, fallback: string) {
  const normalized = value?.replace(/\s+/g, " ").trim();
  if (!normalized) return fallback;
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157)}...`;
}

export async function generateMetadata({
  params
}: {
  params: { locale: AppLocale; id: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "products"
  });
  const path = withLocale(`/products/${params.id}`, params.locale);

  try {
    const products = await listPublicProducts({ sort: "newest", limit: 200 });
    const product = products.find((item) => item.id === params.id);

    if (product) {
      const title = product.fields.productName || t("untitled");
      const description = toDescription(
        product.fields.productDetails,
        t("previewDescriptionFallback")
      );

      const ogImage = [product.coverImage, product.logoImage].find((value) => value);

      return buildPageMetadata({
        title,
        description,
        path,
        ogImage
      });
    }
  } catch {
    // Fall back to generic metadata for missing or offline products.
  }

  return buildPageMetadata({
    title: t("marketplaceTitle"),
    description: t("marketplaceSubtitle"),
    path
  });
}

export default function ProductDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
