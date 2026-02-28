"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { deleteDraft, getDraft, setDraft as setDraftRemote } from "@/lib/api";
import type { ProductDraft } from "@/lib/types";
import { useAuth } from "@/lib/hooks/use-auth";

type DraftUpdater = ProductDraft | ((prev: ProductDraft | null) => ProductDraft);

export function useDraft(draftKey: string) {
  const { currentUser } = useAuth();
  const [draft, setDraftState] = useState<ProductDraft | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);
  const timerRef = useRef<number | null>(null);
  const localKey = `attrax:draft:${draftKey}`;

  const readLocalDraft = useCallback(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(localKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as ProductDraft;
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch {
      return null;
    }
  }, [localKey]);

  const writeLocalDraft = useCallback((next: ProductDraft | null) => {
    if (typeof window === "undefined") return;
    if (!next) {
      window.localStorage.removeItem(localKey);
      return;
    }
    window.localStorage.setItem(localKey, JSON.stringify(next));
  }, [localKey]);

  useEffect(() => {
    let active = true;
    async function load() {
      setIsRestoring(true);
      const localDraft = readLocalDraft();
      if (localDraft && active) {
        setDraftState(localDraft);
      }
      if (!currentUser) {
        if (active) {
          if (!localDraft) setDraftState(null);
          setIsRestoring(false);
        }
        return;
      }
      try {
        const data = await getDraft(draftKey);
        if (active) {
          if (data) {
            const localUpdated = localDraft?.updatedAt ?? "";
            const remoteUpdated = data.updatedAt ?? "";
            const useRemote = !localDraft || remoteUpdated >= localUpdated;
            const resolved = useRemote ? data : localDraft;
            setDraftState(resolved ?? null);
            if (resolved) writeLocalDraft(resolved);
          } else if (!localDraft) {
            setDraftState(null);
          }
        }
      } catch {
        if (active && !localDraft) {
          setDraftState(null);
        }
      } finally {
        if (active) setIsRestoring(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [draftKey, currentUser, readLocalDraft, writeLocalDraft]);

  useEffect(() => {
    if (isRestoring) return;
    if (!draft) return;

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      writeLocalDraft(draft);
      if (currentUser) {
        void setDraftRemote(draftKey, draft.fields);
      }
    }, 350);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [draft, draftKey, isRestoring, currentUser, writeLocalDraft]);

  function setDraft(updater: DraftUpdater) {
    setDraftState((prev) => (typeof updater === "function" ? updater(prev) : updater));
  }

  function clearDraft() {
    if (currentUser) {
      void deleteDraft(draftKey);
    }
    writeLocalDraft(null);
    setDraftState(null);
  }

  return { draft, setDraft, clearDraft, isRestoring };
}
