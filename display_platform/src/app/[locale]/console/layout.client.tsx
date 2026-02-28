"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { ConsoleLayout } from "@/components/templates/console-layout";
import { stripLocale } from "@/lib/locale";

export function ConsoleRootLayoutClient({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = stripLocale(usePathname() ?? "");
  const t = useTranslations("console");

  let title = t("titles.console");
  if (pathname === "/console") title = t("titles.dashboard");
  if (pathname === "/console/products") title = t("titles.products");
  if (pathname === "/console/products/new") title = t("titles.newProduct");
  if (pathname.endsWith("/edit")) title = t("titles.editProduct");
  if (pathname.includes("/console/products/")) title = t("titles.preview");

  return <ConsoleLayout title={title}>{children}</ConsoleLayout>;
}
