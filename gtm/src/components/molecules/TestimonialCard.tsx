import { Avatar } from "@/components/atoms/Avatar";
import { Card } from "@/components/atoms/Card";
import { Icon } from "@/components/atoms/Icon";

export function TestimonialCard({
  quote,
  name,
  role,
  company
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
          <Icon name="sparkles" className="size-4 text-accent" />
          <span>Founder quote</span>
        </div>
        <div className="text-xs text-muted">Verified</div>
      </div>
      <p className="mt-4 text-balance text-sm leading-relaxed text-foreground">
        “{quote}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar name={name} />
        <div>
          <div className="text-sm font-semibold text-foreground">{name}</div>
          <div className="text-xs text-muted">
            {role} · {company}
          </div>
        </div>
      </div>
    </Card>
  );
}

