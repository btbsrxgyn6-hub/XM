"use client";

import { Button } from "@/components/atoms/button";
import { ProductsTable } from "@/components/organisms/products-table";
import { useTranslations } from "next-intl";

export default function ProductsListPage() {
  const t = useTranslations("console");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">{t("products.title")}</p>
          <p className="text-xs text-primary/60">
            {t("products.subtitle")}
          </p>
        </div>
        <Button href="/console/products/new">{t("products.create")}</Button>
      </div>
      <ProductsTable />
    </div>
  );
}
