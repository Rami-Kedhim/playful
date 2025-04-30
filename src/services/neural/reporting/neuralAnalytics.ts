
import { NeuralAnalyticsReport, PerformanceTrend } from '../types/neuralAnalytics';

// Function to generate random neural analytics data
export const generateNeuralAnalytics = (): NeuralAnalyticsReport => {
  // Helper to get a random number between min and max
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Helper to get a random change percentage (both positive and negative)
  const getRandomChange = (min: number, max: number): number => {
    return Number((Math.random() * (max - min) + min).toFixed(1));
  };

  // Generate daily usage trend for the last 30 days
  const generateDailyUsageTrend = (days = 30) => {
    const result = [];
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      result.push({
        date: date.toISOString().split('T')[0],
        value: getRandomNumber(500, 5000)
      });
    }
    
    return result;
  };

  // Generate performance forecast for next 7 days
  const generatePerformanceForecast = (days = 7): PerformanceTrend[] => {
    const result = [];
    const today = new Date();
    
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      result.push({
        date: date.toISOString().split('T')[0],
        metrics: {
          expectedLoad: getRandomNumber(2000, 6000),
          predictedResponseTime: getRandomNumber(120, 200),
          predictedErrorRate: Number((Math.random() * 2).toFixed(2)),
          confidenceScore: Number((0.7 + Math.random() * 0.3).toFixed(2))
        }
      });
    }
    
    return result;
  };

  // Generate anomalies
  const generateAnomalies = (count = 3) => {
    const anomalyTypes = ['latency_spike', 'error_rate_increase', 'memory_leak', 'cpu_bottleneck'];
    const severities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    const result = [];
    
    for (let i = 0; i < count; i++) {
      result.push({
        id: `anomaly-${Date.now()}-${i}`,
        type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: `Anomaly detected in neural processing system`,
        timestamp: new Date().toISOString(),
        relatedComponentId: `component-${getRandomNumber(1, 10)}`
      });
    }
    
    return result;
  };

  return {
    timestamp: new Date().toISOString(),
    serviceMetrics: [
      {
        id: 'neural-service-1',
        name: 'Primary Neural Processor',
        type: 'processor',
        status: 'active' as const,
        metrics: {
          uptime: getRandomNumber(24, 720),
          load: getRandomNumber(20, 80),
        },
        enabled: true,
        lastActivity: new Date().toISOString()
      },
      {
        id: 'neural-service-2',
        name: 'Secondary Neural Processor',
        type: 'processor',
        status: 'active' as const,
        metrics: {
          uptime: getRandomNumber(24, 720),
          load: getRandomNumber(20, 80),
        },
        enabled: true,
        lastActivity: new Date().toISOString()
      },
      {
        id: 'neural-service-3',
        name: 'Backup Neural Processor',
        type: 'processor',
        status: 'maintenance' as const,
        metrics: {
          uptime: getRandomNumber(1, 24),
          load: getRandomNumber(0, 10),
        },
        enabled: false,
        lastActivity: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
    ],
    systemMetrics: {
      cpuUtilization: getRandomNumber(30, 80),
      memoryUtilization: getRandomNumber(40, 85),
      requestsPerSecond: getRandomNumber(100, 500),
      responseTimeMs: getRandomNumber(100, 300),
      errorRate: Number((Math.random() * 3).toFixed(2)),
    },
    anomalies: generateAnomalies(),
    trends: {
      requestVolume: Math.random() > 0.5 ? 'increasing' : 'stable',
      errorRate: Math.random() > 0.7 ? 'increasing' : 'stable',
      responseTime: Math.random() > 0.5 ? 'decreasing' : 'stable',
    },
    recommendations: [
      'Scale up neural processing capacity during peak hours',
      'Optimize memory allocation for improved performance',
      'Consider upgrading to latest neural model version'
    ],
    modelPerformance: {
      accuracy: Number((0.85 + Math.random() * 0.1).toFixed(2)),
      precision: Number((0.8 + Math.random() * 0.15).toFixed(2)),
      recall: Number((0.75 + Math.random() * 0.2).toFixed(2)),
      f1Score: Number((0.8 + Math.random() * 0.1).toFixed(2)),
      latency: getRandomNumber(80, 150),
      throughput: getRandomNumber(1000, 5000),
      mapData: [
        { key: 'recall', value: Number((0.7 + Math.random() * 0.2).toFixed(2)) },
        { key: 'precision', value: Number((0.75 + Math.random() * 0.2).toFixed(2)) },
        { key: 'f1', value: Number((0.8 + Math.random() * 0.15).toFixed(2)) }
      ]
    },
    operationalMetrics: {
      totalRequests: getRandomNumber(100000, 500000),
      successfulRequests: getRandomNumber(95000, 495000),
      failedRequests: getRandomNumber(500, 5000),
      averageResponseTime: getRandomNumber(120, 250),
      p95ResponseTime: getRandomNumber(200, 400),
      p99ResponseTime: getRandomNumber(300, 600),
      requestsPerMinute: getRandomNumber(1000, 5000),
      errorRate: Number((Math.random() * 3).toFixed(1)),
      activeConnections: getRandomNumber(500, 2000),
      totalOperations: getRandomNumber(500000, 2000000),
      operationsChange: getRandomChange(-5, 15),
      averageAccuracy: Number((0.9 + Math.random() * 0.09).toFixed(2)),
      accuracyChange: getRandomChange(-2, 5),
      responseTimeChange: getRandomChange(-10, 5),
      errorRateChange: getRandomChange(-15, 10)
    },
    usageMetrics: {
      dailyActiveUsers: getRandomNumber(5000, 20000),
      monthlyActiveUsers: getRandomNumber(50000, 200000),
      totalUsers: getRandomNumber(100000, 500000),
      sessionsPerUser: Number((1 + Math.random() * 4).toFixed(1)),
      averageSessionDuration: getRandomNumber(120, 900),
      retentionRate: Number((0.6 + Math.random() * 0.3).toFixed(2)),
      serviceTypeDistribution: [
        { name: 'API', value: getRandomNumber(40, 60) },
        { name: 'Web', value: getRandomNumber(20, 40) },
        { name: 'Mobile', value: getRandomNumber(10, 30) }
      ],
      resourceAllocation: [
        { name: 'Inference', value: getRandomNumber(50, 70) },
        { name: 'Training', value: getRandomNumber(20, 40) },
        { name: 'Storage', value: getRandomNumber(10, 20) }
      ],
      dailyUsageTrend: generateDailyUsageTrend()
    },
    advancedMetrics: {
      resourceUtilization: Number((0.5 + Math.random() * 0.4).toFixed(2)),
      efficientUseScore: Number((0.6 + Math.random() * 0.3).toFixed(2)),
      loadBalancingEfficiency: Number((0.7 + Math.random() * 0.2).toFixed(2)),
      cachingEffectiveness: Number((0.5 + Math.random() * 0.3).toFixed(2)),
      algorithmicEfficiency: Number((0.6 + Math.random() * 0.3).toFixed(2)),
      mapData: [
        { key: 'resource_util', value: Number((0.5 + Math.random() * 0.4).toFixed(2)) },
        { key: 'load_balance', value: Number((0.6 + Math.random() * 0.3).toFixed(2)) },
        { key: 'caching', value: Number((0.4 + Math.random() * 0.5).toFixed(2)) }
      ]
    },
    correlationMatrix: {
      labels: ['Accuracy', 'Latency', 'Cost', 'Usage'],
      values: [
        [1, -0.7, 0.3, 0.5],
        [-0.7, 1, -0.2, 0.1],
        [0.3, -0.2, 1, 0.8],
        [0.5, 0.1, 0.8, 1]
      ],
      maxCorrelation: 0.8,
      minCorrelation: -0.7,
      averageCorrelation: 0.2,
      metricsList: [
        { name: 'accuracy_latency', value: -0.7 },
        { name: 'cost_usage', value: 0.8 },
        { name: 'accuracy_usage', value: 0.5 }
      ]
    },
    performanceForecast: generatePerformanceForecast()
  };
};

export const generatePerformanceForecast = (days = 7): PerformanceTrend[] => {
  const result = [];
  const today = new Date();
  
  // Helper to get a random number between min and max
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    result.push({
      date: date.toISOString().split('T')[0],
      metrics: {
        expectedLoad: getRandomNumber(2000, 6000),
        predictedResponseTime: getRandomNumber(120, 200),
        predictedErrorRate: Number((Math.random() * 2).toFixed(2)),
        confidenceScore: Number((0.7 + Math.random() * 0.3).toFixed(2))
      }
    });
  }
  
  return result;
};
