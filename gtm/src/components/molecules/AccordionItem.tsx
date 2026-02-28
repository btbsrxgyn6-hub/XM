export function AccordionItem({
  question,
  answer,
  defaultOpen
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-2xl border border-border bg-background p-4 shadow-soft transition-colors open:border-accent/30 sm:p-5"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground sm:text-base">
          {question}
        </span>
        <span className="grid size-9 place-items-center rounded-full border border-border bg-surface text-foreground transition-transform group-open:rotate-45 group-open:border-accent/30 group-open:bg-accent/10 group-open:text-accent">
          <span className="text-lg leading-none">+</span>
        </span>
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
        {answer}
      </div>
    </details>
  );
}
