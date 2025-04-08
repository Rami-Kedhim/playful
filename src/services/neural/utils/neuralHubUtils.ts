
import { SystemHealthMetrics } from '../types/neuralHub';

/**
 * Simulates updating system metrics for demo purposes
 */
export function simulateMetricsUpdate(): SystemHealthMetrics {
  return {
    cpuUtilization: Math.random() * 0.6 + 0.2,
    memoryUtilization: Math.random() * 0.5 + 0.3,
    networkLatency: Math.random() * 50 + 20,
    errorFrequency: Math.random() * 0.01,
    uptime: Math.floor(Math.random() * 100) + 120,
    load: Math.random() * 0.7 + 0.2,
    operationsPerSecond: Math.floor(Math.random() * 10000) + 5000,
    responseTime: Math.random() * 100 + 50,
    errorRate: Math.random() * 0.05,
    stability: Math.random() * 0.3 + 0.7,
    userEngagement: Math.random() * 0.4 + 0.5,
    economicBalance: Math.random() * 0.5 + 0.5,
    lastUpdated: new Date()
  };
}

/**
 * Simulates neural system responses for demonstration
 */
export function generateSimulatedResponse(input: string, modelType: string): any {
  const delay = Math.random() * 500 + 300; // 300-800ms delay
  
  return new Promise(resolve => {
    setTimeout(() => {
      switch (modelType) {
        case 'text-understanding':
          resolve({
            sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
            confidence: Math.random() * 0.3 + 0.7,
            entities: extractDummyEntities(input)
          });
          break;
          
        case 'image-classification':
          resolve({
            categories: ['person', 'outdoor', 'city'],
            probabilities: [0.92, 0.87, 0.65],
            detectedObjects: 4
          });
          break;
          
        case 'decision-making':
          resolve({
            recommendation: Math.random() > 0.5 ? 'approve' : 'decline',
            confidence: Math.random() * 0.4 + 0.6,
            factors: ['risk', 'history', 'patterns']
          });
          break;
          
        default:
          resolve({
            result: 'unspecified',
            confidence: 0.5
          });
      }
    }, delay);
  });
}

/**
 * Helper function to extract dummy entities from text
 */
function extractDummyEntities(text: string): any[] {
  const entities = [];
  
  // Extract potential name-like entities (capitalized words)
  const words = text.split(/\s+/);
  const capitalizedWords = words.filter(word => 
    word.length > 1 && word[0] === word[0].toUpperCase() && word[1] === word[1].toLowerCase()
  );
  
  // Add some dummy entities
  if (capitalizedWords.length > 0) {
    entities.push({
      type: 'person',
      value: capitalizedWords[0],
      confidence: 0.85
    });
  }
  
  // Add location if text contains location indicators
  if (text.match(/in|at|near|from/i)) {
    entities.push({
      type: 'location',
      value: 'New York',
      confidence: 0.72
    });
  }
  
  // Add date if text contains time indicators
  if (text.match(/today|tomorrow|yesterday|date|time|when/i)) {
    entities.push({
      type: 'date',
      value: new Date().toISOString().split('T')[0],
      confidence: 0.93
    });
  }
  
  return entities;
}
