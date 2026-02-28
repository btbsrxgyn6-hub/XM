'use client';

import { useEffect } from 'react';
import { enableConsoleFilter } from '@/lib/console-filter';

export function ConsoleFilter() {
  useEffect(() => {
    // 在开发模式下启用控制台过滤器
    if (process.env.NODE_ENV === 'development') {
      enableConsoleFilter();
      
      console.log('控制台日志过滤器已启用 - 空值日志将被抑制');
    }
    
    // 清理函数
    return () => {
      // 如果需要，可以在这里禁用过滤器
    };
  }, []);

  // 这个组件不渲染任何内容
  return null;
}