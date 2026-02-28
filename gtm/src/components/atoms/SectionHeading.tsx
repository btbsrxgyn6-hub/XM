import { cx } from "@/lib/cx";

export function SectionHeading({
  title,
  subtitle,
  className
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto max-w-2xl text-center", className)}>
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <div
        className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden="true"
      />
      {subtitle ? (
        <p className="mt-3 text-balance text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
