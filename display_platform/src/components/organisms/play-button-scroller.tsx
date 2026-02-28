'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PlayButtonScrollerProps {
  count?: number;
  className?: string;
}

export function PlayButtonScroller({ count = 8, className = '' }: PlayButtonScrollerProps) {
  const t = useTranslations();

  const playButtons = Array.from({ length: count }, (_, i) => (
    <div key={i} className="flex-shrink-0">
      <button
        type="button"
        className="group relative overflow-hidden rounded-full border border-primary/15 dark:border-primary/25 bg-primary/10 dark:bg-surface/10 px-3 py-2 text-xs font-semibold backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-primary/20 dark:hover:bg-surface/20"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-gradient">
            <Play className="h-2.5 w-2.5" />
          </span>
          {t("video.action")}
        </span>
      </button>
    </div>
  ));

  return (
    <div className={`relative mt-8 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] ${className}`}>
      <div className="flex w-max animate-[marquee-scroll_24s_linear_infinite] gap-4 px-4 hover:[animation-play-state:paused]">
        {playButtons}
        {playButtons} {/* 重复一次以实现无缝循环 */}
      </div>
      
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}