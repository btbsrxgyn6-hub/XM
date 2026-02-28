import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { AccordionItem } from "@/components/molecules/AccordionItem";

export function AccordionSection({
  id,
  title,
  items
}: {
  id?: string;
  title: string;
  items: ReadonlyArray<{ q: string; a: string }>;
}) {
  return (
    <section id={id} className="border-y border-border bg-surface/60 py-14 sm:py-20">
      <Container>
        <SectionHeading title={title} />
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:gap-4">
          {items.map((item, index) => (
            <AccordionItem
              key={item.q}
              question={item.q}
              answer={item.a}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
