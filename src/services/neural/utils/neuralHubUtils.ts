// Utility functions for neural hub operations
import { neuralHub } from '../HermesOxumNeuralHub';

/**
 * Formats system health metrics for display
 */
export const formatHealthMetrics = (metrics: any) => {
  if (!metrics) return {};
  
  return {
    cpuUsage: `${Math.round((metrics.cpuUtilization || 0) * 100)}%`,
    memoryUsage: `${Math.round((metrics.memoryUtilization || 0) * 100)}%`,
    responseTime: `${metrics.responseTime || 0}ms`,
    errorRate: `${Math.round((metrics.errorRate || 0) * 100)}%`,
    uptime: formatUptime(metrics.systemUptime || 0),
    modelCount: metrics.modelCount || 0,
    activeConnections: metrics.activeConnections || 0,
    requestsPerMinute: metrics.requestsPerMinute || 0
  };
};

/**
 * Formats uptime in seconds to a human-readable string
 */
export const formatUptime = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${Math.round(seconds % 60)}s`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
};

/**
 * Gets the system health status based on metrics
 */
export const getSystemHealthStatus = (metrics: any): 'optimal' | 'good' | 'warning' | 'critical' => {
  if (!metrics) return 'warning';
  
  const cpuUsage = (metrics.cpuUtilization || 0) * 100;
  const memoryUsage = (metrics.memoryUtilization || 0) * 100;
  const errorRate = (metrics.errorRate || 0) * 100;
  
  if (errorRate > 10 || cpuUsage > 90 || memoryUsage > 95) {
    return 'critical';
  }
  
  if (errorRate > 5 || cpuUsage > 75 || memoryUsage > 80) {
    return 'warning';
  }
  
  if (errorRate > 1 || cpuUsage > 50 || memoryUsage > 60) {
    return 'good';
  }
  
  return 'optimal';
};

/**
 * Checks if the neural hub is initialized
 */
export const isNeuralHubInitialized = (): boolean => {
  return neuralHub.isInitialized();
};

/**
 * Gets recommendations based on system health
 */
export const getSystemRecommendations = (metrics: any): string[] => {
  const recommendations: string[] = [];
  
  if (!metrics) {
    return ['Initialize the neural hub to get system recommendations.'];
  }
  
  const cpuUsage = (metrics.cpuUtilization || 0) * 100;
  const memoryUsage = (metrics.memoryUtilization || 0) * 100;
  const errorRate = (metrics.errorRate || 0) * 100;
  
  if (cpuUsage > 80) {
    recommendations.push('CPU usage is high. Consider scaling resources or optimizing processing.');
  }
  
  if (memoryUsage > 85) {
    recommendations.push('Memory usage is high. Review memory allocation or check for memory leaks.');
  }
  
  if (errorRate > 5) {
    recommendations.push('Error rate exceeds recommended threshold. Investigate potential issues.');
  }
  
  if (metrics.modelCount === 0) {
    recommendations.push('No models are loaded. Initialize models to enable neural processing.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('System is operating within normal parameters.');
  }
  
  return recommendations;
};

/**
 * Formats a neural model for display
 */
export const formatNeuralModel = (model: any) => {
  if (!model) return {};
  
  return {
    id: model.id || 'unknown',
    name: model.name || 'Unnamed Model',
    type: model.type || 'unknown',
    version: model.version || '1.0',
    status: model.status || 'inactive',
    accuracy: `${Math.round((model.performance?.accuracy || 0) * 100)}%`,
    latency: `${model.performance?.latency || 0}ms`,
    resourceUsage: `${Math.round((model.performance?.resourceUsage || 0) * 100)}%`,
    capabilities: model.capabilities || [],
    specialization: model.specialization || 'general'
  };
};

/**
 * Gets the neural hub version
 */
export const getNeuralHubVersion = (): string => {
  return neuralHub.getVersion();
};

/**
 * Checks if a specific neural capability is available
 */
export const hasNeuralCapability = (capability: string): boolean => {
  return neuralHub.hasCapability(capability);
};

/**
 * Gets the neural hub status
 */
export const getNeuralHubStatus = (): 'online' | 'offline' | 'initializing' | 'error' => {
  if (!isNeuralHubInitialized()) {
    return 'offline';
  }
  
  try {
    const status = neuralHub.getStatus();
    return status as 'online' | 'offline' | 'initializing' | 'error';
  } catch (error) {
    console.error('Error getting neural hub status:', error);
    return 'error';
  }
};

/**
 * Calculates the overall system health percentage
 */
export const calculateSystemHealth = (metrics: any): number => {
  if (!metrics) return 0;
  
  const cpuHealth = 100 - ((metrics.cpuUtilization || 0) * 100);
  const memoryHealth = 100 - ((metrics.memoryUtilization || 0) * 100);
  const errorHealth = 100 - ((metrics.errorRate || 0) * 100);
  
  // Weight the different factors
  const weightedHealth = (cpuHealth * 0.3) + (memoryHealth * 0.3) + (errorHealth * 0.4);
  
  return Math.round(weightedHealth);
};
