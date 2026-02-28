"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import {
  bookmarkProduct,
  followProduct,
  getProductInteractions,
  unbookmarkProduct,
  unfollowProduct
} from "@/lib/api";
import { useAuth } from "@/lib/hooks/use-auth";
import { withLocale, type AppLocale } from "@/lib/locale";

export type ProductInteractionState = {
  followCount: number;
  bookmarkCount: number;
  commentCount: number;
  isFollowedByMe: boolean;
  isBookmarkedByMe: boolean;
};

const DEFAULT_STATE: ProductInteractionState = {
  followCount: 0,
  bookmarkCount: 0,
  commentCount: 0,
  isFollowedByMe: false,
  isBookmarkedByMe: false
};

type InteractionOptions = {
  autoFetch?: boolean;
};

function mergeState(
  prev: ProductInteractionState,
  next?: Partial<ProductInteractionState>
): ProductInteractionState {
  if (!next) return prev;
  return {
    followCount: next.followCount ?? prev.followCount,
    bookmarkCount: next.bookmarkCount ?? prev.bookmarkCount,
    commentCount: next.commentCount ?? prev.commentCount,
    isFollowedByMe: next.isFollowedByMe ?? prev.isFollowedByMe,
    isBookmarkedByMe: next.isBookmarkedByMe ?? prev.isBookmarkedByMe
  };
}

export function useProductInteractions(
  productId: string,
  initial?: Partial<ProductInteractionState>,
  options?: InteractionOptions
) {
  const [state, setState] = useState<ProductInteractionState>(() =>
    mergeState(DEFAULT_STATE, initial)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isTogglingFollow, setIsTogglingFollow] = useState(false);
  const [isTogglingBookmark, setIsTogglingBookmark] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextPath = useMemo(() => {
    const search = searchParams?.toString();
    return search ? `${pathname}?${search}` : pathname;
  }, [pathname, searchParams]);

  const redirectToSignIn = useCallback(() => {
    const signInPath = withLocale("/auth/sign-in", locale);
    router.push(`${signInPath}?next=${encodeURIComponent(nextPath)}`);
  }, [locale, nextPath, router]);

  const refresh = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProductInteractions(productId);
      setState((prev) => mergeState(prev, data));
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Unable to load interactions.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (!productId) return;
    setState(mergeState(DEFAULT_STATE, initial));
  }, [
    productId,
    initial
  ]);

  useEffect(() => {
    if (!productId) return;
    const shouldFetch = options?.autoFetch ?? !initial;
    if (shouldFetch) void refresh();
  }, [productId, refresh, options?.autoFetch, initial]);

  const toggleFollow = useCallback(async () => {
    if (!productId || isTogglingFollow) return;
    if (authLoading) return;
    if (!currentUser) {
      redirectToSignIn();
      return;
    }

    const snapshot = state;
    const nextFollowed = !snapshot.isFollowedByMe;
    setError(null);
    setIsTogglingFollow(true);
    setState((prev) => ({
      ...prev,
      isFollowedByMe: nextFollowed,
      followCount: Math.max(0, prev.followCount + (nextFollowed ? 1 : -1))
    }));

    try {
      if (nextFollowed) {
        await followProduct(productId);
      } else {
        await unfollowProduct(productId);
      }
    } catch (err) {
      setState(snapshot);
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Unable to update follow status.";
      setError(message);
    } finally {
      setIsTogglingFollow(false);
    }
  }, [
    authLoading,
    currentUser,
    isTogglingFollow,
    productId,
    redirectToSignIn,
    state
  ]);

  const toggleBookmark = useCallback(async () => {
    if (!productId || isTogglingBookmark) return;
    if (authLoading) return;
    if (!currentUser) {
      redirectToSignIn();
      return;
    }

    const snapshot = state;
    const nextBookmarked = !snapshot.isBookmarkedByMe;
    setError(null);
    setIsTogglingBookmark(true);
    setState((prev) => ({
      ...prev,
      isBookmarkedByMe: nextBookmarked,
      bookmarkCount: Math.max(0, prev.bookmarkCount + (nextBookmarked ? 1 : -1))
    }));

    try {
      if (nextBookmarked) {
        await bookmarkProduct(productId);
      } else {
        await unbookmarkProduct(productId);
      }
    } catch (err) {
      setState(snapshot);
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Unable to update bookmark.";
      setError(message);
    } finally {
      setIsTogglingBookmark(false);
    }
  }, [
    authLoading,
    currentUser,
    isTogglingBookmark,
    productId,
    redirectToSignIn,
    state
  ]);

  const bumpCommentCount = useCallback((delta: number) => {
    setState((prev) => ({
      ...prev,
      commentCount: Math.max(0, prev.commentCount + delta)
    }));
  }, []);

  return {
    state,
    isLoading,
    isTogglingFollow,
    isTogglingBookmark,
    error,
    refresh,
    toggleFollow,
    toggleBookmark,
    bumpCommentCount
  };
}
