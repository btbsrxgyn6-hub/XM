import { ButtonLink } from "@/components/atoms/ButtonLink";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";

export function TestimonialsSection({
  title,
  subtitle,
  items
}: {
  title: string;
  subtitle: string;
  items: ReadonlyArray<{ quote: string; name: string; role: string; company: string }>;
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/#cta" variant="secondary" size="lg">
            Get the playbook
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
