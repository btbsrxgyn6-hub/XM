"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Container } from "@/components/atoms/container";
import { LanguageSwitcher } from "@/components/atoms/language-switcher";
import { LocaleLink } from "@/components/atoms/locale-link";
import { Logo } from "@/components/atoms/logo";
import { NavLinkPill } from "@/components/atoms/nav-link-pill";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { Wordmark } from "@/components/atoms/wordmark";
import { MobileNavSheet } from "@/components/molecules/mobile-nav-sheet";
import { NavDropdown, type NavDropdownItem } from "@/components/molecules/nav-dropdown";
import { useAuth } from "@/lib/hooks/use-auth";
import { stripLocale, withLocale, type AppLocale } from "@/lib/locale";

type DesktopMenu = "resources" | "community" | null;

export function PublicHeader() {
  const rawPathname = usePathname() ?? "/";
  const pathname = stripLocale(rawPathname);
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const { currentUser, isLoading } = useAuth();
  const [openMenu, setOpenMenu] = useState<DesktopMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const resources = useMemo<NavDropdownItem[]>(
    () => [
      { label: t("resources.overview.title"), href: "/resources", description: t("resources.overview.description") },
      { label: t("resources.docs.title"), href: "/resources/docs", description: t("resources.docs.description") },
      { label: t("resources.guides.title"), href: "/resources/guides", description: t("resources.guides.description") },
      { label: t("resources.blog.title"), href: "/resources/blog", description: t("resources.blog.description") },
      { label: t("resources.faq.title"), href: "/resources/faq", description: t("resources.faq.description") }
    ],
    [t]
  );

  const community = useMemo<NavDropdownItem[]>(
    () => [
      { label: t("community.hub.title"), href: "/community", description: t("community.hub.description") },
      { label: t("community.events.title"), href: "/community/events", description: t("community.events.description") },
      { label: t("community.partners.title"), href: "/community/partners", description: t("community.partners.description") },
      { label: t("community.newsletter.title"), href: "/community/newsletter", description: t("community.newsletter.description") }
    ],
    [t]
  );

  const nextPath = withLocale("/console/products/new", locale);
  const launchHref = currentUser
    ? nextPath
    : `${withLocale("/auth/sign-in", locale)}?next=${encodeURIComponent(nextPath)}`;

  useEffect(() => {
    // Close menus when navigating.
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-primary/10 bg-transparent backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <LocaleLink href="/" className="flex items-center gap-2">
          {/* Wordmark image already includes the mark; only show the standalone mark on smaller screens. */}
          <Logo className="lg:hidden" />
          <Wordmark className="hidden lg:block" />
        </LocaleLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLinkPill
            href="/pricing"
            active={pathname === "/pricing" || pathname.startsWith("/pricing/")}
          >
            {t("pricing")}
          </NavLinkPill>
          <NavLinkPill
            href="/case-studies"
            active={pathname === "/case-studies" || pathname.startsWith("/case-studies/")}
          >
            {t("caseStudies")}
          </NavLinkPill>

          <NavDropdown
            label={t("resources.title")}
            items={resources}
            open={openMenu === "resources"}
            onOpenChange={(next) => setOpenMenu(next ? "resources" : null)}
            active={pathname.startsWith("/resources")}
          />
          <NavDropdown
            label={t("community.title")}
            items={community}
            open={openMenu === "community"}
            onOpenChange={(next) => setOpenMenu(next ? "community" : null)}
            active={pathname.startsWith("/community")}
          />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {currentUser ? (
            <>
              <NavLinkPill href="/console" active={pathname.startsWith("/console")}>
                {t("console")}
              </NavLinkPill>
              <NavLinkPill href="/auth/sign-out" active={pathname.startsWith("/auth/sign-out")}>
                {t("signOut")}
              </NavLinkPill>
            </>
          ) : null}

          <LanguageSwitcher />
          <ThemeToggle />

          <Button href={isLoading ? "/launch" : launchHref} size="sm">
            {t("launchProduct")}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-surface/90 backdrop-blur-sm px-3 py-2 text-sm font-semibold text-primary/90 shadow-sm transition hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:hidden"
          aria-label={common("menu.open")}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </button>
      </Container>

      <MobileNavSheet
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        pathname={pathname}
        launchHref={launchHref}
        isAuthed={!!currentUser}
        resources={resources}
        community={community}
      />
    </header>
  );
}
