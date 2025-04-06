
/**
 * Logs content-related actions with optional metadata
 */
export function logContentAction(action: string, metadata?: Record<string, any>) {
  console.log(`[Content Action] ${action}`, metadata || '');
}

/**
 * Logs authentication-related actions with optional metadata
 */
export function logAuthAction(action: string, metadata?: Record<string, any>) {
  console.log(`[Auth Action] ${action}`, metadata || '');
}

/**
 * Logs content-flow actions with optional metadata
 */
export function logContentFlow(action: string, contentId: string, metadata?: Record<string, any>) {
  console.log(`[Content Flow] ${action} | ID: ${contentId}`, metadata || '');
}

/**
 * Logs content-related errors with optional context information
 */
export function logContentError(context: string, error: Error | any) {
  console.error(`[Content Error] ${context}:`, error instanceof Error ? error.message : error);
}

/**
 * Logs errors with optional context information
 */
export function logError(error: Error | string, context?: Record<string, any>) {
  console.error(`[Error] ${error instanceof Error ? error.message : error}`, {
    stack: error instanceof Error ? error.stack : undefined,
    ...context
  });
}

/**
 * Logs performance-related information
 */
export function logPerformance(label: string, startTime: number) {
  const duration = performance.now() - startTime;
  console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
}

/**
 * Simple debugging utility that logs object with better formatting
 */
export function debugObject(obj: any, label = 'Debug Object') {
  console.log(`[${label}]`, JSON.parse(JSON.stringify(obj)));
}
