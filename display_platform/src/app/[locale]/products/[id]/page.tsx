"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { RatingStars } from "@/components/atoms/rating-stars";
import { EmptyState } from "@/components/molecules/empty-state";
import { DemoBadge } from "@/components/molecules/demo-badge";
import { LocaleLink } from "@/components/atoms/locale-link";
import { SectionHeader } from "@/components/molecules/section-header";
import { CommentsThread } from "@/components/organisms/comments-thread";
import { ProductPreviewCard } from "@/components/organisms/product-preview-card";
import { ProductPreviewHero } from "@/components/organisms/product-preview-hero";
import { ProductInteractionsBar } from "@/components/organisms/product-interactions-bar";
import { PublicLayout } from "@/components/templates/public-layout";
import { useAllProducts } from "@/lib/hooks/use-all-products";
import { useProductInteractions } from "@/lib/hooks/use-product-interactions";
import { incrementProductViews } from "@/lib/api";
import { productTypeKey, regionKey } from "@/lib/product-options";
import { tagKey } from "@/lib/tags";
import type { Product } from "@/lib/types";

const statusVariants: Record<Product["status"], "default" | "success" | "warning"> = {
  draft: "default",
  submitted: "warning",
  published: "success"
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function splitParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function PublicProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const { products, isLoading } = useAllProducts();
  const [localViews, setLocalViews] = useState<number | null>(null);
  const t = useTranslations("products");
  const statusT = useTranslations("status");

  const product = useMemo(
    () => products.find((item) => item.id === id),
    [products, id]
  );

  const interactionInitial = useMemo(
    () =>
      product
        ? {
            followCount: product.followCount,
            bookmarkCount: product.bookmarkCount,
            commentCount: product.commentCount,
            isFollowedByMe: product.isFollowedByMe,
            isBookmarkedByMe: product.isBookmarkedByMe
          }
        : undefined,
    [product]
  );

  const interactions = useProductInteractions(product?.id ?? "", interactionInitial, {
    autoFetch: Boolean(product?.id)
  });

  useEffect(() => {
    if (!product) return;
    const key = `attrax:viewed:${product.id}`;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(key)) return;
    void (async () => {
      try {
        const data = await incrementProductViews(product.id);
        setLocalViews(data.views);
      } finally {
        window.sessionStorage.setItem(key, "true");
      }
    })();
  }, [product]);

  if (isLoading) {
    return (
      <PublicLayout>
        <Card className="animate-pulse p-6">
          <div className="space-y-4">
            <div className="h-4 w-40 rounded-full bg-primary/10" />
            <div className="h-8 w-2/3 rounded-full bg-primary/10" />
            <div className="h-48 rounded-3xl bg-primary/10" />
          </div>
        </Card>
      </PublicLayout>
    );
  }

  if (!product) {
    return (
      <PublicLayout>
        <EmptyState
          title={t("notFound.title")}
          description={t("notFound.description")}
          action={{ label: t("notFound.action"), href: "/products" }}
        />
      </PublicLayout>
    );
  }

  const meta = { label: statusT(product.status), variant: statusVariants[product.status] };
  const paragraphs = splitParagraphs(product.fields.productDetails);
  const views = localViews ?? product.views ?? 0;
  const hasRating =
    typeof product.rating === "number" && typeof product.ratingCount === "number";

  return (
    <PublicLayout>
      <div className="space-y-6">
        <LocaleLink
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary/60 transition hover:text-primary"
        >
          <span aria-hidden="true">←</span>
          {t("backToProducts")}
        </LocaleLink>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={meta.variant}>{meta.label}</Badge>
          {product.fields.classificationTags.map((tag) => (
            <Badge key={tag} variant="info">
              {t(`tags.${tagKey(tag)}`)}
            </Badge>
          ))}
        </div>

        {hasRating ? (
          <div className="flex items-center gap-2 text-sm text-primary/60">
            <RatingStars rating={product.rating} />
            <span className="font-semibold text-primary/80">
              {product.rating?.toFixed(1)}
            </span>
            <span>
              {t("ratingCount", {
                count: product.ratingCount?.toLocaleString()
              })}
            </span>
          </div>
        ) : null}

        {product.isSeededDemo ? (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-primary/10 bg-surface/70 p-3 text-xs text-primary/60">
            <DemoBadge label={t("demoListing")} />
            <span>{t("demoHelper")}</span>
          </div>
        ) : null}

        <ProductPreviewHero
          fields={product.fields}
          label={t("marketplaceLabel")}
          iconKey={product.iconKey}
          coverImage={product.coverImage}
        />

        <ProductInteractionsBar
          productId={product.id}
          initial={interactionInitial}
          autoFetch={false}
          state={interactions.state}
          isLoading={interactions.isLoading}
          isTogglingFollow={interactions.isTogglingFollow}
          isTogglingBookmark={interactions.isTogglingBookmark}
          error={interactions.error}
          onToggleFollow={interactions.toggleFollow}
          onToggleBookmark={interactions.toggleBookmark}
        />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <Card className="space-y-6 p-6">
              <SectionHeader title={t("detailsTitle")} />
              <div className="space-y-4 text-sm text-primary/70">
                {paragraphs.map((paragraph, index) => (
                  <p key={`paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>

              {product.fields.trailer.enabled ? (
                <div className="rounded-2xl border border-primary/10 bg-surface/70 p-4">
                  <p className="text-sm font-semibold text-primary">{t("trailer.title")}</p>
                  <p className="mt-1 text-sm text-primary/70">
                    {product.fields.trailer.note || t("trailer.noteFallback")}
                  </p>
                  {product.fields.trailer.releaseAt ? (
                    <p className="mt-2 text-xs text-primary/60">
                      {t("trailer.releaseDate", {
                        date: formatDate(product.fields.trailer.releaseAt)
                      })}
                    </p>
                  ) : null}
                  {product.fields.trailer.reservationEnabled &&
                  product.fields.trailer.reservationUrl ? (
                    <div className="mt-3">
                      <Button
                        href={product.fields.trailer.reservationUrl}
                        variant="secondary"
                        size="sm"
                        external
                      >
                        {t("trailer.reserve")}
                      </Button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {product.fields.acknowledgements.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-primary">
                    {t("acknowledgements")}
                  </p>
                  <ul className="space-y-2 text-sm text-primary/70">
                    {product.fields.acknowledgements.map((item) => (
                      <li key={item.id} className="rounded-2xl bg-surface/70 p-3">
                        <p className="font-semibold text-primary">{item.name}</p>
                        {item.note ? (
                          <p className="text-xs text-primary/60">{item.note}</p>
                        ) : null}
                        {item.url ? (
                          <a
                            href={item.url}
                            className="text-xs font-semibold text-brand"
                          >
                            {item.url}
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Card>

            <Card className="p-6">
              <CommentsThread
                productId={product.id}
                commentCount={interactions.state.commentCount}
                onCountChange={interactions.bumpCommentCount}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="space-y-4 p-6">
              <SectionHeader title={t("snapshot.title")} />
              <div className="space-y-2 text-sm text-primary/70">
                <p>
                  <span className="font-semibold text-primary">{t("snapshot.organization")}</span>{" "}
                  {product.fields.organizationName || t("organizationFallback")}
                </p>
                <p>
                  <span className="font-semibold text-primary">{t("snapshot.region")}</span>{" "}
                  {product.fields.region
                    ? t(`regions.${regionKey(product.fields.region)}`)
                    : t("regions.global")}
                </p>
                <p>
                  <span className="font-semibold text-primary">{t("snapshot.productType")}</span>{" "}
                  {product.fields.productType
                    ? t(`types.${productTypeKey(product.fields.productType)}`)
                    : t("types.software")}
                </p>
                <p>
                  <span className="font-semibold text-primary">{t("snapshot.updated")}</span>{" "}
                  {formatDate(product.updatedAt)}
                </p>
                <p>
                  <span className="font-semibold text-primary">{t("snapshot.views")}</span> {views}
                </p>
              </div>
              {product.fields.officialWebsiteUrl ? (
                <Button href={product.fields.officialWebsiteUrl} external>
                  {t("snapshot.pricing")}
                </Button>
              ) : null}
            </Card>

            <div className="space-y-3">
              <SectionHeader title={t("brochureTitle")} />
              <ProductPreviewCard fields={product.fields} iconKey={product.iconKey} />
            </div>

            {product.fields.detailsPageAtlasImages.length > 0 ? (
              <Card className="space-y-4 p-6">
                <SectionHeader title={t("atlasTitle")} />
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.fields.detailsPageAtlasImages.map((file) => (
                    <div
                      key={file.id}
                      className="rounded-2xl border border-primary/10 bg-primary/3 p-4 text-xs text-primary/60"
                    >
                      <div className="mb-3 h-24 rounded-xl bg-surface/70" />
                      <p className="font-semibold text-primary">{file.name}</p>
                      <p>{Math.round(file.size / 1024)} KB</p>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
