"use client";

import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <Card className="p-8">
      <div className="mx-auto max-w-md text-center">
        <p className="text-base font-semibold text-primary">{title}</p>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-primary/70">{description}</p>
        ) : null}
        {action ? (
          <div className="mt-6 flex justify-center">
            <Button href={action.href}>{action.label}</Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
