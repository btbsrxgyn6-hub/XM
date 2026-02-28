"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Spinner } from "@/components/atoms/spinner";
import { BookmarkButton } from "@/components/molecules/bookmark-button";
import { FollowButton } from "@/components/molecules/follow-button";
import { cn } from "@/lib/cn";
import {
  type ProductInteractionState,
  useProductInteractions
} from "@/lib/hooks/use-product-interactions";

function formatCount(value?: number) {
  if (value === undefined || value === null) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}

export function ProductInteractionsBar({
  productId,
  initial,
  autoFetch,
  state,
  isLoading,
  isTogglingFollow,
  isTogglingBookmark,
  error,
  onToggleFollow,
  onToggleBookmark,
  variant = "default",
  className
}: {
  productId: string;
  initial?: Partial<ProductInteractionState>;
  autoFetch?: boolean;
  state?: ProductInteractionState;
  isLoading?: boolean;
  isTogglingFollow?: boolean;
  isTogglingBookmark?: boolean;
  error?: string | null;
  onToggleFollow?: () => void;
  onToggleBookmark?: () => void;
  variant?: "default" | "compact";
  className?: string;
}) {
  const t = useTranslations("interactions");
  const fallback = useProductInteractions(productId, initial, { autoFetch });
  const interactions = state ?? fallback.state;
  const loading = isLoading ?? fallback.isLoading;
  const togglingFollow = isTogglingFollow ?? fallback.isTogglingFollow;
  const togglingBookmark = isTogglingBookmark ?? fallback.isTogglingBookmark;
  const handleToggleFollow = onToggleFollow ?? fallback.toggleFollow;
  const handleToggleBookmark = onToggleBookmark ?? fallback.toggleBookmark;
  const message = error ?? fallback.error;
  const showLabels = variant === "default";
  const compactChip = variant === "compact" ? "w-[5.75rem] justify-center" : "";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4",
        variant === "default" && "rounded-2xl border border-primary/10 bg-surface/70 p-3",
        variant === "compact" && "gap-2",
        className
      )}
    >
      <FollowButton
        isActive={interactions.isFollowedByMe}
        count={interactions.followCount}
        isLoading={togglingFollow}
        onToggle={handleToggleFollow}
        showLabel={showLabels}
        className={compactChip}
      />
      <BookmarkButton
        isActive={interactions.isBookmarkedByMe}
        count={interactions.bookmarkCount}
        isLoading={togglingBookmark}
        onToggle={handleToggleBookmark}
        showLabel={showLabels}
        className={compactChip}
      />
      <div
        className={cn(
          "inline-flex h-8 items-center gap-2 rounded-full border border-primary/10 bg-surface px-3 text-xs font-semibold text-primary/70 shadow-sm",
          compactChip
        )}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {showLabels ? <span>{t("comments")}</span> : null}
        <span aria-label={t("comments")} className="tabular-nums">
          {formatCount(interactions.commentCount)}
        </span>
      </div>
      {loading ? <Spinner className="h-4 w-4" /> : null}
      {message ? <p className="text-xs text-brand">{message}</p> : null}
    </div>
  );
}
