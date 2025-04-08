
/**
 * Neural Hub Utilities
 */
import { SystemHealthMetrics } from '../types/neuralHub';

/**
 * Simulate a metrics update for demonstration purposes
 * @param metrics Current metrics to update
 * @returns Updated metrics
 */
export function simulateMetricsUpdate(metrics: SystemHealthMetrics): SystemHealthMetrics {
  const randomChange = () => (Math.random() - 0.5) * 0.1;
  
  // Create a simulated change to the metrics
  return {
    load: Math.min(1, Math.max(0.05, metrics.load + randomChange() * 0.2)),
    memoryUtilization: Math.min(0.95, Math.max(0.1, metrics.memoryUtilization + randomChange() * 0.15)),
    operationsPerSecond: Math.max(500, metrics.operationsPerSecond + (Math.random() - 0.4) * 100),
    responseTime: Math.max(10, metrics.responseTime + (Math.random() - 0.5) * 15),
    errorRate: Math.max(0.001, Math.min(0.1, metrics.errorRate + randomChange() * 0.01)),
    stability: Math.min(1, Math.max(0.7, metrics.stability + randomChange() * 0.05)),
    userEngagement: Math.min(1, Math.max(0.2, metrics.userEngagement + randomChange() * 0.08)),
    economicBalance: Math.min(1, Math.max(0.2, metrics.economicBalance + randomChange() * 0.05)),
    lastUpdated: new Date()
  };
}

/**
 * Generate a simulated response based on model parameters
 * @param modelName Name of the model
 * @param capabilities Model capabilities
 * @param latency Model latency
 * @param input Input data
 * @returns Simulated response
 */
export function generateSimulatedResponse(
  modelName: string,
  capabilities: string[],
  latency: number,
  input: any
): any {
  // This would be replaced with actual model inference in a production system
  // Here we generate a simulated response based on the model capabilities
  
  let response: any = {
    modelName,
    timestamp: new Date().toISOString(),
    processingTime: latency * (0.8 + Math.random() * 0.4), // Randomize around the expected latency
    confidenceScore: 0.7 + Math.random() * 0.25 // Random high confidence
  };
  
  // Add capability-specific response data
  if (capabilities.includes('content-moderation')) {
    response.moderationResult = {
      isSafe: Math.random() > 0.2,
      categories: {
        sexual: Math.random() * 0.3,
        violence: Math.random() * 0.2,
        harassment: Math.random() * 0.1,
        selfHarm: Math.random() * 0.05,
        hateSpeech: Math.random() * 0.15
      }
    };
  }
  
  if (capabilities.includes('recommendations')) {
    response.recommendations = Array(5).fill(0).map((_, i) => ({
      itemId: `rec-${Math.floor(Math.random() * 1000)}`,
      score: 0.95 - (i * 0.05),
      reason: "High match based on user preferences"
    }));
  }
  
  if (capabilities.includes('user-analysis')) {
    response.userInsights = {
      interests: ['dating', 'social', 'entertainment'].filter(() => Math.random() > 0.3),
      engagementLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      retentionRisk: Math.random() < 0.2 ? 'high' : 'low'
    };
  }
  
  // Add input echo for debugging
  response.input = typeof input === 'object' ? { ...input } : input;
  
  return response;
}
