import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ComparisonCard } from "@/components/molecules/ComparisonCard";

export function ComparisonSection({
  title,
  left,
  right
}: {
  title: string;
  left: { title: string; items: ReadonlyArray<string> };
  right: { title: string; items: ReadonlyArray<string> };
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          title={title}
          subtitle="Operators, not order-takers. We build a system your team can run."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <ComparisonCard title={left.title} items={left.items} />
          <ComparisonCard title={right.title} items={right.items} tone="emphasis" />
        </div>
      </Container>
    </section>
  );
}
