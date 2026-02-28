import type { IconName } from "@/components/atoms/Icon";
import { Card } from "@/components/atoms/Card";
import { IconMark } from "@/components/atoms/IconMark";

export function ChannelCard({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: IconName;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <IconMark className="size-10 rounded-xl" icon={icon} />
        <div>
          <div className="text-sm font-semibold text-foreground sm:text-base">
            {title}
          </div>
          <div className="mt-1 text-sm leading-relaxed text-muted">
            {description}
          </div>
        </div>
      </div>
    </Card>
  );
}
