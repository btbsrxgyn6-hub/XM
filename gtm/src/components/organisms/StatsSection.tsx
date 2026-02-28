import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { StatItem } from "@/components/molecules/StatItem";

export function StatsSection({
  title,
  items
}: {
  title: string;
  items: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={title} />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <StatItem key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
