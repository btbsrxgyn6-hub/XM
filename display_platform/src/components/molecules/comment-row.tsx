"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { CommentComposer } from "@/components/molecules/comment-composer";
import { DeletedCommentPlaceholder } from "@/components/molecules/deleted-comment-placeholder";
import { TimeAgo } from "@/components/atoms/time-ago";
import { Spinner } from "@/components/atoms/spinner";
import { cn } from "@/lib/cn";
import type { CommentItem } from "@/lib/types";

function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase());
  return letters.join("") || "?";
}

export function CommentRow({
  comment,
  canEdit,
  onReply,
  onEditStart,
  onEditSave,
  onEditCancel,
  onDelete,
  isEditing,
  isUpdating,
  isDeleting,
  className
}: {
  comment: CommentItem;
  canEdit?: boolean;
  onReply?: () => void;
  onEditStart?: () => void;
  onEditSave?: (body: string) => Promise<boolean>;
  onEditCancel?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  className?: string;
}) {
  const t = useTranslations("comments");
  const initials = useMemo(() => getInitials(comment.author?.name), [comment.author?.name]);
  const hasBody = Boolean(comment.body && !comment.isDeleted);

  async function handleEditSubmit(value: string) {
    if (!onEditSave) return false;
    const ok = await onEditSave(value);
    if (ok) onEditCancel?.();
    return ok;
  }

  return (
    <div className={cn("flex gap-3", className)}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary/70">
        {initials}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-primary">
            {comment.author?.name || t("anonymous")}
          </span>
          <TimeAgo value={comment.createdAt} />
        </div>

        {isEditing ? (
          <CommentComposer
            initialValue={comment.body ?? ""}
            submitLabel={t("save")}
            cancelLabel={t("cancel")}
            onSubmit={handleEditSubmit}
            onCancel={onEditCancel}
            isSubmitting={isUpdating}
          />
        ) : hasBody ? (
          <p className="text-sm text-primary/70 whitespace-pre-wrap">{comment.body}</p>
        ) : (
          <DeletedCommentPlaceholder />
        )}

        {!isEditing && !comment.isDeleted ? (
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-primary/60">
            {onReply ? (
              <button
                type="button"
                onClick={onReply}
                className="transition hover:text-primary"
                disabled={isUpdating || isDeleting}
              >
                {t("reply")}
              </button>
            ) : null}
            {canEdit ? (
              <button
                type="button"
                onClick={onEditStart}
                className="transition hover:text-primary"
                disabled={isUpdating || isDeleting}
              >
                {t("edit")}
              </button>
            ) : null}
            {canEdit ? (
              <button
                type="button"
                onClick={onDelete}
                className="text-brand transition hover:text-brand/80"
                disabled={isUpdating || isDeleting}
              >
                {t("delete")}
              </button>
            ) : null}
            {isUpdating || isDeleting ? <Spinner className="h-3 w-3" /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
