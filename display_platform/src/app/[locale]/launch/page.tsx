import { LaunchRedirect } from "@/components/organisms/launch-redirect";
import { PublicLayout } from "@/components/templates/public-layout";
import { withLocale, type AppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: { locale: AppLocale };
}): Promise<Metadata> {
  return buildPageMetadata({
    title: "Launch your product",
    description:
      "Start a new launch on Attrax AI and submit your product to reach a high-intent audience.",
    path: withLocale("/launch", params.locale)
  });
}

export default function LaunchPage() {
  return (
    <PublicLayout>
      <LaunchRedirect />
    </PublicLayout>
  );
}
