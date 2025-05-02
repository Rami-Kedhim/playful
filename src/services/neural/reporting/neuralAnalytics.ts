
import { NeuralAnalyticsReport } from '../types/neuralAnalytics';

// Helper function to get random value within range
const getRandomValue = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

// Helper function to map severity string to allowed values
const mapSeverity = (severity: string): 'low' | 'medium' | 'high' => {
  const lowerSeverity = severity.toLowerCase();
  if (lowerSeverity === 'high') return 'high';
  if (lowerSeverity === 'medium') return 'medium';
  return 'low';
};

// Generate mock analytics data for development
export const generateMockNeuralAnalytics = (): NeuralAnalyticsReport => {
  const now = new Date();
  const fiveMinutes = 5 * 60 * 1000;
  
  // Generate mock service metrics
  const serviceMetrics = Array.from({ length: 3 }, (_, i) => ({
    id: `service-${i + 1}`,
    name: [`Neural Core Service`, `Data Transformer`, `Analytics Engine`][i],
    type: [`core`, `transformer`, `analytics`][i],
    status: Math.random() > 0.2 ? 'active' as const : 'inactive' as const,
    metrics: {
      responseTime: getRandomValue(50, 300),
      throughput: getRandomValue(100, 500),
      errorRate: getRandomValue(0, 3),
      accuracy: getRandomValue(0.85, 0.99)
    },
    enabled: Math.random() > 0.2,
    lastActivity: new Date(now.getTime() - getRandomValue(0, fiveMinutes)).toISOString()
  }));

  // Generate mock system metrics
  const systemMetrics = {
    cpuUtilization: getRandomValue(20, 80),
    memoryUtilization: getRandomValue(30, 70),
    requestsPerSecond: getRandomValue(10, 50),
    responseTimeMs: getRandomValue(80, 250),
    errorRate: getRandomValue(0, 5)
  };

  // Generate mock anomalies
  const anomalies = Array.from({ length: Math.floor(Math.random() * 3) }, (_, i) => ({
    id: `anomaly-${i + 1}`,
    type: [`latency_spike`, `error_rate_increase`, `resource_contention`][i % 3],
    severity: mapSeverity([`low`, `medium`, `high`][i % 3]),
    description: [
      `Unusual latency increase detected in neural processing`,
      `Error rate exceeded normal threshold`,
      `Resource contention between neural modules`
    ][i % 3],
    timestamp: new Date(now.getTime() - getRandomValue(0, fiveMinutes)).toISOString(),
    relatedComponentId: `service-${i % 3 + 1}`
  }));

  // Generate mock trends
  const trends = {
    requestVolume: Math.random() > 0.5 ? 'increasing' : 'stable',
    errorRate: Math.random() > 0.7 ? 'increasing' : 'decreasing',
    responseTime: Math.random() > 0.6 ? 'stable' : 'decreasing'
  };

  // Generate mock recommendations
  const recommendations = [
    'Optimize neural resource allocation for improved performance',
    'Consider scaling up transformer services to handle increased load',
    'Review error patterns in processing pipeline',
    'Update neural models to improve accuracy'
  ].filter(() => Math.random() > 0.3);

  // Generate model performance data
  const modelPerformance = {
    accuracy: getRandomValue(0.85, 0.98),
    precision: getRandomValue(0.82, 0.96),
    recall: getRandomValue(0.80, 0.95),
    f1Score: getRandomValue(0.81, 0.97),
    latency: getRandomValue(50, 200),
    throughput: getRandomValue(100, 500),
    mapData: Array.from({ length: 5 }, (_, i) => ({
      key: [`accuracy`, `precision`, `recall`, `latency`, `throughput`][i],
      value: getRandomValue(0.7, 0.99)
    }))
  };

  // Generate operational metrics
  const operationalMetrics = {
    totalRequests: Math.floor(getRandomValue(10000, 50000)),
    successfulRequests: Math.floor(getRandomValue(9000, 45000)),
    failedRequests: Math.floor(getRandomValue(100, 1000)),
    averageResponseTime: getRandomValue(80, 200),
    p95ResponseTime: getRandomValue(150, 350),
    p99ResponseTime: getRandomValue(200, 500),
    requestsPerMinute: getRandomValue(100, 500),
    errorRate: getRandomValue(0.5, 3),
    activeConnections: Math.floor(getRandomValue(10, 100)),
    totalOperations: Math.floor(getRandomValue(50000, 200000)),
    operationsChange: getRandomValue(-10, 15),
    averageAccuracy: getRandomValue(0.85, 0.98),
    accuracyChange: getRandomValue(-0.02, 0.05),
    responseTimeChange: getRandomValue(-20, 10),
    errorRateChange: getRandomValue(-1, 0.5)
  };

  // Usage metrics
  const usageMetrics = {
    dailyActiveUsers: Math.floor(getRandomValue(1000, 5000)),
    monthlyActiveUsers: Math.floor(getRandomValue(20000, 100000)),
    totalUsers: Math.floor(getRandomValue(50000, 200000)),
    sessionsPerUser: getRandomValue(1.5, 5),
    averageSessionDuration: getRandomValue(180, 900),
    retentionRate: getRandomValue(0.6, 0.9),
    serviceTypeDistribution: [
      { name: 'Core', value: getRandomValue(30, 50) },
      { name: 'Transformer', value: getRandomValue(20, 40) },
      { name: 'Analytics', value: getRandomValue(10, 30) }
    ],
    resourceAllocation: [
      { name: 'CPU', value: getRandomValue(50, 80) },
      { name: 'Memory', value: getRandomValue(40, 70) },
      { name: 'Network', value: getRandomValue(20, 60) }
    ],
    dailyUsageTrend: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: getRandomValue(1000, 5000)
    }))
  };

  // Advanced metrics
  const advancedMetrics = {
    resourceUtilization: getRandomValue(0.5, 0.85),
    efficientUseScore: getRandomValue(0.6, 0.95),
    loadBalancingEfficiency: getRandomValue(0.7, 0.9),
    cachingEffectiveness: getRandomValue(0.5, 0.8),
    algorithmicEfficiency: getRandomValue(0.7, 0.95),
    mapData: Array.from({ length: 5 }, (_, i) => ({
      key: [`cpu_efficiency`, `memory_usage`, `resource_optimization`, `algorithm_efficiency`, `caching`][i],
      value: getRandomValue(0.6, 0.9)
    }))
  };

  // Correlation matrix
  const correlationLabels = ['CPU', 'Memory', 'Latency', 'Throughput', 'Errors'];
  const correlationMatrix = {
    labels: correlationLabels,
    values: correlationLabels.map(() => 
      correlationLabels.map(() => getRandomValue(-1, 1))
    ),
    maxCorrelation: getRandomValue(0.8, 1),
    minCorrelation: getRandomValue(-1, -0.7),
    averageCorrelation: getRandomValue(0.2, 0.6),
    metricsList: correlationLabels.map((name, i) => ({
      name,
      value: getRandomValue(0, 1)
    }))
  };

  // Performance forecast
  const performanceForecast = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(now.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    metrics: {
      expectedLoad: getRandomValue(100, 500) + i * 10,
      predictedResponseTime: getRandomValue(80, 200) + i * 2,
      predictedErrorRate: Math.max(0, getRandomValue(0.5, 2) - i * 0.1),
      confidenceScore: getRandomValue(0.7, 0.95)
    }
  }));

  // Combine everything into a complete analytics report
  return {
    timestamp: now.toISOString(),
    serviceMetrics,
    systemMetrics,
    anomalies,
    trends,
    recommendations,
    modelPerformance,
    operationalMetrics,
    usageMetrics,
    advancedMetrics,
    correlationMatrix,
    performanceForecast
  };
};

// Generate detailed performance metrics
export const generateDetailedPerformanceMetrics = () => {
  // Implementation for detailed metrics
  return {
    performance: {
      accuracy: getRandomValue(0.85, 0.98),
      latency: getRandomValue(50, 200),
      errorRate: getRandomValue(0.5, 3),
      throughput: getRandomValue(1000, 5000),
      resourceUtilization: getRandomValue(0.5, 0.85),
      scalability: getRandomValue(0.6, 0.9),
      reliability: getRandomValue(0.9, 0.99),
    },
    trends: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        requests: Math.floor(getRandomValue(100, 500)),
        errors: Math.floor(getRandomValue(1, 20)),
        latency: getRandomValue(80, 200)
      })),
      daily: Array.from({ length: 7 }, (_, i) => ({
        day: new Date(new Date().getTime() - (6-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        requests: Math.floor(getRandomValue(1000, 5000)),
        errors: Math.floor(getRandomValue(10, 200)),
        latency: getRandomValue(90, 180)
      }))
    }
  };
};
