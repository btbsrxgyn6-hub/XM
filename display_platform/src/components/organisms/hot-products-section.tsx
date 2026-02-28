"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Container } from "@/components/atoms/container";
import { useAllProducts } from "@/lib/hooks/use-all-products";
import type { Product } from "@/lib/types";

function pickProducts(products: Product[], mode: "hot" | "new") {
  const published = products.filter((product) => product.status === "published");
  const pool = published.length > 0 ? published : products;
  return [...pool].sort((a, b) => {
    if (mode === "new") return b.updatedAt.localeCompare(a.updatedAt);
    return (b.views ?? 0) - (a.views ?? 0);
  });
}

export function HotProductsSection() {
  const t = useTranslations("home");
  const { products, isLoading } = useAllProducts();
  const [mode, setMode] = useState<"hot" | "new">("hot");
  const cards = useMemo(() => pickProducts(products, mode).slice(0, 6), [products, mode]);

  return (
    <section id="market" className="py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/55">
              {t("market.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-primary sm:text-4xl">
              {t("market.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary/70 sm:text-base">
              {t("market.subtitle")}
            </p>
          </div>

          <div className="inline-flex rounded-full border border-primary/10 dark:border-primary/20 bg-primary/10 dark:bg-surface/10 p-1 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setMode("hot")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                mode === "hot"
                  ? "bg-brand-gradient text-primary"
                  : "text-primary/65 hover:text-primary"
              }`}
            >
              <Flame
                className={`h-3.5 w-3.5 ${mode === "hot" ? "animate-[float-soft_1.5s_ease-in-out_infinite]" : ""}`}
                fill="currentColor"
              />
              {t("market.hot")}
            </button>
            <button
              type="button"
              onClick={() => setMode("new")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                mode === "new"
                  ? "bg-brand-gradient text-primary"
                  : "text-primary/65 hover:text-primary"
              }`}
            >
              {t("market.new")}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`wire-skeleton-${index}`}
                  className="rounded-3xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 p-4 shadow-sm"
                >
                  <div className="aspect-[4/3] animate-pulse rounded-2xl bg-primary/10 dark:bg-surface/10" />
                  <div className="mt-4 h-4 w-32 animate-pulse rounded-full bg-primary/10 dark:bg-surface/10" />
                  <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-primary/10 dark:bg-surface/10" />
                </div>
              ))
            : cards.map((product, index) => (
                <article
                  key={product.id}
                  className="group relative overflow-hidden rounded-3xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(220px_100px_at_15%_0%,rgba(255,90,120,0.18),transparent_60%),radial-gradient(220px_120px_at_85%_12%,rgba(90,210,255,0.16),transparent_62%),linear-gradient(120deg,rgba(255,255,255,0.00),rgba(255,255,255,0.08),rgba(255,255,255,0.00))] bg-[length:auto,auto,220%_100%] animate-[shimmer-x_2.8s_linear_infinite]" />
                    <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(180,220,255,0.16)]" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-primary/10 dark:border-primary/20 bg-primary/10 dark:bg-surface/10">
                    <div className="absolute left-2 top-2 z-10">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary ${
                          mode === "hot"
                            ? "bg-[linear-gradient(110deg,#ff654f,#ff9460,#ff654f)] bg-[length:200%_100%] animate-[shimmer-x_3.2s_linear_infinite] shadow-[0_0_0_1px_rgba(255,160,120,0.25),0_6px_16px_rgba(255,101,81,0.26)]"
                            : "border border-primary/15 dark:border-primary/25 bg-primary/15 dark:bg-surface/15"
                        }`}
                      >
                        {mode === "hot" ? (
                          <Flame className="h-3 w-3 animate-[float-soft_1.6s_ease-in-out_infinite]" fill="currentColor" />
                        ) : null}
                        <span>{mode === "hot" ? t("market.hot") : index < 3 ? t("market.new") : t("market.fresh")}</span>
                      </span>
                    </div>
                    <div className="relative aspect-[4/3]">
                      {product.coverImage ? (
                        <Image
                          src={product.coverImage}
                          alt={product.fields.productName || t("market.productAlt")}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full bg-[linear-gradient(135deg,rgba(255,101,81,0.20),rgba(255,255,255,0.02))]" />
                      )}
                    </div>
                  </div>

                  <h3 className="mt-4 truncate text-base font-semibold text-primary">
                    {product.fields.productName || t("market.untitled")}
                  </h3>
                  <p className="mt-1 truncate text-sm text-primary/65">
                    {product.fields.organizationName || t("market.team")}
                  </p>
                  <div className="mt-4">
                    <Button
                      href={`/products/${product.id}`}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      {t("market.viewDetails")}
                    </Button>
                  </div>
                </article>
              ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/launch">{t("market.actions.launch")}</Button>
          <Button href="/products" variant="secondary">
            {t("market.actions.browse")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
