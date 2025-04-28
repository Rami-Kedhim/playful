
import { NeuralAnalyticsReport, PerformanceTrend } from '../types/neuralAnalytics';

// Generate mock neural analytics report for the demo
export const generateNeuralAnalytics = (): NeuralAnalyticsReport => {
  return {
    timestamp: new Date().toISOString(),
    serviceMetrics: [
      {
        id: 'neural-text-processor',
        name: 'Neural Text Processor',
        type: 'text-analysis',
        status: 'active',
        metrics: {
          accuracy: 0.92,
          latency: 120,
          throughput: 1450,
        },
        enabled: true,
        lastActivity: new Date(Date.now() - 120000).toISOString(),
      },
      {
        id: 'neural-image-processor',
        name: 'Neural Image Processor',
        type: 'image-analysis',
        status: 'active',
        metrics: {
          accuracy: 0.89,
          latency: 280,
          throughput: 760,
        },
        enabled: true,
        lastActivity: new Date(Date.now() - 300000).toISOString(),
      }
    ],
    systemMetrics: {
      cpuUtilization: Math.random() * 100,
      memoryUtilization: Math.random() * 100,
      requestsPerSecond: Math.floor(Math.random() * 1000),
      responseTimeMs: Math.floor(Math.random() * 200),
      errorRate: Math.random() * 5,
    },
    anomalies: [
      {
        id: 'anomaly-1',
        type: 'latency-spike',
        severity: 'medium',
        description: 'Unexpected latency increase in text processing',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        relatedComponentId: 'neural-text-processor',
      }
    ],
    trends: {
      requestVolume: 'increasing',
      errorRate: 'stable',
      responseTime: 'decreasing',
    },
    recommendations: [
      'Optimize image processing pipeline for better throughput',
      'Consider scaling up text processing resources during peak hours',
      'Implement caching layer for frequently analyzed content'
    ],
    
    // Model performance metrics with map array for chart
    modelPerformance: {
      accuracy: 0.921,
      precision: 0.934,
      recall: 0.897,
      f1Score: 0.915,
      latency: 143,
      throughput: 1580,
      map: [
        { key: 'Accuracy', value: 0.921 },
        { key: 'Precision', value: 0.934 },
        { key: 'Recall', value: 0.897 },
        { key: 'F1 Score', value: 0.915 },
      ]
    },
    
    // Operational metrics with change indicators
    operationalMetrics: {
      totalRequests: 15243982,
      successfulRequests: 15102456,
      failedRequests: 141526,
      averageResponseTime: 178.5,
      p95ResponseTime: 320,
      p99ResponseTime: 520,
      requestsPerMinute: 10240,
      errorRate: 0.93,
      activeConnections: 845,
      totalOperations: 24560389,
      operationsChange: 5.7,
      averageAccuracy: 0.921,
      accuracyChange: 1.2,
      responseTimeChange: -3.5,
      errorRateChange: -0.4
    },
    
    // Usage metrics
    usageMetrics: {
      dailyActiveUsers: 45920,
      monthlyActiveUsers: 982450,
      totalUsers: 1245600,
      sessionsPerUser: 4.3,
      averageSessionDuration: 318.5,
      retentionRate: 0.82,
      serviceTypeDistribution: [
        { name: "Text Analysis", value: 42 },
        { name: "Image Processing", value: 28 },
        { name: "Video Analysis", value: 16 },
        { name: "Audio Processing", value: 14 }
      ],
      resourceAllocation: [
        { name: "CPU", value: 35 },
        { name: "Memory", value: 28 },
        { name: "Network", value: 22 },
        { name: "Storage", value: 15 }
      ],
      dailyUsageTrend: [
        { date: "2023-04-22", value: 42500 },
        { date: "2023-04-23", value: 44200 },
        { date: "2023-04-24", value: 43800 },
        { date: "2023-04-25", value: 45100 },
        { date: "2023-04-26", value: 46300 },
        { date: "2023-04-27", value: 45800 },
        { date: "2023-04-28", value: 45920 }
      ]
    },
    
    // Advanced metrics with map for chart
    advancedMetrics: {
      resourceUtilization: 0.78,
      efficientUseScore: 0.85,
      loadBalancingEfficiency: 0.92,
      cachingEffectiveness: 0.74,
      algorithmicEfficiency: 0.89,
      map: [
        { key: "Resource Utilization", value: 0.78 },
        { key: "Efficient Use Score", value: 0.85 },
        { key: "Load Balancing", value: 0.92 },
        { key: "Caching Effectiveness", value: 0.74 },
        { key: "Algorithmic Efficiency", value: 0.89 }
      ]
    },
    
    // Correlation matrix with metrics for display
    correlationMatrix: {
      labels: ["CPU", "Memory", "Latency", "Throughput", "Error Rate"],
      values: [
        [1.0, 0.8, 0.7, -0.5, 0.3],
        [0.8, 1.0, 0.6, -0.4, 0.2],
        [0.7, 0.6, 1.0, -0.8, 0.5],
        [-0.5, -0.4, -0.8, 1.0, -0.6],
        [0.3, 0.2, 0.5, -0.6, 1.0]
      ],
      maxCorrelation: 0.8,
      minCorrelation: -0.8,
      averageCorrelation: 0.4,
      metrics: [
        { name: "CPU-Memory", value: 0.8 },
        { name: "Latency-Throughput", value: -0.8 },
        { name: "CPU-Error Rate", value: 0.3 },
        { name: "Memory-Throughput", value: -0.4 },
        { name: "Throughput-Error Rate", value: -0.6 }
      ]
    }
  };
};

// Generate mock performance forecast for predicting future trends
export const generatePerformanceForecast = (days: number): PerformanceTrend[] => {
  const trends: PerformanceTrend[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    trends.push({
      date: date.toISOString().split('T')[0],
      metrics: {
        expectedLoad: 0.6 + (Math.random() * 0.4),
        predictedResponseTime: 150 + (Math.random() * 100),
        predictedErrorRate: 0.5 + (Math.random() * 1.0),
        confidenceScore: 0.7 + (Math.random() * 0.25)
      }
    });
  }
  
  return trends;
};
