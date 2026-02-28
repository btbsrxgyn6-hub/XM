import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LocaleHtmlLang } from "@/components/atoms/locale-html";
import { Providers } from "@/app/providers";
import { LOCALES, isLocale, type AppLocale } from "@/lib/locale";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: AppLocale };
}) {
  if (!isLocale(params.locale)) notFound();
  setRequestLocale(params.locale);
  const messages = await getMessages({ locale: params.locale });

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <Providers>
        <LocaleHtmlLang />
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
