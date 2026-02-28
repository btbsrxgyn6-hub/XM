"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { AuthCard } from "@/components/organisms/auth-card";
import { AuthLayout } from "@/components/templates/auth-layout";
import { useAuth } from "@/lib/hooks/use-auth";
import { withLocale, type AppLocale } from "@/lib/locale";

export default function SignUpPage() {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  const locale = useLocale() as AppLocale;
  const [nextPath, setNextPath] = useState(withLocale("/console", locale));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next) {
      setNextPath(withLocale(next, locale));
    }
  }, [locale]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace(nextPath);
    }
  }, [currentUser, isLoading, nextPath, router]);

  return (
    <AuthLayout>
      <AuthCard
        mode="sign-up"
        onSuccess={() => router.replace(nextPath)}
      />
    </AuthLayout>
  );
}
