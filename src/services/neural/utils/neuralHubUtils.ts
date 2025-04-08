
/**
 * Utility functions for the Neural Hub system
 */
import { SystemHealthMetrics } from '../types/neuralHub';

/**
 * Generate simulated response based on model type and input
 * 
 * @param modelName The name of the neural model
 * @param modelCapabilities Array of model capabilities
 * @param modelLatency Expected latency in milliseconds
 * @param input The input data
 * @returns Simulated model response
 */
export function generateSimulatedResponse(
  modelName: string, 
  modelCapabilities: string[], 
  modelLatency: number,
  input: any
): any {
  if (modelCapabilities.includes('chat')) {
    return {
      message: `This is a simulated response from ${modelName} for input: ${JSON.stringify(input).substring(0, 50)}...`,
      confidence: 0.7 + (Math.random() * 0.3),
      processingTime: modelLatency
    };
  }
  
  if (modelCapabilities.includes('image-recognition')) {
    return {
      objects: ['person', 'car', 'tree', 'building'].slice(0, Math.floor(Math.random() * 4) + 1),
      confidence: 0.7 + (Math.random() * 0.3),
      processingTime: modelLatency
    };
  }
  
  // Default response
  return {
    result: Math.random() > 0.5,
    confidence: 0.5 + (Math.random() * 0.5),
    processingTime: modelLatency
  };
}

/**
 * Update health metrics with simulated changes
 * 
 * @param currentMetrics Current system health metrics
 * @returns Updated system health metrics
 */
export function simulateMetricsUpdate(currentMetrics: SystemHealthMetrics): SystemHealthMetrics {
  const now = new Date();
  const timeDiff = (now.getTime() - currentMetrics.lastUpdated.getTime()) / 1000;
  
  // Only update if more than 5 seconds have passed
  if (timeDiff < 5) return currentMetrics;
  
  // Simulate some variation in metrics
  return {
    load: Math.min(0.95, Math.max(0.1, currentMetrics.load + (Math.random() - 0.5) * 0.1)),
    memoryUtilization: Math.min(0.9, Math.max(0.2, currentMetrics.memoryUtilization + (Math.random() - 0.5) * 0.08)),
    operationsPerSecond: Math.max(800, Math.min(2000, currentMetrics.operationsPerSecond + (Math.random() - 0.5) * 200)),
    responseTime: Math.max(20, Math.min(200, currentMetrics.responseTime + (Math.random() - 0.5) * 15)),
    errorRate: Math.max(0.001, Math.min(0.05, currentMetrics.errorRate + (Math.random() - 0.5) * 0.005)),
    stability: Math.max(0.7, Math.min(1.0, currentMetrics.stability + (Math.random() - 0.5) * 0.03)),
    userEngagement: Math.max(0.5, Math.min(0.95, currentMetrics.userEngagement + (Math.random() - 0.5) * 0.02)),
    economicBalance: Math.max(0.6, Math.min(1.0, currentMetrics.economicBalance + (Math.random() - 0.5) * 0.04)),
    lastUpdated: now
  };
}
