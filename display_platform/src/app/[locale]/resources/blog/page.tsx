import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
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
  const t = await getTranslations({
    locale: params.locale,
    namespace: "resources.blog"
  });

  return buildPageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: withLocale("/resources/blog", params.locale)
  });
}

export default async function ResourcesBlogPage() {
  const t = await getTranslations("resources.blog");

  return (
    <PublicLayout>
      <Card className="p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-3xl text-primary sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-xl text-sm text-primary/70">
          {t("subtitle")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/resources" variant="secondary">
            {t("actions.back")}
          </Button>
          <Button href="/products">{t("actions.explore")}</Button>
        </div>
      </Card>
    </PublicLayout>
  );
}
