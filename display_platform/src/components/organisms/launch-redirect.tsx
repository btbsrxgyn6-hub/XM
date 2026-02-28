"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Card } from "@/components/atoms/card";
import { useAuth } from "@/lib/hooks/use-auth";
import { withLocale, type AppLocale } from "@/lib/locale";

export function LaunchRedirect() {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("common");

  useEffect(() => {
    if (isLoading) return;
    const nextPath = withLocale("/console/products/new", locale);
    if (currentUser) {
      router.replace(nextPath);
      return;
    }
    router.replace(`${withLocale("/auth/sign-in", locale)}?next=${encodeURIComponent(nextPath)}`);
  }, [currentUser, isLoading, router, locale]);

  return (
    <Card className="p-8 text-sm text-primary/70">
      {t("redirecting")}
    </Card>
  );
}
