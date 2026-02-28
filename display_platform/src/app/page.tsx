import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";

export default function RootRedirectPage() {
  const cookieLocale = cookies().get("locale")?.value;
  const resolvedLocale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  redirect(`/${resolvedLocale}`);
}
