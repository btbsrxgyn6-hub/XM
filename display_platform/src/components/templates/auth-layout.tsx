"use client";

import { Container } from "@/components/atoms/container";
import { LocaleLink } from "@/components/atoms/locale-link";
import { Logo } from "@/components/atoms/logo";
import { Wordmark } from "@/components/atoms/wordmark";
import { useTranslations } from "next-intl";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("auth");

  return (
    <div className="min-h-screen bg-surface">
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,101,81,0.10),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.06),_transparent_55%)]" />
      </div>

      <Container className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between py-8">
          <LocaleLink href="/" className="flex items-center gap-2">
            <Logo className="sm:hidden" />
            <Wordmark className="hidden sm:block" />
          </LocaleLink>
          <LocaleLink
            href="/"
            className="rounded-full border border-primary/10 bg-surface/70 px-4 py-2 text-xs font-semibold text-primary/70 transition hover:text-primary"
          >
            {t("backToMarketing")}
          </LocaleLink>
        </header>
        <main className="flex flex-1 items-center justify-center pb-12">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </Container>
    </div>
  );
}
