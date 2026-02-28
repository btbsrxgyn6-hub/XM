"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { ComponentProps } from "react";

import { withLocale, type AppLocale } from "@/lib/locale";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function LocaleLink({ href, ...props }: Props) {
  const locale = useLocale() as AppLocale;
  return <Link href={withLocale(href, locale)} {...props} />;
}
