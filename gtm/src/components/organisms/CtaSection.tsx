import { Badge } from "@/components/atoms/Badge";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { Container } from "@/components/atoms/Container";

export function CtaSection({
  id,
  title,
  subtitle,
  primaryCta,
  secondaryCta
}: {
  id?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-10 text-background shadow-soft sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(700px circle at 20% 20%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(700px circle at 80% 30%, rgba(255,255,255,0.14), transparent 60%)"
            }}
          />
          <div className="relative">
            <Badge className="border-background/20 bg-background/10 text-background shadow-none">
              Get the roadmap
            </Badge>
            <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-background/80 sm:text-base">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={primaryCta.href}
                variant="accent"
                size="lg"
              >
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={secondaryCta.href}
                variant="ghost"
                size="lg"
                className="border border-background/20 text-background hover:bg-background/10"
              >
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
