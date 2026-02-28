'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GradualBlurProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: boolean;
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  target?: 'parent' | 'page';
  className?: string;
  style?: React.CSSProperties;
}

const CURVE_FUNCTIONS = {
  linear: (p: number) => p,
  bezier: (p: number) => p * p * (3 - 2 * p),
  'ease-in': (p: number) => p * p,
  'ease-out': (p: number) => 1 - Math.pow(1 - p, 2),
  'ease-in-out': (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const getGradientDirection = (position: string) =>
  ({
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  })[position] || 'to bottom';

export function GradualBlur({
  position = 'bottom',
  strength = 2,
  height = '6rem',
  divCount = 5,
  exponential = false,
  zIndex = 1000,
  animated = false,
  duration = '0.3s',
  easing = 'ease-out',
  opacity = 1,
  curve = 'linear',
  responsive = false,
  target = 'parent',
  className = '',
  style = {}
}: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [responsiveHeight, setResponsiveHeight] = useState(height);

  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      const width = window.innerWidth;
      let newHeight = height;
      
      if (width <= 480) {
        newHeight = '4rem';
      } else if (width <= 768) {
        newHeight = '5rem';
      }
      
      setResponsiveHeight(newHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive, height]);

  const finalHeight = responsive ? responsiveHeight : height;
  const curveFunction = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear;
  const gradientDirection = getGradientDirection(position);

  const generateLayers = () => {
    const layers = [];
    const step = 1 / divCount;

    for (let i = 0; i < divCount; i++) {
      const progress = i * step;
      const curvedProgress = curveFunction(progress);
      const blurStrength = exponential 
        ? Math.pow(curvedProgress, strength) * 10
        : curvedProgress * strength * 5;
      
      const layerOpacity = curvedProgress * opacity;

      layers.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            [position]: 0,
            left: 0,
            right: 0,
            height: finalHeight,
            backdropFilter: `blur(${blurStrength}px)`,
            WebkitBackdropFilter: `blur(${blurStrength}px)`,
            maskImage: `linear-gradient(${gradientDirection}, rgba(0,0,0,${layerOpacity}), transparent)`,
            WebkitMaskImage: `linear-gradient(${gradientDirection}, rgba(0,0,0,${layerOpacity}), transparent)`,
            zIndex: zIndex + i,
            transition: animated ? `all ${duration} ${easing}` : 'none'
          }}
          className={className}
        />
      );
    }

    return layers;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: target === 'page' ? 'fixed' : 'absolute',
        [position]: 0,
        left: 0,
        right: 0,
        height: finalHeight,
        pointerEvents: 'none',
        zIndex,
        ...style
      }}
    >
      {generateLayers()}
    </div>
  );
}