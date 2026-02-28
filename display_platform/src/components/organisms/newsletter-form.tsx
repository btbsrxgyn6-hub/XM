"use client";

import { useId, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ className }: { className?: string }) {
  const inputId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const t = useTranslations("common");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email })
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.message ?? t("newsletter.error"));
        return;
      }

      setStatus("success");
      setMessage(payload.message ?? t("newsletter.success"));
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage(t("newsletter.unreachable"));
    }
  }

  const isLoading = status === "loading";

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)}>
      <div>
        <label htmlFor={inputId} className="sr-only">
          {t("newsletter.emailLabel")}
        </label>
        <div className="flex gap-2">
          <input
            id={inputId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={t("newsletter.emailPlaceholder")}
            className="w-full rounded-2xl border border-surface/25 bg-surface/10 px-4 py-3 text-sm text-surface placeholder:text-surface/45 outline-none ring-0 transition focus:border-brand/70 focus:bg-surface/15"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-surface shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isLoading ? t("newsletter.joining") : t("newsletter.join")}
          </button>
        </div>
      </div>

      {message ? (
        <p
          className={cn(
            "text-xs",
            status === "success" ? "text-surface/80" : "text-brand"
          )}
          aria-live={status === "error" ? "assertive" : "polite"}
          role={status === "error" ? "alert" : undefined}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
