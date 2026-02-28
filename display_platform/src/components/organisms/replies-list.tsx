"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/atoms/button";
import { Spinner } from "@/components/atoms/spinner";
import { ReplyToggleRow } from "@/components/molecules/reply-toggle-row";
import type { CommentItem } from "@/lib/types";
import { cn } from "@/lib/cn";

type RepliesState = {
  items: CommentItem[];
  nextCursor?: string | null;
  isLoading?: boolean;
  isLoaded?: boolean;
  error?: string | null;
};

export function RepliesList({
  parent,
  depth,
  maxDepth = 3,
  repliesState,
  onLoadReplies,
  onLoadMoreReplies,
  renderReply,
  className
}: {
  parent: CommentItem;
  depth: number;
  maxDepth?: number;
  repliesState?: RepliesState;
  onLoadReplies: (commentId: string) => void;
  onLoadMoreReplies: (commentId: string) => void;
  renderReply: (comment: CommentItem, depth: number) => React.ReactNode;
  className?: string;
}) {
  const t = useTranslations("comments");
  const [isOpen, setIsOpen] = useState(false);
  const [expandedDepth, setExpandedDepth] = useState(false);
  const replyCount = parent.replyCount ?? 0;

  if (replyCount === 0) return null;

  if (depth >= maxDepth && !expandedDepth) {
    return (
      <div className={cn("pl-6", className)}>
        <button
          type="button"
          onClick={() => {
            setExpandedDepth(true);
            setIsOpen(true);
            if (!repliesState?.isLoaded) onLoadReplies(parent.id);
          }}
          className="text-xs font-semibold text-brand transition hover:text-brand/80"
        >
          {t("continueThread")}
        </button>
      </div>
    );
  }

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next && !repliesState?.isLoaded) onLoadReplies(parent.id);
  };

  return (
    <div className={cn("pl-6", className)}>
      <ReplyToggleRow
        isOpen={isOpen}
        count={replyCount}
        isLoading={repliesState?.isLoading}
        onToggle={handleToggle}
      />
      {isOpen ? (
        <div className="mt-3 space-y-4 border-l border-primary/10 pl-4">
          {repliesState?.isLoading && (repliesState?.items?.length ?? 0) === 0 ? (
            <div className="flex items-center gap-2 text-xs text-primary/60">
              <Spinner className="h-3 w-3" />
              {t("loadingReplies")}
            </div>
          ) : null}
          {repliesState?.error ? (
            <p className="text-xs text-brand">{repliesState.error}</p>
          ) : null}
          {(repliesState?.items ?? []).map((comment) => (
            <div key={comment.id}>{renderReply(comment, depth)}</div>
          ))}
          {repliesState?.nextCursor ? (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onLoadMoreReplies(parent.id)}
              disabled={repliesState?.isLoading}
            >
              {t("loadMore")}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
