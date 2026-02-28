import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import type { IconName } from "@/components/atoms/Icon";
import { ChannelCard } from "@/components/molecules/ChannelCard";

export function ChannelsSection({
  id,
  title,
  items
}: {
  id?: string;
  title: string;
  items: ReadonlyArray<{ title: string; description: string; icon: IconName }>;
}) {
  return (
    <section id={id} className="border-y border-border bg-surface/60 py-14 sm:py-20">
      <Container>
        <SectionHeading
          title={title}
          subtitle="Orchestrate them around one narrative so each channel reinforces the others."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ChannelCard
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
