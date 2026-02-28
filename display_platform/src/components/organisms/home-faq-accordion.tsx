"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type HomeFaqItem = {
  q: string;
  a: string;
};

export function HomeFaqAccordion({ items }: { items: HomeFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto mt-7 max-w-3xl space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article
            key={item.q}
            className="rounded-2xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-surface/5 p-4 transition hover:-translate-y-0.5 motion-safe:animate-[fade-up_700ms_ease-out_both]"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-primary/90 sm:text-base">{item.q}</span>
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/10 dark:border-primary/20 bg-primary/8 dark:bg-surface/8 text-primary/70 transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                isOpen ? "[grid-template-rows:1fr] opacity-100" : "[grid-template-rows:0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`mt-3 text-sm leading-relaxed text-primary/72 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                    isOpen ? "translate-y-0 opacity-100 delay-75" : "-translate-y-1.5 opacity-75 delay-0"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
