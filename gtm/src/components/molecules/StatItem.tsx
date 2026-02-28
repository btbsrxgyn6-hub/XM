import { Card } from "@/components/atoms/Card";

export function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <Card className="px-5 py-4 text-center">
      <div className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-muted sm:text-sm">
        {label}
      </div>
    </Card>
  );
}
