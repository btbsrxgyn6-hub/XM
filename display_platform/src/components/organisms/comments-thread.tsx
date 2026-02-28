"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/atoms/button";
import { Spinner } from "@/components/atoms/spinner";
import { CommentComposer } from "@/components/molecules/comment-composer";
import { CommentRow } from "@/components/molecules/comment-row";
import { RepliesList } from "@/components/organisms/replies-list";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProductComments } from "@/lib/hooks/use-product-comments";
import { withLocale, type AppLocale } from "@/lib/locale";
import type { CommentItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function CommentsThread({
  productId,
  commentCount,
  onCountChange,
  className
}: {
  productId: string;
  commentCount?: number;
  onCountChange?: (delta: number) => void;
  className?: string;
}) {
  const t = useTranslations("comments");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentUser, isLoading: authLoading } = useAuth();
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
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
    loadMore,
    loadReplies,
    loadMoreReplies,
    createComment,
    editComment,
    deleteComment,
    canEdit
  } = useProductComments(productId, { onCountChange });

  const signInHref = useMemo(() => {
    const search = searchParams?.toString();
    const nextPath = search ? `${pathname}?${search}` : pathname ?? "/";
    return `${withLocale("/auth/sign-in", locale)}?next=${encodeURIComponent(nextPath)}`;
  }, [locale, pathname, searchParams]);

  const countLabel =
    typeof commentCount === "number" ? ` (${commentCount.toLocaleString()})` : "";

  const renderThreadItem = (comment: CommentItem, depth: number) => {
    const isEditing = editingId === comment.id;
    const isReplying = replyingId === comment.id;
    const canModify = canEdit(comment);

    return (
      <div className="space-y-3">
        <CommentRow
          comment={comment}
          canEdit={canModify}
          onReply={
            comment.isDeleted
              ? undefined
              : () => {
                  setReplyingId(comment.id);
                  setEditingId(null);
                }
          }
          onEditStart={() => {
            setEditingId(comment.id);
            setReplyingId(null);
          }}
          onEditCancel={() => setEditingId(null)}
          onEditSave={(body) => editComment(comment.id, body)}
          onDelete={() => deleteComment(comment.id)}
          isEditing={isEditing}
          isUpdating={pendingUpdates[comment.id]}
          isDeleting={pendingDeletes[comment.id]}
        />

        {isReplying ? (
          <div className="pl-12">
            <CommentComposer
              submitLabel={t("reply")}
              cancelLabel={t("cancel")}
              placeholder={t("writeReply")}
              isSubmitting={pendingReplies[comment.id]}
              onSubmit={(body) =>
                createComment({ body, parentId: comment.id }).then((ok) => {
                  if (ok) setReplyingId(null);
                  return ok;
                })
              }
              onCancel={() => setReplyingId(null)}
            />
          </div>
        ) : null}

        <RepliesList
          parent={comment}
          depth={depth + 1}
          repliesState={repliesByParent[comment.id]}
          onLoadReplies={loadReplies}
          onLoadMoreReplies={loadMoreReplies}
          renderReply={(reply, replyDepth) => renderThreadItem(reply, replyDepth)}
        />
      </div>
    );
  };

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-primary">
          {t("commentsTitle")}
          {countLabel}
        </h3>
        {!currentUser && !authLoading ? (
          <Button href={signInHref} size="sm" variant="secondary">
            {t("signIn")}
          </Button>
        ) : null}
      </div>

      {!currentUser && !authLoading ? (
        <p className="text-sm text-primary/60">{t("signInToInteract")}</p>
      ) : null}

      <CommentComposer
        submitLabel={t("postComment")}
        placeholder={t("writeComment")}
        onSubmit={(body) => createComment({ body })}
        isSubmitting={creating}
        disabled={authLoading}
        error={error}
      />

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-primary/60">
          <Spinner />
          {t("loadingComments")}
        </div>
      ) : null}

      {error && !creating ? <p className="text-sm text-brand">{error}</p> : null}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id}>{renderThreadItem(comment, 0)}</div>
        ))}
      </div>

      {!isLoading && comments.length === 0 ? (
        <p className="text-sm text-primary/60">{t("emptyComments")}</p>
      ) : null}

      {nextCursor ? (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => loadMore()}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? t("loadingMore") : t("loadMore")}
        </Button>
      ) : null}
    </div>
  );
}
