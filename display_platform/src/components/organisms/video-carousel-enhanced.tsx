'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VideoPlayer } from '@/components/atoms/video-player';

interface VideoItem {
  id: string;
  src: string;
  poster: string;
  title: string;
}

interface VideoCarouselEnhancedProps {
  videos: VideoItem[];
  className?: string;
  spacing?: number; // 播放器间距，单位px
  baseWidth?: number; // 基础宽度，单位px
  baseHeight?: number; // 基础高度，单位px
}

export function VideoCarouselEnhanced({
  videos,
  className = '',
  spacing = 16,
  baseWidth = 280,
  baseHeight = 160
}: VideoCarouselEnhancedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollIntervalRef = useRef<NodeJS.Timeout>();

  // 持续自动滚动效果
  const startAutoScroll = useCallback(() => {
    if (isPaused || isHovered) return;

    // 使用 requestAnimationFrame 实现持续平滑滚动
    const animateContinuousScroll = () => {
      if (!carouselRef.current || isPaused || isHovered) return;

      const container = carouselRef.current;
      const scrollSpeed = 1; // 滚动速度（像素/帧）
      
      // 持续向右滚动
      container.scrollLeft += scrollSpeed;
      
      // 检查是否滚动到末尾，如果是则平滑重置到开头
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
        container.scrollLeft = 0;
      }
      
      animationRef.current = requestAnimationFrame(animateContinuousScroll);
    };

    animationRef.current = requestAnimationFrame(animateContinuousScroll);
  }, [isPaused, isHovered]);

  // 停止自动滚动
  const stopAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  }, []);

  // 鼠标悬停处理 - 增强版
  const handleMouseEnter = useCallback((index: number) => {
    setIsHovered(true);
    setIsPaused(true);
    setActiveIndex(index);
    stopAutoScroll();
    
    // 立即停止滚动动画
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  }, [stopAutoScroll]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPaused(false);
    
    // 重新启动滚动
    if (!isPaused && !isHovered) {
      startAutoScroll();
    }
  }, [isPaused, isHovered, startAutoScroll]);

  // 启动持续自动滚动
  useEffect(() => {
    if (!isPaused && !isHovered) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [isPaused, isHovered, startAutoScroll, stopAutoScroll]);



  // 计算每个视频播放器的样式 - 增强版
  const getVideoStyle = (index: number) => {
    const isActive = index === activeIndex;
    const distanceFromActive = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index + videos.length - activeIndex),
      Math.abs(index - videos.length - activeIndex)
    );

    // 更平滑的缩放效果
    const scale = isActive ? 1.2 : 1 - (distanceFromActive * 0.15);
    
    // 更自然的透明度过渡
    const opacity = isActive ? 1 : Math.max(0.3, 0.8 - (distanceFromActive * 0.25));
    
    // 更精细的模糊效果
    const blur = isActive ? 0 : distanceFromActive * 3;
    
    // 旋转效果（轻微的角度变化）
    const rotate = isActive ? 0 : (index - activeIndex) * 0.5;
    
    return {
      transform: `scale(${scale}) rotateY(${rotate}deg)`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: isActive ? 20 : videos.length - distanceFromActive,
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transformStyle: 'preserve-3d' as React.CSSProperties['transformStyle'],
    };
  };

  // 示例视频数据
  const sampleVideos: VideoItem[] = [
    {
      id: '1',
      src: '/videos/demo1.mp4',
      poster: '/demo/b713cf7b_showcase.png',
      title: '产品演示1'
    },
    {
      id: '2',
      src: '/videos/demo2.mp4',
      poster: '/demo/b713cf7b_showcase.png',
      title: '产品演示2'
    },
    {
      id: '3',
      src: '/videos/demo3.mp4',
      poster: '/demo/b713cf7b_showcase.png',
      title: '产品演示3'
    },
    {
      id: '4',
      src: '/videos/demo4.mp4',
      poster: '/demo/b713cf7b_showcase.png',
      title: '产品演示4'
    },
    {
      id: '5',
      src: '/videos/demo5.mp4',
      poster: '/demo/b713cf7b_showcase.png',
      title: '产品演示5'
    }
  ];

  const finalVideos = videos.length > 0 ? videos : sampleVideos;

  return (
    <div className={`relative ${className}`}>
      {/* 视频轮播容器 */}
      <div 
        ref={carouselRef}
        className="flex items-center gap-4 py-8 overflow-x-auto scrollbar-hide rounded-2xl border border-primary/10 dark:border-primary/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5"
        style={{
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {finalVideos.map((video, index) => (
          <div
            key={video.id}
            className="flex-shrink-0"
            style={{
              margin: `0 ${spacing / 2}px`,
              scrollSnapAlign: 'center',
            }}
          >
            <div style={getVideoStyle(index)}>
              <VideoPlayer
                src={video.src}
                poster={video.poster}
                title={video.title}
                className=""
                style={{
                  width: `${baseWidth}px`,
                  height: `${baseHeight}px`,
                }}
                isActive={index === activeIndex}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 导航指示器 */}
      <div className="flex justify-center gap-2 mt-6">
        {finalVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsPaused(true);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-brand w-8' 
                : 'bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`跳转到视频 ${index + 1}`}
          />
        ))}
      </div>

      {/* 隐藏滚动条样式 */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
}