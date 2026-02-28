"use client";

import { Card } from "@/components/atoms/card";
import { EmptyState } from "@/components/molecules/empty-state";
import { useProducts } from "@/lib/hooks/use-products";
import { useTranslations } from "next-intl";

export default function ConsoleDashboardPage() {
  const { counts, products, isLoading } = useProducts();
  const t = useTranslations("console");
  const activity = [
    {
      title: t("activity.draftSaved.title"),
      description: t("activity.draftSaved.description")
    },
    {
      title: t("activity.submissionQueued.title"),
      description: t("activity.submissionQueued.description")
    },
    {
      title: t("activity.assetUpdated.title"),
      description: t("activity.assetUpdated.description")
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          { label: t("stats.total"), value: counts.total },
          { label: t("stats.drafts"), value: counts.draft },
          { label: t("stats.submitted"), value: counts.submitted },
          { label: t("stats.published"), value: counts.published }
        ].map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
              {stat.label}
            </p>
            <p className="mt-4 text-3xl font-semibold text-primary">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">{t("recentActivity.title")}</p>
            <p className="text-xs text-primary/60">
              {t("recentActivity.subtitle")}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 text-sm text-primary/60">{t("loadingActivity")}</div>
        ) : products.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title={t("emptyActivity.title")}
              description={t("emptyActivity.description")}
              action={{ label: t("emptyActivity.action"), href: "/console/products/new" }}
            />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {activity.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-primary/10 bg-surface/70 p-4"
              >
                <p className="text-sm font-semibold text-primary">{item.title}</p>
                <p className="text-xs text-primary/60">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
