
import { SystemHealthMetrics } from '../types/neuralHub';

/**
 * Simulate metrics update for demo purposes
 * @param baseMetrics Base metrics to update
 * @returns Updated metrics
 */
export function simulateMetricsUpdate(baseMetrics?: Partial<SystemHealthMetrics>): SystemHealthMetrics {
  const now = new Date();
  
  const defaultMetrics: SystemHealthMetrics = {
    cpuUtilization: Math.random() * 0.3 + 0.3,
    memoryUtilization: Math.random() * 0.2 + 0.4,
    networkLatency: Math.random() * 30 + 40,
    errorFrequency: Math.random() * 0.01,
    uptime: Math.floor(Math.random() * 100) + 120,
    load: Math.random() * 0.4 + 0.3,
    operationsPerSecond: Math.floor(Math.random() * 5000) + 8000,
    responseTime: Math.random() * 50 + 70,
    errorRate: Math.random() * 0.03,
    stability: Math.random() * 0.1 + 0.85,
    userEngagement: Math.random() * 0.3 + 0.6,
    economicBalance: Math.random() * 0.2 + 0.7,
    lastUpdated: now
  };
  
  // Override with base metrics if provided
  return {
    ...defaultMetrics,
    ...baseMetrics,
    lastUpdated: now // Always use current time
  };
}

/**
 * Generate a simulated response for testing
 * @param requestType Type of request to simulate
 * @param inputData Input data for the request
 * @returns Simulated response
 */
export function generateSimulatedResponse(requestType: string, inputData: any): any {
  // Add a slight delay to simulate processing time
  const delay = Math.random() * 200 + 100;
  
  switch (requestType) {
    case 'content_analysis':
      return {
        sentiment: Math.random() > 0.7 ? 'positive' : Math.random() > 0.5 ? 'neutral' : 'negative',
        keywords: ['ai', 'neural', 'service', 'analysis'],
        confidence: Math.random() * 0.2 + 0.8,
        processingTime: delay
      };
      
    case 'recommendation':
      return {
        items: [
          { id: 'item1', score: Math.random() * 0.3 + 0.7 },
          { id: 'item2', score: Math.random() * 0.3 + 0.6 },
          { id: 'item3', score: Math.random() * 0.3 + 0.5 }
        ],
        context: 'user_preferences',
        processingTime: delay
      };
      
    case 'optimization':
      return {
        originalValue: inputData.value || 100,
        optimizedValue: (inputData.value || 100) * (Math.random() * 0.3 + 1.1),
        improvementFactor: Math.random() * 0.3 + 1.1,
        suggestions: ['Increase visibility', 'Adjust timing', 'Target specific audience'],
        processingTime: delay
      };
      
    default:
      return {
        success: true,
        message: 'Request processed',
        type: requestType,
        timestamp: new Date().toISOString(),
        processingTime: delay
      };
  }
}
