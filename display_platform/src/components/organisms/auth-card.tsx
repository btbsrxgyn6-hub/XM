"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { LocaleLink } from "@/components/atoms/locale-link";
import { FormField } from "@/components/molecules/form-field";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/hooks/use-auth";
import { isValidEmail } from "@/lib/validation";

type Mode = "sign-in" | "sign-up";

export function AuthCard({
  mode,
  onSuccess,
  className
}: {
  mode: Mode;
  onSuccess?: () => void;
  className?: string;
}) {
  const { signIn, signUp } = useAuth();
  const t = useTranslations("auth");
  const validation = useTranslations("validation");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignUp = mode === "sign-up";
  const isLoading = status === "loading";

  function validate() {
    if (isSignUp && !name.trim()) return validation("nameRequired");
    if (!isValidEmail(email)) return validation("emailInvalid");
    if (password.trim().length < 6) return validation("passwordMin");
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setStatus("loading");

    const result = isSignUp
      ? await signUp({ name, email, password })
      : await signIn({ email, password });

    setStatus("idle");
    if (!result.ok) {
      setError(result.message ?? validation("generic"));
      return;
    }

    onSuccess?.();
  }

  return (
    <Card className={cn("p-8", className)}>
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
          {t("consoleEyebrow")}
        </p>
        <h1 className="font-display text-3xl text-primary">
          {isSignUp ? t("titleSignUp") : t("titleSignIn")}
        </h1>
        <p className="text-sm text-primary/60">
          {isSignUp ? t("subtitleSignUp") : t("subtitleSignIn")}
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {isSignUp ? (
          <FormField label={t("fullName")} htmlFor="name" required>
            <Input
              id="name"
              placeholder={t("fullNamePlaceholder")}
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isLoading}
            />
          </FormField>
        ) : null}

        <FormField label={t("email")} htmlFor="email" required>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
          />
        </FormField>

        <FormField label={t("password")} htmlFor="password" required>
          <Input
            id="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
          />
        </FormField>

        {error ? (
          <p className="rounded-2xl bg-brand/10 px-4 py-2 text-sm text-primary ring-1 ring-brand/25">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full">
          {isLoading ? t("pleaseWait") : isSignUp ? t("createAccount") : t("signIn")}
        </Button>

        <p className="text-center text-xs text-primary/60">
          {isSignUp ? t("haveAccount") : t("newToAttrax")}{" "}
          <LocaleLink
            href={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}
            className="font-semibold text-primary hover:text-primary/80"
          >
            {isSignUp ? t("signIn") : t("createOne")}
          </LocaleLink>
        </p>
      </form>
    </Card>
  );
}
