"use client";

import { cn } from "@/lib/cn";

export type StepperStep = {
  title: string;
};

export function Stepper({
  steps,
  currentStepIndex
}: {
  steps: StepperStep[];
  currentStepIndex: number;
}) {
  const progress =
    steps.length <= 1 ? 0 : (currentStepIndex / (steps.length - 1)) * 100;

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="h-2 w-full rounded-full bg-primary/10" />
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-brand transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="grid gap-3 sm:grid-cols-5">
        {steps.map((step, index) => {
          const state =
            index < currentStepIndex
              ? "complete"
              : index === currentStepIndex
                ? "current"
                : "upcoming";
          return (
            <li key={step.title} className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-2xl text-sm font-semibold ring-1 ring-primary/10",
                  state === "complete"
                    ? "bg-brand/12 text-primary ring-brand/25"
                    : state === "current"
                      ? "bg-brand text-primary"
                      : "bg-surface text-primary/70"
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold",
                  state === "upcoming" ? "text-primary/55" : "text-primary"
                )}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
