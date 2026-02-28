'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function VideoPlayer({
  src,
  poster,
  title,
  className = '',
  style = {},
  isActive = false,
  onMouseEnter,
  onMouseLeave
}: VideoPlayerProps) {
  const t = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isHovered) {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const combinedStyle: React.CSSProperties = {
    ...style,
    transition: 'all 0.5s ease-out'
  };

  return (
    <div 
      className={`relative group transition-all duration-500 ${className} ${
        isActive 
          ? 'scale-110 blur-0 z-10' 
          : 'scale-100 blur-sm opacity-70'
      }`}
      style={combinedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/10 dark:border-primary/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        {poster && (
          <Image
            src={poster}
            alt={title || 'Video thumbnail'}
            fill
            className="object-cover transition-opacity duration-300"
            style={{ opacity: isPlaying ? 0 : 1 }}
          />
        )}
        
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 grid place-items-center transition-transform duration-300 group-hover:scale-110"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur px-4 py-2 text-sm font-semibold text-white">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                          <Play className="h-4 w-4 text-white" />
                        </span>
                        {title || t('video.action')}
                      </span>
          </button>
        )}
        
        {isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute bottom-4 right-4 grid place-items-center rounded-full bg-black/50 backdrop-blur p-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          >
            <Pause className="h-4 w-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}