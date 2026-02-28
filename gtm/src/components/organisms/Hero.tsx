import { Badge } from "@/components/atoms/Badge";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { EnginePreviewCard } from "@/components/molecules/EnginePreviewCard";

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  note
}: {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  note: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(900px circle at 50% 12%, rgba(99,102,241,0.16), transparent 60%), radial-gradient(700px circle at 20% 30%, rgba(15,23,42,0.08), transparent 60%), linear-gradient(to bottom, rgba(248,250,252,1), rgba(255,255,255,1))"
        }}
      />
      <Container className="py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Badge className="border-accent/20 bg-accent/5">
              System-first go-to-market
            </Badge>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-balance text-sm leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>

            <ul className="mx-auto mt-6 grid max-w-xl gap-2 text-sm text-muted sm:grid-cols-2 lg:mx-0">
              <li className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon name="target" className="size-4" />
                </span>
                Crisp narrative + proof
              </li>
              <li className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon name="layers" className="size-4" />
                </span>
                Coordinated channel loops
              </li>
              <li className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon name="zap" className="size-4" />
                </span>
                Activation-first conversion
              </li>
              <li className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon name="chart" className="size-4" />
                </span>
                Weekly experiment rhythm
              </li>
            </ul>

            <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto] lg:mx-0">
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Work email"
                aria-label="Work email"
              />
              <ButtonLink
                href={primaryCta.href}
                variant="accent"
                size="lg"
                className="h-12 whitespace-nowrap"
              >
                {primaryCta.label}
              </ButtonLink>
            </div>

            <div className="mx-auto mt-4 flex max-w-xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left lg:mx-0">
              <p className="text-xs text-muted sm:text-sm">{note}</p>
              <ButtonLink href={secondaryCta.href} variant="secondary" size="sm">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg lg:max-w-none">
            <EnginePreviewCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
