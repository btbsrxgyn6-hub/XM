"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

import { IconButton } from "@/components/atoms/icon-button";
import { useTheme } from "@/components/organisms/ThemeProvider";
import { cn } from "@/lib/cn";
import type { Theme } from "@/lib/theme";

const order: Theme[] = ["light", "dark"];

function nextTheme(theme: Theme) {
  const index = order.indexOf(theme);
  const nextIndex = (index + 1) % order.length;
  return order[nextIndex];
}

export function ThemeToggle({
  showLabel = false,
  className
}: {
  showLabel?: boolean;
  className?: string;
}) {
  const t = useTranslations("common");
  const { theme, resolvedTheme, setTheme } = useTheme();
  const label = t(`theme.${theme}`);
  const next = nextTheme(theme);

  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <IconButton
        aria-label={t("theme.toggle")}
        title={t("theme.switchTo", { theme: t(`theme.${next}`) })}
        onClick={() => setTheme(next)}
      >
        <Icon className="h-4 w-4" />
      </IconButton>
      {showLabel ? (
        <span className="text-xs font-semibold text-primary/70">{label}</span>
      ) : null}
    </div>
  );
}
