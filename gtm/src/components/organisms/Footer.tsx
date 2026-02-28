import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";

export function Footer({
  columns
}: {
  columns: ReadonlyArray<{
    title: string;
    links: ReadonlyArray<{ label: string; href: string }>;
  }>;
}) {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              A coordinated GTM system for AI companies: positioning, channels, and
              conversion that compounds.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold text-foreground">
                  {col.title}
                </div>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Company Name. All rights reserved.</div>
        </div>
      </Container>
    </footer>
  );
}
