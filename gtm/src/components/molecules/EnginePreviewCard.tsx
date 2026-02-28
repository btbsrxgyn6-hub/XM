import { Badge } from "@/components/atoms/Badge";
import { Card } from "@/components/atoms/Card";
import { IconMark } from "@/components/atoms/IconMark";

export function EnginePreviewCard() {
  return (
    <Card className="relative overflow-hidden p-6" hover={false}>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(700px circle at 30% 20%, rgba(99,102,241,0.22), transparent 55%), radial-gradient(600px circle at 70% 60%, rgba(15,23,42,0.10), transparent 60%)"
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold tracking-tight text-foreground">
            GTM Engine Blueprint
          </div>
          <Badge className="border-accent/20 bg-accent/5">Week 01</Badge>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3 backdrop-blur">
            <IconMark className="size-10" icon="target" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-foreground">Narrative</div>
              <div className="mt-0.5 text-xs text-muted">
                ICP, outcomes, proof points
              </div>
            </div>
            <div className="ml-auto text-xs font-semibold text-accent">Ready</div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3 backdrop-blur">
            <IconMark className="size-10" icon="layers" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-foreground">Channels</div>
              <div className="mt-0.5 text-xs text-muted">
                Content, outbound, paid loops
              </div>
            </div>
            <div className="ml-auto text-xs font-semibold text-foreground/70">
              In progress
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3 backdrop-blur">
            <IconMark className="size-10" icon="chart" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-foreground">Dashboard</div>
              <div className="mt-0.5 text-xs text-muted">
                Inputs, pipeline, activation
              </div>
            </div>
            <div className="ml-auto text-xs font-semibold text-foreground/70">
              Next
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-center backdrop-blur">
            <div className="text-xs font-semibold text-foreground">7</div>
            <div className="mt-0.5 text-[11px] text-muted">experiments</div>
          </div>
          <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-center backdrop-blur">
            <div className="text-xs font-semibold text-foreground">3</div>
            <div className="mt-0.5 text-[11px] text-muted">channels</div>
          </div>
          <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-center backdrop-blur">
            <div className="text-xs font-semibold text-foreground">1</div>
            <div className="mt-0.5 text-[11px] text-muted">narrative</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

