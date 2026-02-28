import { Container } from "@/components/atoms/Container";
import { LogoPill } from "@/components/molecules/LogoPill";

export function LogoCloudSection({
  title,
  logos
}: {
  title: string;
  logos: ReadonlyArray<string>;
}) {
  return (
    <section className="border-b border-border bg-background/60 py-10 backdrop-blur sm:py-14">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {title}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {logos.map((name) => (
            <LogoPill key={name} name={name} />
          ))}
        </div>
      </Container>
    </section>
  );
}
