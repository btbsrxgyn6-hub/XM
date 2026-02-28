'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VideoPlayer } from '@/components/atoms/video-player';

interface VideoItem {
  id: string;
  src: string;
  poster: string;
  title: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  className?: string;
}

export function VideoCarousel({ videos, className = '' }: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // 自动滚动效果
  useEffect(() => {
    if (isPaused) return;

    const animate = () => {
      setActiveIndex(prev => {
        const nextIndex = (prev + 1) % videos.length;
        return nextIndex;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // 每3秒切换一次
    const interval = setInterval(() => {
      if (!isPaused) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [videos.length, isPaused]);

  const handleMouseEnter = (index: number) => {
    setIsPaused(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // 计算每个视频播放器的位置和样式
  const getVideoStyle = (index: number) => {
    const totalVideos = videos.length;
    const distanceFromActive = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index + totalVideos - activeIndex),
      Math.abs(index - totalVideos - activeIndex)
    );

    const scale = 1 - (distanceFromActive * 0.15);
    const opacity = 1 - (distanceFromActive * 0.3);
    const blur = distanceFromActive * 2;
    const translateX = (index - activeIndex) * 120; // 每个视频之间的间距

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: totalVideos - distanceFromActive,
    };
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={carouselRef}
        className="flex items-center justify-center gap-8 py-8 overflow-visible"
        style={{
          perspective: '1000px',
        }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="transition-all duration-700 ease-out"
            style={getVideoStyle(index)}
          >
            <VideoPlayer
              src={video.src}
              poster={video.poster}
              title={video.title}
              className="w-64" // 调整播放器大小
              isActive={index === activeIndex}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        ))}
      </div>
      
      {/* 导航指示器 */}
      <div className="flex justify-center gap-2 mt-6">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsPaused(true);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-brand w-6' 
                : 'bg-primary/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}