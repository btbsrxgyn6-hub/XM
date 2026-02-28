"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import {
  createProductComment,
  deleteComment,
  listCommentReplies,
  listProductComments,
  updateComment
} from "@/lib/api";
import type { CommentItem } from "@/lib/types";
import { useAuth } from "@/lib/hooks/use-auth";
import { withLocale, type AppLocale } from "@/lib/locale";

type ReplyState = {
  items: CommentItem[];
  nextCursor?: string | null;
  isLoading: boolean;
  isLoaded: boolean;
  error?: string | null;
};

type PendingMap = Record<string, boolean>;

type CommentOptions = {
  onCountChange?: (delta: number) => void;
};

const PAGE_SIZE = 10;
const REPLY_PAGE_SIZE = 5;

function mergeById(existing: CommentItem[], incoming: CommentItem[]) {
  const map = new Map<string, CommentItem>();
  existing.forEach((item) => map.set(item.id, item));
  incoming.forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
}

function replaceItem(list: CommentItem[], id: string, next: CommentItem) {
  return list.map((item) => (item.id === id ? next : item));
}

function removeItem(list: CommentItem[], id: string) {
  return list.filter((item) => item.id !== id);
}

function updateItem(
  list: CommentItem[],
  id: string,
  updater: (item: CommentItem) => CommentItem
) {
  return list.map((item) => (item.id === id ? updater(item) : item));
}

export function useProductComments(productId: string, options?: CommentOptions) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repliesByParent, setRepliesByParent] = useState<Record<string, ReplyState>>({});
  const [creating, setCreating] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState<PendingMap>({});
  const [pendingDeletes, setPendingDeletes] = useState<PendingMap>({});
  const [pendingReplies, setPendingReplies] = useState<PendingMap>({});
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

  useEffect(() => {
    setComments([]);
    setNextCursor(null);
    setRepliesByParent({});
    setError(null);
  }, [productId]);

  const loadInitial = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await listProductComments(productId, { limit: PAGE_SIZE });
      setComments(data.items);
      setNextCursor(data.nextCursor ?? null);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Unable to load comments.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (!productId) return;
    void loadInitial();
  }, [productId, loadInitial]);

  const loadMore = useCallback(async () => {
    if (!productId || !nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    setError(null);
    try {
      const data = await listProductComments(productId, {
        limit: PAGE_SIZE,
        cursor: nextCursor ?? undefined
      });
      setComments((prev) => mergeById(prev, data.items));
      setNextCursor(data.nextCursor ?? null);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Unable to load more comments.";
      setError(message);
    } finally {
      setIsLoadingMore(false);
    }
  }, [productId, nextCursor, isLoadingMore]);

  const loadReplies = useCallback(
    async (commentId: string) => {
      if (!commentId) return;
      const existing = repliesByParent[commentId];
      if (existing?.isLoading) return;
      setRepliesByParent((prev) => ({
        ...prev,
        [commentId]: {
          items: prev[commentId]?.items ?? [],
          nextCursor: prev[commentId]?.nextCursor ?? null,
          isLoading: true,
          isLoaded: prev[commentId]?.isLoaded ?? false
        }
      }));

      try {
        const data = await listCommentReplies(commentId, { limit: REPLY_PAGE_SIZE });
        setRepliesByParent((prev) => ({
          ...prev,
          [commentId]: {
            items: mergeById(prev[commentId]?.items ?? [], data.items),
            nextCursor: data.nextCursor ?? null,
            isLoading: false,
            isLoaded: true
          }
        }));
      } catch (err) {
        const message =
          err instanceof Error && err.message
            ? err.message
            : "Unable to load replies.";
        setRepliesByParent((prev) => ({
          ...prev,
          [commentId]: {
            items: prev[commentId]?.items ?? [],
            nextCursor: prev[commentId]?.nextCursor ?? null,
            isLoading: false,
            isLoaded: prev[commentId]?.isLoaded ?? false,
            error: message
          }
        }));
      }
    },
    [repliesByParent]
  );

  const loadMoreReplies = useCallback(
    async (commentId: string) => {
      const existing = repliesByParent[commentId];
      if (!existing?.nextCursor || existing?.isLoading) return;
      setRepliesByParent((prev) => ({
        ...prev,
        [commentId]: {
          ...prev[commentId],
          isLoading: true
        }
      }));
      try {
        const data = await listCommentReplies(commentId, {
          limit: REPLY_PAGE_SIZE,
          cursor: existing.nextCursor ?? undefined
        });
        setRepliesByParent((prev) => ({
          ...prev,
          [commentId]: {
            items: mergeById(prev[commentId]?.items ?? [], data.items),
            nextCursor: data.nextCursor ?? null,
            isLoading: false,
            isLoaded: true
          }
        }));
      } catch (err) {
        const message =
          err instanceof Error && err.message
            ? err.message
            : "Unable to load replies.";
        setRepliesByParent((prev) => ({
          ...prev,
          [commentId]: {
            ...prev[commentId],
            isLoading: false,
            error: message
          }
        }));
      }
    },
    [repliesByParent]
  );

  const updateCommentInAll = useCallback(
    (id: string, updater: (item: CommentItem) => CommentItem) => {
      setComments((prev) => updateItem(prev, id, updater));
      setRepliesByParent((prev) => {
        const next: Record<string, ReplyState> = {};
        for (const key of Object.keys(prev)) {
          next[key] = {
            ...prev[key],
            items: updateItem(prev[key].items, id, updater)
          };
        }
        return next;
      });
    },
    []
  );

  const replaceCommentInAll = useCallback((id: string, nextItem: CommentItem) => {
    setComments((prev) => replaceItem(prev, id, nextItem));
    setRepliesByParent((prev) => {
      const next: Record<string, ReplyState> = {};
      for (const key of Object.keys(prev)) {
        next[key] = {
          ...prev[key],
          items: replaceItem(prev[key].items, id, nextItem)
        };
      }
      return next;
    });
  }, []);

  const removeCommentFromAll = useCallback((id: string) => {
    setComments((prev) => removeItem(prev, id));
    setRepliesByParent((prev) => {
      const next: Record<string, ReplyState> = {};
      for (const key of Object.keys(prev)) {
        next[key] = {
          ...prev[key],
          items: removeItem(prev[key].items, id)
        };
      }
      return next;
    });
  }, []);

  const findCommentById = useCallback(
    (id: string) => {
      const topLevel = comments.find((item) => item.id === id);
      if (topLevel) return topLevel;
      for (const state of Object.values(repliesByParent)) {
        const replyMatch = state.items.find((item) => item.id === id);
        if (replyMatch) return replyMatch;
      }
      return null;
    },
    [comments, repliesByParent]
  );

  const createComment = useCallback(
    async (params: { body: string; parentId?: string }) => {
      if (authLoading) return false;
      if (!currentUser) {
        redirectToSignIn();
        return false;
      }
      const trimmed = params.body.trim();
      if (!trimmed || !productId) return false;

      const tempId = `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const now = new Date().toISOString();
      const optimistic: CommentItem = {
        id: tempId,
        productId,
        parentId: params.parentId ?? null,
        body: trimmed,
        isDeleted: false,
        createdAt: now,
        updatedAt: now,
        author: { id: currentUser.id, name: currentUser.name },
        replyCount: 0
      };

      if (params.parentId) {
        setPendingReplies((prev) => ({ ...prev, [params.parentId!]: true }));
        setRepliesByParent((prev) => ({
          ...prev,
          [params.parentId!]: {
            items: [optimistic, ...(prev[params.parentId!]?.items ?? [])],
            nextCursor: prev[params.parentId!]?.nextCursor ?? null,
            isLoading: false,
            isLoaded: prev[params.parentId!]?.isLoaded ?? false
          }
        }));
        updateCommentInAll(params.parentId, (item) => ({
          ...item,
          replyCount: Math.max(0, item.replyCount + 1)
        }));
      } else {
        setCreating(true);
        setComments((prev) => [optimistic, ...prev]);
      }

      options?.onCountChange?.(1);
      setError(null);

      try {
        const saved = await createProductComment(productId, {
          body: trimmed,
          parentId: params.parentId
        });
        replaceCommentInAll(tempId, saved);
        return true;
      } catch (err) {
        removeCommentFromAll(tempId);
        if (params.parentId) {
          updateCommentInAll(params.parentId, (item) => ({
            ...item,
            replyCount: Math.max(0, item.replyCount - 1)
          }));
        }
        options?.onCountChange?.(-1);
        const message =
          err instanceof Error && err.message
            ? err.message
            : "Unable to post comment.";
        setError(message);
        return false;
      } finally {
        if (params.parentId) {
          setPendingReplies((prev) => ({ ...prev, [params.parentId!]: false }));
        } else {
          setCreating(false);
        }
      }
    },
    [
      authLoading,
      currentUser,
      productId,
      options,
      redirectToSignIn,
      removeCommentFromAll,
      replaceCommentInAll,
      updateCommentInAll
    ]
  );

  const editComment = useCallback(
    async (commentId: string, body: string) => {
      if (!commentId) return false;
      const trimmed = body.trim();
      if (!trimmed) return false;
      const now = new Date().toISOString();
      setPendingUpdates((prev) => ({ ...prev, [commentId]: true }));
      setError(null);

      let snapshot: CommentItem | null = null;
      updateCommentInAll(commentId, (item) => {
        snapshot = item;
        return {
          ...item,
          body: trimmed,
          updatedAt: now
        };
      });

      try {
        const saved = await updateComment(commentId, { body: trimmed });
        replaceCommentInAll(commentId, saved);
        return true;
      } catch (err) {
        if (snapshot) {
          replaceCommentInAll(commentId, snapshot);
        }
        const message =
          err instanceof Error && err.message
            ? err.message
            : "Unable to update comment.";
        setError(message);
        return false;
      } finally {
        setPendingUpdates((prev) => ({ ...prev, [commentId]: false }));
      }
    },
    [replaceCommentInAll, updateCommentInAll]
  );

  const removeComment = useCallback(
    async (commentId: string) => {
      if (!commentId) return false;
      setPendingDeletes((prev) => ({ ...prev, [commentId]: true }));
      setError(null);
      const snapshot = findCommentById(commentId);
      const snapshotParentId = snapshot?.parentId ?? null;
      updateCommentInAll(commentId, (item) => ({
        ...item,
        isDeleted: true,
        body: null,
        updatedAt: new Date().toISOString()
      }));

      if (snapshotParentId) {
        updateCommentInAll(snapshotParentId, (item) => ({
          ...item,
          replyCount: Math.max(0, item.replyCount - 1)
        }));
      }

      options?.onCountChange?.(-1);

      try {
        await deleteComment(commentId);
        return true;
      } catch (err) {
        if (snapshot) {
          replaceCommentInAll(commentId, snapshot);
        }
        if (snapshotParentId) {
          updateCommentInAll(snapshotParentId, (item) => ({
            ...item,
            replyCount: Math.max(0, item.replyCount + 1)
          }));
        }
        options?.onCountChange?.(1);
        const message =
          err instanceof Error && err.message
            ? err.message
            : "Unable to delete comment.";
        setError(message);
        return false;
      } finally {
        setPendingDeletes((prev) => ({ ...prev, [commentId]: false }));
      }
    },
    [options, findCommentById, replaceCommentInAll, updateCommentInAll]
  );

  const canEdit = useCallback(
    (comment: CommentItem) => {
      if (!currentUser) return false;
      return comment.author?.id === currentUser.id;
    },
    [currentUser]
  );

  return {
    comments,
    nextCursor,
    isLoading,
    isLoadingMore,
    error,
    repliesByParent,
    creating,
    pendingUpdates,
    pendingDeletes,
    pendingReplies,
    loadInitial,
    loadMore,
    loadReplies,
    loadMoreReplies,
    createComment,
    editComment,
    deleteComment: removeComment,
    canEdit
  };
}
