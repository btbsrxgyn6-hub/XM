/**
 * 控制台日志过滤器
 * 用于抑制开发模式下的空值日志输出
 */

// 保存原始的控制台方法
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  debug: console.debug
};

/**
 * 检查是否为需要过滤的空值日志
 */
function shouldFilterLog(...args: any[]): boolean {
  // 过滤空值日志
  if (args.length === 1 && args[0] === '<no value>') {
    return true;
  }
  
  // 过滤空字符串或空值
  if (args.length === 1 && (!args[0] || args[0] === '')) {
    return true;
  }
  
  // 过滤特定的第三方库调试信息
  if (args.some(arg => 
    typeof arg === 'string' && 
    (arg.includes('undefined') || arg.includes('null') || arg === 'undefined' ||
     arg.includes('<no value>') || arg.includes('no value') ||
     arg.trim() === '' || arg === 'null')
  )) {
    return true;
  }
  
  // 过滤包含空值的数组
  if (args.length === 1 && Array.isArray(args[0]) && args[0].length === 0) {
    return true;
  }
  
  // 过滤空对象
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && Object.keys(args[0]).length === 0) {
    return true;
  }
  
  return false;
}

/**
 * 启用日志过滤器
 */
export function enableConsoleFilter() {
  // 只在开发模式下启用
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // 重写控制台方法
  console.log = function(...args: any[]) {
    if (!shouldFilterLog(...args)) {
      originalConsole.log.apply(console, args);
    }
  };

  console.warn = function(...args: any[]) {
    if (!shouldFilterLog(...args)) {
      originalConsole.warn.apply(console, args);
    }
  };

  console.error = function(...args: any[]) {
    if (!shouldFilterLog(...args)) {
      originalConsole.error.apply(console, args);
    }
  };

  console.info = function(...args: any[]) {
    if (!shouldFilterLog(...args)) {
      originalConsole.info.apply(console, args);
    }
  };

  console.debug = function(...args: any[]) {
    if (!shouldFilterLog(...args)) {
      originalConsole.debug.apply(console, args);
    }
  };
}

/**
 * 禁用日志过滤器，恢复原始控制台方法
 */
export function disableConsoleFilter() {
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
  console.info = originalConsole.info;
  console.debug = originalConsole.debug;
}