
/**
 * Neural Hub Utils - Utility functions for the neural hub
 */
import { SystemHealthMetrics } from '../types/neuralHub';

/**
 * Simulates changes in system health metrics
 */
export const simulateMetricsUpdate = (currentMetrics: SystemHealthMetrics): SystemHealthMetrics => {
  // Create a copy of the current metrics
  const newMetrics = { ...currentMetrics };
  
  // Update system load (slight random variations)
  newMetrics.load = fluctuateValue(currentMetrics.load, 0.1, 0.05, 0.95);
  
  // Update memory utilization (gradual increase with occasional drops)
  if (Math.random() > 0.95) {
    // Occasional garbage collection or resource release
    newMetrics.memoryUtilization = Math.max(0.1, currentMetrics.memoryUtilization - (Math.random() * 0.2));
  } else {
    // Gradual increase
    newMetrics.memoryUtilization = fluctuateValue(currentMetrics.memoryUtilization, 0.05, 0.1, 0.9);
  }
  
  // Update operations per second (higher variance)
  newMetrics.operationsPerSecond = fluctuateValue(
    currentMetrics.operationsPerSecond, 
    100, 
    Math.max(100, currentMetrics.operationsPerSecond * 0.5),
    currentMetrics.operationsPerSecond * 1.5
  );
  
  // Update response time (inversely related to system performance)
  if (newMetrics.load > 0.7 || newMetrics.memoryUtilization > 0.8) {
    // High load or memory usage increases response time
    newMetrics.responseTime = fluctuateValue(currentMetrics.responseTime, 10, currentMetrics.responseTime, currentMetrics.responseTime * 1.5);
  } else {
    // Normal conditions
    newMetrics.responseTime = fluctuateValue(currentMetrics.responseTime, 5, 10, Math.max(50, currentMetrics.responseTime));
  }
  
  // Update error rate (low probability of spikes)
  if (Math.random() > 0.97) {
    // Occasional error spike
    newMetrics.errorRate = Math.min(0.1, currentMetrics.errorRate + (Math.random() * 0.05));
  } else {
    // Generally low and stable
    newMetrics.errorRate = fluctuateValue(currentMetrics.errorRate, 0.001, 0.0005, 0.02);
  }
  
  // Update stability (function of error rate and response time)
  const errorImpact = 1 - (newMetrics.errorRate * 10); // Error rate has strong negative impact
  const responseImpact = 1 - (Math.min(1, newMetrics.responseTime / 200)); // Response time impact
  newMetrics.stability = Math.min(1, Math.max(0.5, (errorImpact * 0.7) + (responseImpact * 0.3)));
  
  // Update user engagement (slight variations with time-of-day pattern)
  const hourOfDay = new Date().getHours();
  const timeOfDayFactor = getTimeOfDayFactor(hourOfDay);
  newMetrics.userEngagement = fluctuateValue(
    currentMetrics.userEngagement * 0.7 + timeOfDayFactor * 0.3, 
    0.05, 
    0.3, 
    0.95
  );
  
  // Update economic balance (slow-changing)
  newMetrics.economicBalance = fluctuateValue(currentMetrics.economicBalance, 0.01, 0.2, 0.95);
  
  // Update timestamp
  newMetrics.lastUpdated = new Date();
  
  return newMetrics;
};

/**
 * Generate a simulated response for model inference
 */
export const generateSimulatedResponse = (
  modelName: string, 
  capabilities: string[], 
  latency: number,
  input: any
): any => {
  // Create a base response structure
  const response = {
    modelName,
    timestamp: new Date(),
    processingTime: latency + (Math.random() * 20 - 10), // ms
    confidenceScore: 0.7 + (Math.random() * 0.25),
    input: { ...input },
    output: {},
    metadata: {
      capabilities,
      version: "1.0"
    }
  };
  
  // Generate different outputs based on capabilities
  if (capabilities.includes('user-behavior-analysis')) {
    response.output = {
      ...response.output,
      behaviorPatterns: ["exploration", "content-focused", "social-interaction"],
      engagementScore: 0.6 + (Math.random() * 0.3),
      retentionProbability: 0.75 + (Math.random() * 0.2)
    };
  }
  
  if (capabilities.includes('emotion-recognition')) {
    response.output = {
      ...response.output,
      dominantEmotion: pickRandom(["neutral", "happy", "interested", "curious"]),
      emotionIntensity: 0.4 + (Math.random() * 0.5),
      sentimentScore: Math.random() * 2 - 1 // -1 to 1
    };
  }
  
  if (capabilities.includes('content-adaptation')) {
    response.output = {
      ...response.output,
      recommendedContent: [
        { id: `rec-${Math.floor(Math.random() * 1000)}`, score: 0.9 + (Math.random() * 0.1) },
        { id: `rec-${Math.floor(Math.random() * 1000)}`, score: 0.8 + (Math.random() * 0.1) },
        { id: `rec-${Math.floor(Math.random() * 1000)}`, score: 0.7 + (Math.random() * 0.1) }
      ],
      adaptationLevel: Math.floor(Math.random() * 5) + 1
    };
  }
  
  if (capabilities.includes('ethical-verification')) {
    response.output = {
      ...response.output,
      complianceStatus: pickRandom(["compliant", "review-recommended", "compliant"]),
      ethicalConsiderations: [
        pickRandom(["user-privacy", "data-protection", "consent"]),
        pickRandom(["fairness", "transparency", "accountability"])
      ],
      trustScore: 0.7 + (Math.random() * 0.25)
    };
  }
  
  return response;
};

/**
 * Helper function to vary a value within bounds
 */
function fluctuateValue(
  currentValue: number, 
  maxChange: number, 
  minValue: number, 
  maxValue: number
): number {
  // Generate random change (positive or negative)
  const change = (Math.random() * maxChange * 2) - maxChange;
  
  // Apply change and ensure within bounds
  return Math.min(maxValue, Math.max(minValue, currentValue + change));
}

/**
 * Helper function to get time-of-day factor for user engagement
 * Returns higher values during peak hours
 */
function getTimeOfDayFactor(hour: number): number {
  // Peak hours: 9-11 AM and 7-10 PM
  if ((hour >= 9 && hour <= 11) || (hour >= 19 && hour <= 22)) {
    return 0.8 + (Math.random() * 0.2); // High engagement
  } 
  // Medium hours: 12-6 PM
  else if (hour >= 12 && hour <= 18) {
    return 0.6 + (Math.random() * 0.2); // Medium engagement
  } 
  // Low hours: Late night and early morning
  else {
    return 0.3 + (Math.random() * 0.3); // Lower engagement
  }
}

/**
 * Helper function to pick a random item from an array
 */
function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
