import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import type { IconName } from "@/components/atoms/Icon";
import { FeatureCard } from "@/components/molecules/FeatureCard";

export function WhySection({
  id,
  title,
  items
}: {
  id?: string;
  title: string;
  items: ReadonlyArray<{ title: string; description: string; icon: IconName }>;
}) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          title={title}
          subtitle="Most teams don’t have a GTM problem. They have a systems problem."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FeatureCard
              key={item.title}
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
