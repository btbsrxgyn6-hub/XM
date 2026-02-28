'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
  fadeSpeed?: number; // 消失速度系数，值越大消失越快
  minOpacity?: number; // 最小透明度
  maxOpacity?: number; // 最大透明度
  position?: 'fixed' | 'absolute' | 'relative';
  style?: React.CSSProperties;
}

export function ScrollFade({
  children,
  className = '',
  fadeSpeed = 0.1,
  minOpacity = 0,
  maxOpacity = 1,
  position = 'fixed',
  style = {}
}: ScrollFadeProps) {
  const [opacity, setOpacity] = useState(maxOpacity);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const scrollSpeedRef = useRef(0);

  // 计算滚动速度
  const calculateScrollSpeed = useCallback((currentScrollY: number, currentTime: number) => {
    if (lastScrollTimeRef.current === 0) {
      lastScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = currentTime;
      return 0;
    }

    const deltaY = Math.abs(currentScrollY - lastScrollYRef.current);
    const deltaTime = currentTime - lastScrollTimeRef.current;
    
    lastScrollYRef.current = currentScrollY;
    lastScrollTimeRef.current = currentTime;

    // 防止除零错误
    if (deltaTime === 0) return 0;
    
    return deltaY / deltaTime; // 像素/毫秒
  }, []);

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    
    // 计算滚动速度
    const speed = calculateScrollSpeed(currentScrollY, currentTime);
    scrollSpeedRef.current = speed;
    
    // 标记正在滚动
    setIsScrolling(true);
    
    // 根据滚动速度计算透明度
    const speedFactor = Math.min(speed * fadeSpeed, 1); // 限制在0-1之间
    const newOpacity = Math.max(minOpacity, maxOpacity - speedFactor);
    
    setOpacity(newOpacity);
    
    // 清除之前的超时
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // 设置滚动停止检测
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      // 滚动停止时保持当前透明度
    }, 100); // 100毫秒内没有新滚动事件视为停止
  }, [calculateScrollSpeed, fadeSpeed, minOpacity, maxOpacity]);

  // 添加和移除滚动事件监听器
  useEffect(() => {
    // 使用 passive: true 提高滚动性能
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // 平滑过渡效果
  useEffect(() => {
    const element = document.getElementById('scroll-fade-element');
    if (element) {
      element.style.transition = 'opacity 0.3s ease-out';
    }
  }, []);

  // 组合样式
  const combinedStyle: React.CSSProperties = {
    position,
    top: 0,
    left: 0,
    right: 0,
    opacity,
    pointerEvents: opacity < 0.1 ? 'none' : 'auto', // 透明度很低时禁用交互
    transition: 'opacity 0.3s ease-out',
    zIndex: 1000,
    ...style
  };

  return (
    <div
      id="scroll-fade-element"
      className={className}
      style={combinedStyle}
    >
      {children}
      
      {/* 调试信息（仅在开发环境显示） */}
      {process.env.NODE_ENV === 'development' && (
        <div 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 1001
          }}
        >
          滚动速度: {scrollSpeedRef.current.toFixed(2)} px/ms<br/>
          透明度: {opacity.toFixed(2)}
        </div>
      )}
    </div>
  );
}

// 浏览器兼容性检查函数
export function isScrollFadeSupported(): boolean {
  if (typeof window === 'undefined') return true;
  
  // 检查现代浏览器特性支持
  const supports = {
    passiveEvents: (() => {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supportsPassive = true;
          }
        });
        window.addEventListener('test', () => {}, opts);
      } catch (e) {}
      return supportsPassive;
    })(),
    cssTransitions: 'transition' in document.documentElement.style,
    requestAnimationFrame: 'requestAnimationFrame' in window
  };
  
  return Object.values(supports).every(Boolean);
}