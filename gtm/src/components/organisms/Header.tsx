import { ButtonLink } from "@/components/atoms/ButtonLink";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { NavLinks } from "@/components/molecules/NavLinks";

export function Header({
  navItems
}: {
  navItems: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <NavLinks items={navItems} className="hidden md:flex" />
        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/#cta" variant="ghost">
            Book a call
          </ButtonLink>
          <ButtonLink href="/#cta" variant="accent">
            Get the playbook
          </ButtonLink>
        </div>

        <details className="group relative md:hidden">
          <summary className="list-none rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-soft">
            Menu
          </summary>
          <div className="absolute right-0 top-12 mt-2 w-72 rounded-2xl border border-border bg-background p-4 shadow-soft">
            <NavLinks items={navItems} className="flex-col items-start gap-4" />
            <div className="mt-4">
              <div className="grid gap-2">
                <ButtonLink href="/#cta" variant="accent" className="w-full">
                  Get the playbook
                </ButtonLink>
                <ButtonLink href="/#cta" variant="secondary" className="w-full">
                  Book a call
                </ButtonLink>
              </div>
            </div>
          </div>
        </details>
      </Container>
    </header>
  );
}
