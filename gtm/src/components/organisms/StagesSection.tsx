import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import type { IconName } from "@/components/atoms/Icon";
import { StageCard } from "@/components/molecules/StageCard";

export function StagesSection({
  id,
  title,
  items
}: {
  id?: string;
  title: string;
  items: ReadonlyArray<{ step: string; title: string; description: string; icon: IconName }>;
}) {
  return (
    <section id={id} className="border-y border-border bg-surface/60 py-14 sm:py-20">
      <Container>
        <SectionHeading
          title={title}
          subtitle="A simple, repeatable loop that compounds across the full funnel."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StageCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
