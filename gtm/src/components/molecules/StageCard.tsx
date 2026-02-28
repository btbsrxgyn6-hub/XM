import type { IconName } from "@/components/atoms/Icon";
import { Card } from "@/components/atoms/Card";
import { IconMark } from "@/components/atoms/IconMark";

export function StageCard({
  step,
  title,
  description,
  icon
}: {
  step: string;
  title: string;
  description: string;
  icon: IconName;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconMark className="size-10" icon={icon} />
          <div className="text-sm font-semibold text-foreground">{title}</div>
        </div>
        <div className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent shadow-soft">
          {step}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
    </Card>
  );
}
