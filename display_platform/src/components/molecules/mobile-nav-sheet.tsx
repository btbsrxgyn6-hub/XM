"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { ChevronIcon } from "@/components/atoms/chevron-icon";
import { LanguageSwitcher } from "@/components/atoms/language-switcher";
import { LocaleLink } from "@/components/atoms/locale-link";
import { NavLinkPill } from "@/components/atoms/nav-link-pill";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import type { NavDropdownItem } from "@/components/molecules/nav-dropdown";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/cn";

export function MobileNavSheet({
  open,
  onOpenChange,
  pathname,
  launchHref,
  isAuthed,
  resources,
  community
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  pathname: string;
  launchHref: string;
  isAuthed: boolean;
  resources: NavDropdownItem[];
  community: NavDropdownItem[];
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const t = useTranslations("nav");
  const common = useTranslations("common");

  useEffect(() => {
    if (!open) return;
    setResourcesOpen(false);
    setCommunityOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button as the first focusable control.
    closeButtonRef.current?.focus();

    function getFocusable() {
      const root = panelRef.current;
      if (!root) return [] as HTMLElement[];
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex="0"]'
        )
      );
      return nodes.filter((node) => !node.hasAttribute("disabled"));
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = getFocusable();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !panelRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [open, onOpenChange]);

  const topLinks = useMemo(() => {
    return [
      { label: t("pricing"), href: "/pricing" },
      { label: t("caseStudies"), href: "/case-studies" }
    ];
  }, [t]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label={common("menu.close")}
        className="absolute inset-0 bg-primary/40"
        onClick={() => onOpenChange(false)}
      />

      <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="absolute right-0 top-0 h-full w-[88vw] max-w-sm border-l border-primary/10 bg-surface/95 backdrop-blur-md shadow-card"
        >
        <div className="flex items-center justify-between border-b border-primary/10 px-4 py-4">
          <p className="text-sm font-semibold text-primary">{common("menu.title")}</p>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-full border border-primary/10 bg-surface px-3 py-2 text-sm font-semibold text-primary/70 transition hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={() => onOpenChange(false)}
          >
            {common("menu.close")}
          </button>
        </div>

        <div className="space-y-6 px-4 py-5">
          <div className="flex flex-col gap-2">
            {topLinks.map((item) => (
              <NavLinkPill
                key={item.href}
                href={item.href}
                active={pathname === item.href || pathname.startsWith(item.href + "/")}
                className="justify-start"
                onClick={() => onOpenChange(false)}
              >
                {item.label}
              </NavLinkPill>
            ))}
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-full border border-primary/10 bg-surface px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                pathname.startsWith("/resources") ? "ring-1 ring-brand/25" : ""
              )}
              onClick={() => {
                setResourcesOpen((prev) => !prev);
                setCommunityOpen(false);
              }}
              aria-expanded={resourcesOpen}
            >
              <span>{t("resources.title")}</span>
              <ChevronIcon className={resourcesOpen ? "rotate-180" : ""} />
            </button>
            {resourcesOpen ? (
              <div className="flex flex-col gap-1 rounded-3xl border border-primary/10 bg-surface/70 p-2">
                {resources.map((item) => (
                  <LocaleLink
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-3 py-2 text-sm text-primary/70 transition hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    onClick={() => onOpenChange(false)}
                  >
                    {item.label}
                  </LocaleLink>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-full border border-primary/10 bg-surface px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                pathname.startsWith("/community") ? "ring-1 ring-brand/25" : ""
              )}
              onClick={() => {
                setCommunityOpen((prev) => !prev);
                setResourcesOpen(false);
              }}
              aria-expanded={communityOpen}
            >
              <span>{t("community.title")}</span>
              <ChevronIcon className={communityOpen ? "rotate-180" : ""} />
            </button>
            {communityOpen ? (
              <div className="flex flex-col gap-1 rounded-3xl border border-primary/10 bg-surface/70 p-2">
                {community.map((item) => (
                  <LocaleLink
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-3 py-2 text-sm text-primary/70 transition hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    onClick={() => onOpenChange(false)}
                  >
                    {item.label}
                  </LocaleLink>
                ))}
              </div>
            ) : null}
          </div>

          {isAuthed ? (
            <div className="grid grid-cols-2 gap-2">
              <NavLinkPill
                href="/console"
                active={pathname.startsWith("/console")}
                className="justify-center border border-primary/10 bg-surface text-primary/80 hover:bg-primary/5"
                onClick={() => onOpenChange(false)}
              >
                {t("console")}
              </NavLinkPill>
              <NavLinkPill
                href="/auth/sign-out"
                active={pathname.startsWith("/auth/sign-out")}
                className="justify-center border border-primary/10 bg-surface text-primary/80 hover:bg-primary/5"
                onClick={() => onOpenChange(false)}
              >
                {t("signOut")}
              </NavLinkPill>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <div className="pt-2">
            <Button href={launchHref} className="w-full justify-center">
              {t("launchProduct")}
            </Button>
            <p className="mt-2 text-xs text-primary/60">
              {t("launchHint")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
