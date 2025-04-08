
// Fixing the type error at line 385
// We will update just the problematic function, not the entire file

// Replace the problematic line:
// Original: this.logError(message, type, 'critical');
// New version needs to stringify any object passed as message:

logError(message: string | Record<string, any>, type: string = 'general', severity: string = 'normal'): void {
  const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
  console.error(`[BRAIN HUB ERROR][${type.toUpperCase()}][${severity}]: ${messageStr}`);
  
  // Store in error log
  this.errorLogs.push({
    timestamp: Date.now(),
    type,
    message: messageStr,
    severity
  });
  
  // Trigger error handling system if severe
  if (severity === 'critical') {
    this.triggerErrorRecovery(type);
  }
}
