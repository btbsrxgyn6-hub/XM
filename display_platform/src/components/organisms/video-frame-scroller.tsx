'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface VideoFrameScrollerProps {
  count?: number;
  className?: string;
}

export function VideoFrameScroller({ count = 5, className = '' }: VideoFrameScrollerProps) {
  const t = useTranslations();

  const videoFrames = Array.from({ length: count }, (_, i) => (
    <div key={i} className="flex-shrink-0">
      <button
        type="button"
        className="group relative overflow-hidden rounded-2xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
        style={{ width: '200px', height: '112px' }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-surface/5" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                <Play className="h-3 w-3 text-white" />
              </span>
              {t("video.action")}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <span className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur rounded-full px-2 py-1">
              Demo {i + 1}
            </span>
          </div>
        </div>
      </button>
    </div>
  ));

  return (
    <div className={`relative mt-8 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] ${className}`}>
      <div className="flex w-max animate-[marquee-scroll_30s_linear_infinite] gap-6 px-4 hover:[animation-play-state:paused]">
        {videoFrames}
        {videoFrames} {/* 重复一次以实现无缝循环 */}
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