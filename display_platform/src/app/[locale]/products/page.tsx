import { ProductsMarketplaceClient } from "@/components/organisms/products-marketplace";
import { PublicLayout } from "@/components/templates/public-layout";
import { withLocale, type AppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: { locale: AppLocale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "products" });

  return buildPageMetadata({
    title: t("marketplaceTitle"),
    description: t("marketplaceSubtitle"),
    path: withLocale("/products", params.locale)
  });
}

export default function ProductsMarketplacePage() {
  return (
    <PublicLayout>
      <ProductsMarketplaceClient />
    </PublicLayout>
  );
}
