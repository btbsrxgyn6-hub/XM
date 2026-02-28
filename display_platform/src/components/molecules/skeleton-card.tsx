"use client";

import { Card } from "@/components/atoms/card";

export function SkeletonCard() {
  return (
    <Card className="animate-pulse p-5">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-primary/10" />
          <div className="space-y-2">
            <div className="h-3 w-32 rounded-full bg-primary/10" />
            <div className="h-2 w-24 rounded-full bg-primary/10" />
          </div>
        </div>
        <div className="h-3 w-3/4 rounded-full bg-primary/10" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-primary/10" />
          <div className="h-6 w-20 rounded-full bg-primary/10" />
          <div className="h-6 w-14 rounded-full bg-primary/10" />
        </div>
        <div className="h-8 w-24 rounded-full bg-primary/10" />
      </div>
    </Card>
  );
}
