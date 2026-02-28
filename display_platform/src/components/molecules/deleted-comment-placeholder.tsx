"use client";

import { useTranslations } from "next-intl";

export function DeletedCommentPlaceholder() {
  const t = useTranslations("comments");
  return <p className="text-sm italic text-primary/50">{t("deletedComment")}</p>;
}
