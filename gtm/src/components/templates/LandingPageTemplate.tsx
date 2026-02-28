import { landingContent } from "@/lib/landing";

import { AccordionSection } from "@/components/organisms/AccordionSection";
import { ChannelsSection } from "@/components/organisms/ChannelsSection";
import { ComparisonSection } from "@/components/organisms/ComparisonSection";
import { CtaSection } from "@/components/organisms/CtaSection";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { LogoCloudSection } from "@/components/organisms/LogoCloudSection";
import { StatsSection } from "@/components/organisms/StatsSection";
import { StagesSection } from "@/components/organisms/StagesSection";
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection";
import { WhySection } from "@/components/organisms/WhySection";

export function LandingPageTemplate() {
  return (
    <div className="min-h-dvh">
      <Header navItems={landingContent.nav} />
      <main>
        <Hero {...landingContent.hero} />
        <LogoCloudSection {...landingContent.logoCloud} />
        <WhySection id="why" {...landingContent.why} />
        <AccordionSection id="faq" {...landingContent.faq} />
        <StatsSection {...landingContent.stats} />
        <StagesSection id="stages" {...landingContent.stages} />
        <ComparisonSection {...landingContent.comparison} />
        <ChannelsSection id="channels" {...landingContent.channels} />
        <TestimonialsSection {...landingContent.testimonials} />
        <CtaSection id="cta" {...landingContent.cta} />
      </main>
      <Footer {...landingContent.footer} />
    </div>
  );
}
