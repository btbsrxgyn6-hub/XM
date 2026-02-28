import Image from "next/image";
import { Ban, Check, CheckCircle2, ChevronDown, Play } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { Button } from "@/components/atoms/button";
import { ColorBends } from "@/components/atoms/color-bends";
import { Container } from "@/components/atoms/container";
import { GradualBlur } from "@/components/atoms/gradual-blur";
import { SplitText } from "@/components/atoms/split-text";
import { SpotlightCard } from "@/components/atoms/spotlight-card";
import { PlayButtonScroller } from "@/components/organisms/play-button-scroller";
import { VideoFrameScroller } from "@/components/organisms/video-frame-scroller";
import { Logo } from "@/components/atoms/logo";
import { HomeFaqAccordion } from "@/components/organisms/home-faq-accordion";
import { HotProductsSection } from "@/components/organisms/hot-products-section";
import { NewsletterForm } from "@/components/organisms/newsletter-form";
import { PublicLayout } from "@/components/templates/public-layout";
import { withLocale, type AppLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { locale: AppLocale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "home" });

  return buildPageMetadata({
    title: t("hero.title"),
    description: t("hero.subtitle"),
    path: withLocale("/", params.locale)
  });
}

export default async function HomePage() {
  const t = await getTranslations("home");

  const builderBullets = [
    t("why.builders.bullets.seed"),
    t("why.builders.bullets.validate"),
    t("why.builders.bullets.cta")
  ];
  const userBullets = [
    t("why.users.bullets.lifetime"),
    t("why.users.bullets.earlyBird"),
    t("why.users.bullets.quality")
  ];
  const productHuntPoints = [
    t("comparison.cards.productHunt.points.1"),
    t("comparison.cards.productHunt.points.2"),
    t("comparison.cards.productHunt.points.3"),
    t("comparison.cards.productHunt.points.4")
  ];
  const kickstarterPoints = [
    t("comparison.cards.kickstarter.points.1"),
    t("comparison.cards.kickstarter.points.2"),
    t("comparison.cards.kickstarter.points.3"),
    t("comparison.cards.kickstarter.points.4")
  ];
  const attraxPoints = [
    t("comparison.cards.attrax.points.1"),
    t("comparison.cards.attrax.points.2"),
    t("comparison.cards.attrax.points.3"),
    t("comparison.cards.attrax.points.4")
  ];
  const testimonials = [
    {
      quote: t("testimonials.items.maya.quote"),
      name: t("testimonials.items.maya.name"),
      role: t("testimonials.items.maya.role")
    },
    {
      quote: t("testimonials.items.derek.quote"),
      name: t("testimonials.items.derek.name"),
      role: t("testimonials.items.derek.role")
    },
    {
      quote: t("testimonials.items.sana.quote"),
      name: t("testimonials.items.sana.name"),
      role: t("testimonials.items.sana.role")
    },
    {
      quote: t("testimonials.items.leo.quote"),
      name: t("testimonials.items.leo.name"),
      role: t("testimonials.items.leo.role")
    },
    {
      quote: t("testimonials.items.aarav.quote"),
      name: t("testimonials.items.aarav.name"),
      role: t("testimonials.items.aarav.role")
    }
  ];
  const steps = [
    { id: "1", title: t("workflow.steps.build.title"), text: t("workflow.steps.build.text") },
    { id: "2", title: t("workflow.steps.launch.title"), text: t("workflow.steps.launch.text") },
    { id: "3", title: t("workflow.steps.measure.title"), text: t("workflow.steps.measure.text") },
    { id: "4", title: t("workflow.steps.scale.title"), text: t("workflow.steps.scale.text") }
  ];
  const trustedTeams = [
    { name: "Signal", logo: "https://icon.horse/icon/signal.org" },
    { name: "Discord", logo: "https://icon.horse/icon/discord.com" },
    { name: "Apple", logo: "https://icon.horse/icon/apple.com" },
    { name: "Meta", logo: "https://icon.horse/icon/meta.com" }
  ];
  const waitlistBenefits = [
    t("waitlist.benefits.1"),
    t("waitlist.benefits.2"),
    t("waitlist.benefits.3"),
    t("waitlist.benefits.4")
  ];
  const footerColumns = [
    {
      title: t("footer.resources.title"),
      links: [
        { label: t("footer.resources.links.blog"), href: "#" },
        { label: t("footer.resources.links.partner"), href: "#" },
        { label: t("footer.resources.links.hackathon"), href: "#" }
      ]
    },
    {
      title: t("footer.company.title"),
      links: [
        { label: t("footer.company.links.contact"), href: "#" },
        { label: t("footer.company.links.careers"), href: "#" }
      ]
    },
    {
      title: t("footer.product.title"),
      links: [{ label: t("footer.product.links.gtm"), href: "https://gtm.attax.ai" }]
    }
  ];
  const faqs = [
    {
      q: t("faq.items.1.q"),
      a: t("faq.items.1.a")
    },
    {
      q: t("faq.items.2.q"),
      a: t("faq.items.2.a")
    },
    {
      q: t("faq.items.3.q"),
      a: t("faq.items.3.a")
    },
    {
      q: t("faq.items.4.q"),
      a: t("faq.items.4.a")
    }
  ];
  return (
    <PublicLayout container={false}>
      {/* Fixed Background Canvas */}
      <div className="fixed inset-0 z-0">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
          autoRotate={0}
        />
      </div>
      
      {/* Scrollable Content */}
      <main className="relative z-10 text-primary">
        <section className="relative min-h-screen flex items-center">
          <Container className="relative flex min-h-[calc(100vh-4rem)] items-center pb-16 pt-14 lg:pb-20 lg:pt-20 bg-transparent">
            <div className="mx-auto max-w-3xl text-center bg-transparent">
              <SplitText
                text={t("hero.title")}
                className="font-display text-4xl leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                tag="h1"
              />
              <SplitText
                text={t("hero.subtitle")}
                className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-primary/75 sm:text-base"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                tag="p"
              />

              <div
                className="mt-8 flex flex-wrap items-center justify-center gap-3 motion-safe:animate-[fade-up_760ms_ease-out_both]"
                style={{ animationDelay: "240ms" }}
              >
                <Button href="/launch" className="px-6">
                  {t("hero.actions.launch")}
                </Button>
                <a
                  href="#why"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 dark:border-primary/25 bg-primary/10 dark:bg-surface/10 px-5 py-3 text-sm font-semibold text-primary/80 transition hover:bg-primary/15 dark:hover:bg-surface/15"
                >
                  {t("hero.scroll")}
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </div>

          </Container>
        </section>

        <section id="why" className="py-16 relative z-10">
          <Container>
            <div className="mx-auto max-w-2xl text-center bg-transparent">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                {t("why.title")}
              </h2>
              <p className="mt-3 text-sm text-primary/70 sm:text-base">
                {t("why.subtitle")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <SpotlightCard 
                className="rounded-3xl border border-primary/10 dark:border-primary/20 bg-surface/90 backdrop-blur-sm p-7 motion-safe:animate-[fade-up_700ms_ease-out_both]"
                spotlightColor="rgba(255, 92, 122, 0.2)"
              >
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/55 leading-tight">
                    {t("why.builders.eyebrow")}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-primary leading-tight">
                    {t("why.builders.title")}
                  </h3>
                  <ul className="space-y-3 text-sm text-primary/78">
                    {builderBullets.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>

              <SpotlightCard
                className="rounded-3xl border border-primary/10 dark:border-primary/20 bg-surface/90 backdrop-blur-sm p-7 motion-safe:animate-[fade-up_700ms_ease-out_both]"
                spotlightColor="rgba(138, 92, 255, 0.2)"
                style={{ animationDelay: "90ms" }}
              >
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/65 leading-tight">
                    {t("why.users.eyebrow")}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-primary leading-tight">
                    {t("why.users.title")}
                  </h3>
                  <ul className="space-y-3 text-sm text-primary/84">
                    {userBullets.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 dark:bg-surface/15 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </div>
          </Container>
        </section>

        <section id="video" className="py-16">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/55">
              {t("video.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              {t("video.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-primary/70 sm:text-base">
              {t("video.subtitle")}
            </p>

            <div className="mx-auto mt-7 grid max-w-5xl gap-4">
               {/* 视频框架滚动 */}
               <VideoFrameScroller count={5} className="motion-safe:animate-[fade-up_700ms_ease-out_both]" />
             </div>
          </Container>
        </section>

        <section id="comparison" className="py-16">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 dark:border-primary/20 bg-[linear-gradient(145deg,rgba(238,243,252,0.96),rgba(228,236,248,0.98))] p-6 dark:bg-[linear-gradient(145deg,rgba(15,24,39,0.9),rgba(11,15,24,0.97))] lg:p-8">
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/12 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -right-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
              />

              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                  {t("comparison.title")}
                </h2>
                <p className="mt-3 text-sm text-primary/70 sm:text-base">
                  {t("comparison.subtitle")}
                </p>
              </div>

              <div className="relative mt-8 grid gap-4 lg:grid-cols-3">
                <article
                  className="h-full rounded-3xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 p-5 shadow-[0_14px_24px_rgba(4,7,12,0.24)] transition hover:-translate-y-0.5 motion-safe:animate-[fade-up_700ms_ease-out_both]"
                  style={{ animationDelay: "40ms" }}
                >
                  <div className="min-h-[74px]">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/18 text-brand">
                        <Ban className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-lg font-semibold">{t("comparison.cards.productHunt.title")}</p>
                        <p className="text-sm text-primary/62">{t("comparison.cards.productHunt.note")}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {productHuntPoints.map((point) => (
                      <li
                        key={point}
                        className="flex min-h-11 items-center gap-2 rounded-xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 px-3 py-2 text-sm text-primary/58"
                      >
                        <Ban className="h-4 w-4 shrink-0 text-brand/85" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article
                  className="h-full rounded-3xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 p-5 shadow-[0_14px_24px_rgba(4,7,12,0.24)] transition hover:-translate-y-0.5 motion-safe:animate-[fade-up_700ms_ease-out_both]"
                  style={{ animationDelay: "120ms" }}
                >
                  <div className="min-h-[74px]">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/18 text-brand">
                        <Ban className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-lg font-semibold">{t("comparison.cards.kickstarter.title")}</p>
                        <p className="text-sm text-primary/62">{t("comparison.cards.kickstarter.note")}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {kickstarterPoints.map((point) => (
                      <li
                        key={point}
                        className="flex min-h-11 items-center gap-2 rounded-xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 px-3 py-2 text-sm text-primary/58"
                      >
                        <Ban className="h-4 w-4 shrink-0 text-brand/85" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article
                  className="relative h-full rounded-3xl border border-emerald-700/25 bg-[linear-gradient(165deg,rgba(216,245,236,0.92),rgba(224,247,241,0.95))] p-5 shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_12px_28px_rgba(4,8,18,0.08)] transition hover:-translate-y-0.5 dark:border-emerald-300/35 dark:bg-[linear-gradient(165deg,rgba(20,43,41,0.9),rgba(15,27,30,0.95))] dark:shadow-[0_0_0_1px_rgba(110,231,183,0.22),0_22px_42px_rgba(8,14,20,0.36)] motion-safe:animate-[fade-up_700ms_ease-out_both]"
                  style={{ animationDelay: "200ms" }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl"
                  />
                  <div className="min-h-[74px]">
                    <div className="mb-3 inline-flex rounded-full border border-emerald-700/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-300/12 dark:text-emerald-200">
                      {t("comparison.cards.attrax.badge")}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-lg font-semibold">{t("comparison.cards.attrax.title")}</p>
                        <p className="text-sm text-primary/78">{t("comparison.cards.attrax.note")}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm text-primary/86">
                    {attraxPoints.map((point) => (
                      <li
                        key={point}
                        className="flex min-h-11 items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/8 px-3 py-2"
                      >
                        <Check className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_220px_at_20%_10%,rgba(255,101,81,0.12),transparent_65%),radial-gradient(700px_240px_at_80%_12%,rgba(56,189,248,0.12),transparent_70%)]"
          />
          <Container>
            <div className="relative text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/55">{t("testimonials.eyebrow")}</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{t("testimonials.title")}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-primary/68 sm:text-base">
                {t("testimonials.subtitle")}
              </p>
            </div>
          </Container>

          <div className="relative mt-8 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
            <div className="flex w-max animate-[marquee-scroll_36s_linear_infinite] gap-4 px-4 hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((item, index) => (
                <article
                  key={`lane-a-${item.name}-${index}`}
                  className="w-[380px] rounded-2xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5"
                >
                  <div className="mb-2 inline-flex items-center rounded-full border border-amber-200/25 bg-amber-200/10 px-2.5 py-1">
                    <span className="text-xs tracking-[0.2em] text-amber-200/95">★★★★★</span>
                  </div>
                  <p className="leading-relaxed text-primary/86">
                    <span>&ldquo;{item.quote}&rdquo;</span>
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-primary/58">
                    <span className="font-semibold text-primary/92">{item.name}</span>
                    <span className="mx-2 text-primary/40">•</span>
                    <span>{item.role}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HotProductsSection />

        <section className="py-16">
          <Container>
            <div className="rounded-3xl bg-[linear-gradient(145deg,rgba(245,247,252,0.03),rgba(255,255,255,0.015))] p-5 shadow-[0_24px_56px_rgba(3,8,18,0.42),inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6 lg:p-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/55">{t("gtm.eyebrow")}</p>
                <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{t("gtm.title")}</h2>
              </div>

              <div className="mt-8 space-y-20">
                <div className="grid items-center gap-6 lg:grid-cols-2">
                  <div className="relative h-40 rounded-3xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(140deg,rgba(76,132,233,0.22),rgba(16,24,40,0.08))] p-4 motion-safe:animate-[fade-up_700ms_ease-out_both]">
                    <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] bg-[length:220%_100%] motion-safe:animate-[shimmer-x_4s_linear_infinite]" />
                    <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-brand" />
                  </div>
                  <div className="motion-safe:animate-[fade-up_700ms_ease-out_both]" style={{ animationDelay: "80ms" }}>
                    <h3 className="inline-block text-2xl font-semibold tracking-tight">
                      {t("gtm.affiliate.title")}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm text-primary/72">{t("gtm.affiliate.subtitle")}</p>
                  </div>
                </div>

                <div className="grid items-center gap-6 lg:grid-cols-2">
                  <div className="order-2 motion-safe:animate-[fade-up_700ms_ease-out_both] lg:order-1" style={{ animationDelay: "120ms" }}>
                    <h3 className="inline-block text-2xl font-semibold tracking-tight">
                      {t("gtm.vetting.title")}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm text-primary/72">{t("gtm.vetting.subtitle")}</p>
                  </div>
                  <div className="order-1 relative h-40 rounded-3xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(140deg,rgba(52,211,153,0.18),rgba(20,36,34,0.10))] p-4 motion-safe:animate-[fade-up_700ms_ease-out_both] lg:order-2" style={{ animationDelay: "180ms" }}>
                    <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] bg-[length:220%_100%] motion-safe:animate-[shimmer-x_4s_linear_infinite]" />
                    <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-emerald-300" />
                  </div>
                </div>

                <div className="grid items-center gap-6 lg:grid-cols-2">
                  <div className="relative h-40 rounded-3xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(140deg,rgba(232,121,249,0.16),rgba(34,20,40,0.10))] p-4 motion-safe:animate-[fade-up_700ms_ease-out_both]" style={{ animationDelay: "220ms" }}>
                    <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] bg-[length:220%_100%] motion-safe:animate-[shimmer-x_4s_linear_infinite]" />
                    <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-fuchsia-300" />
                  </div>
                  <div className="motion-safe:animate-[fade-up_700ms_ease-out_both]" style={{ animationDelay: "260ms" }}>
                    <h3 className="inline-block text-2xl font-semibold tracking-tight">
                      {t("gtm.pricing.title")}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm text-primary/72">{t("gtm.pricing.subtitle")}</p>
                  </div>
                </div>

                <div className="mx-auto max-w-md rounded-3xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(145deg,rgba(70,120,220,0.14),rgba(16,24,40,0.10))] p-6 text-center motion-safe:animate-[fade-up_700ms_ease-out_both]" style={{ animationDelay: "320ms" }}>
                  <h3 className="font-display text-3xl tracking-tight">{t("gtm.launchpad.title")}</h3>
                  <p className="mt-3 text-sm text-primary/72">{t("gtm.launchpad.subtitle")}</p>
                  <Button href="https://gtm.attax.ai" target="_blank" className="mt-5">
                    {t("gtm.launchpad.cta")}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-primary/10 dark:border-primary/20 pt-8 text-center">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("trusted.title")}
              </h3>
              <p className="mt-2 text-base text-primary/72">
                {t("trusted.subtitle")}
              </p>

              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
                {trustedTeams.map((team) => (
                  <div key={team.name} className="flex flex-col items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-20 w-20 rounded-xl bg-primary/5 dark:bg-surface/5 bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${team.logo})` }}
                    />
                    <span className="text-sm font-semibold text-primary/85">{team.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="waitlist" className="hidden py-16">
          <Container>
            <div className="grid gap-6 rounded-3xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(140deg,rgba(230,236,247,0.95),rgba(220,228,242,0.98))] p-6 dark:bg-[linear-gradient(140deg,rgba(36,55,92,0.42),rgba(13,17,24,0.95))] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/58">{t("waitlist.eyebrow")}</p>
                <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                  {t("waitlist.title")}
                </h2>
                <p className="mt-3 max-w-xl text-sm text-primary/72 sm:text-base">
                  {t("waitlist.subtitle")}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {waitlistBenefits.map((item, index) => (
                    <div
                      key={item}
                      className="flex min-h-14 items-center gap-2 rounded-xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 px-3 py-2.5 text-sm text-primary/82 transition hover:-translate-y-0.5 motion-safe:animate-[fade-up_700ms_ease-out_both]"
                      style={{ animationDelay: `${40 + index * 70}ms` }}
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-brand">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="sm:whitespace-nowrap">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.52),rgba(255,255,255,0.28))] p-5 backdrop-blur dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] lg:p-6">
                <p className="text-sm font-semibold">{t("waitlist.form.title")}</p>
                <p className="mt-2 text-sm text-primary/72">{t("waitlist.form.subtitle")}</p>
                <div className="mt-5">
                  <NewsletterForm />
                </div>
                <p className="mt-4 text-xs text-primary/55">
                  {t("waitlist.note")}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="hidden py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{t("workflow.title")}</h2>
              <p className="mt-3 text-sm text-primary/70 sm:text-base">
                {t("workflow.subtitle")}
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <article
                  key={step.id}
                  className="rounded-3xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 p-5 transition hover:-translate-y-0.5 motion-safe:animate-[fade-up_700ms_ease-out_both]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-primary">
                    {step.id}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-primary/72">{step.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="faq" className="py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{t("faq.title")}</h2>
              <p className="mt-3 text-sm text-primary/70 sm:text-base">
                {t("faq.subtitle")}
              </p>
            </div>

            <HomeFaqAccordion items={faqs} />
          </Container>
        </section>

        <section className="border-t border-primary/10 dark:border-primary/20 py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <Logo className="h-10 w-10" />
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary/70 sm:text-base">
                  {t("footer.blurb")}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary/82 transition hover:text-primary">
                    Twitter
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary/82 transition hover:text-primary">
                    Youtube
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary/82 transition hover:text-primary">
                    Discord
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/58">{column.title}</p>
                    <ul className="mt-5 space-y-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                            className="text-sm font-medium text-primary/78 transition hover:text-primary"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </PublicLayout>
  );
}
