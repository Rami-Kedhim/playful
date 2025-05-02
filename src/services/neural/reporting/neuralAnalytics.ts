
import { faker } from '@faker-js/faker';

// Define types for neural analytics data
interface NeuralAnalyticsData {
  systemMetrics: {
    responseTimeMs: number;
    throughput: number;
    errorRate: number;
    cpuUtilization: number;
    memoryUtilization: number;
    nodeCount: number;
  };
  modelPerformance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number;
    inferenceTimeMs: number;
  };
  operationalMetrics: {
    totalOperations: number;
    successes: number;
    failures: number;
    responseTimeChange: number;
    errorRateChange: number;
    accuracyChange: number;
    operationsChange: number;
  };
  performanceForecast: Array<{
    date: string;
    metrics: {
      predictedResponseTime: number;
      predictedErrorRate: number;
      expectedLoad: number;
    }
  }>;
  anomalies: Array<{
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    timestamp: string;
    relatedComponentId: string;
  }>;
}

interface DetailedPerformanceMetrics {
  responseTime: {
    current: number;
    historical: Array<{ timestamp: string; value: number }>;
    anomalies: Array<{ timestamp: string; value: number; expected: number }>;
    percentile95: number;
    percentile99: number;
  };
  errorRate: {
    current: number;
    historical: Array<{ timestamp: string; value: number }>;
    byType: Record<string, number>;
    mostFrequent: string;
  };
  resourceUsage: {
    cpu: Array<{ timestamp: string; value: number }>;
    memory: Array<{ timestamp: string; value: number }>;
    network: Array<{ timestamp: string; value: number }>;
    storage: Array<{ timestamp: string; value: number }>;
  };
}

// Generate random analytics data
export function generateMockNeuralAnalytics(): NeuralAnalyticsData {
  // Generate performance forecast data for the last 14 days
  const performanceForecast = Array.from({ length: 14 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 13 + i);
    
    // Base values with some randomness
    const baseResponseTime = 120 + Math.sin(i * 0.5) * 30;
    const baseErrorRate = 0.02 + Math.sin(i * 0.7) * 0.015;
    const baseLoad = 350 + Math.sin(i * 0.3) * 100;
    
    // Add random noise
    const responseTime = baseResponseTime + faker.number.float({ min: -15, max: 15 });
    const errorRate = Math.max(0.001, baseErrorRate + faker.number.float({ min: -0.01, max: 0.01 }));
    const load = baseLoad + faker.number.int({ min: -30, max: 30 });
    
    return {
      date: date.toISOString().split('T')[0],
      metrics: {
        predictedResponseTime: responseTime,
        predictedErrorRate: errorRate,
        expectedLoad: load,
      }
    };
  });

  // Generate anomalies (sometimes empty)
  let anomalies = [];
  if (faker.number.int({ min: 1, max: 10 }) > 7) {
    anomalies = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement([
        'Response Time Spike', 
        'Error Rate Anomaly', 
        'Resource Utilization Peak',
        'Model Accuracy Drop',
        'Network Latency Spike'
      ]),
      severity: faker.helpers.arrayElement(['low', 'medium', 'high'] as const),
      description: faker.helpers.arrayElement([
        'Sudden spike in neural processing time detected',
        'Unexpected increase in error rate above threshold',
        'Model accuracy decreased significantly',
        'Resource utilization reached critical levels',
        'Network latency affecting neural operations performance'
      ]),
      timestamp: new Date(Date.now() - faker.number.int({ min: 1, max: 24 }) * 3600000).toISOString(),
      relatedComponentId: faker.string.uuid()
    }));
  }

  // Base metrics
  const responseTimeMs = faker.number.int({ min: 80, max: 150 });
  const errorRate = faker.number.float({ min: 0.5, max: 3 });
  const accuracy = faker.number.float({ min: 0.92, max: 0.99 });
  const operations = faker.number.int({ min: 5000, max: 20000 });

  // Changes (positive or negative)
  const responseTimeChange = faker.number.float({ min: -15, max: 10 });
  const errorRateChange = faker.number.float({ min: -20, max: 15 });
  const accuracyChange = faker.number.float({ min: -5, max: 8 });
  const operationsChange = faker.number.float({ min: -10, max: 25 });

  return {
    systemMetrics: {
      responseTimeMs,
      throughput: faker.number.int({ min: 500, max: 2000 }),
      errorRate,
      cpuUtilization: faker.number.float({ min: 20, max: 85 }),
      memoryUtilization: faker.number.float({ min: 30, max: 80 }),
      nodeCount: faker.number.int({ min: 3, max: 12 }),
    },
    modelPerformance: {
      accuracy,
      precision: faker.number.float({ min: 0.9, max: 0.98 }),
      recall: faker.number.float({ min: 0.85, max: 0.97 }),
      f1Score: faker.number.float({ min: 0.87, max: 0.98 }),
      latency: faker.number.int({ min: 50, max: 200 }),
      inferenceTimeMs: faker.number.int({ min: 20, max: 100 }),
    },
    operationalMetrics: {
      totalOperations: operations,
      successes: operations * (1 - errorRate / 100),
      failures: operations * (errorRate / 100),
      responseTimeChange,
      errorRateChange,
      accuracyChange,
      operationsChange,
    },
    performanceForecast,
    anomalies,
  };
}

// Generate detailed performance metrics
export function generateDetailedPerformanceMetrics(): DetailedPerformanceMetrics {
  // Generate historical data points (past 24 hours)
  const hoursData = Array.from({ length: 24 }).map((_, i) => {
    const hourAgo = 24 - i;
    return {
      timestamp: new Date(Date.now() - hourAgo * 3600000).toISOString(),
      responseTime: 100 + Math.sin(i * 0.5) * 30 + faker.number.float({ min: -10, max: 10 }),
      errorRate: Math.max(0.001, 0.02 + Math.sin(i * 0.7) * 0.015 + faker.number.float({ min: -0.005, max: 0.005 })),
      cpuUsage: 50 + Math.sin(i * 0.3) * 20 + faker.number.float({ min: -5, max: 5 }),
      memoryUsage: 60 + Math.sin(i * 0.2) * 15 + faker.number.float({ min: -5, max: 5 }),
      networkUsage: 35 + Math.sin(i * 0.4) * 10 + faker.number.float({ min: -3, max: 3 }),
      storageUsage: 45 + i * 0.5 + faker.number.float({ min: -2, max: 2 })
    };
  });

  // Identify a few anomalies in response time
  const responseTimeAnomalies = hoursData
    .filter(() => faker.number.int({ min: 1, max: 10 }) > 8) // 20% chance for an anomaly
    .map(hour => ({
      timestamp: hour.timestamp,
      value: hour.responseTime * (1 + faker.number.float({ min: 0.3, max: 1 })),
      expected: hour.responseTime
    }));

  // Create error distribution by type
  const errorTypes = {
    'Network Timeout': faker.number.float({ min: 0.2, max: 0.4 }),
    'Model Overload': faker.number.float({ min: 0.1, max: 0.3 }),
    'Invalid Input': faker.number.float({ min: 0.1, max: 0.2 }),
    'Resource Exhaustion': faker.number.float({ min: 0.05, max: 0.15 }),
    'Unknown': faker.number.float({ min: 0.05, max: 0.1 }),
  };
  
  // Find most frequent error type
  const mostFrequent = Object.entries(errorTypes).reduce(
    (max, [type, value]) => value > (typeof max === 'string' ? 0 : max[1]) ? [type, value] : max,
    ['', 0]
  )[0];

  return {
    responseTime: {
      current: hoursData[hoursData.length - 1].responseTime,
      historical: hoursData.map(h => ({ timestamp: h.timestamp, value: h.responseTime })),
      anomalies: responseTimeAnomalies,
      percentile95: faker.number.float({ min: 150, max: 250 }),
      percentile99: faker.number.float({ min: 200, max: 350 }),
    },
    errorRate: {
      current: hoursData[hoursData.length - 1].errorRate,
      historical: hoursData.map(h => ({ timestamp: h.timestamp, value: h.errorRate })),
      byType: errorTypes,
      mostFrequent,
    },
    resourceUsage: {
      cpu: hoursData.map(h => ({ timestamp: h.timestamp, value: h.cpuUsage })),
      memory: hoursData.map(h => ({ timestamp: h.timestamp, value: h.memoryUsage })),
      network: hoursData.map(h => ({ timestamp: h.timestamp, value: h.networkUsage })),
      storage: hoursData.map(h => ({ timestamp: h.timestamp, value: h.storageUsage })),
    }
  };
}
