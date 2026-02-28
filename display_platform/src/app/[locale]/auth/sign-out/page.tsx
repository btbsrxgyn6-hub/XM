"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { useAuth } from "@/lib/hooks/use-auth";
import { withLocale, type AppLocale } from "@/lib/locale";

export default function SignOutPage() {
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("auth");
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
    router.replace(withLocale("/", locale));
  }, [signOut, router, locale]);

  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-primary/70">
      {t("signingOut")}
    </div>
  );
}
