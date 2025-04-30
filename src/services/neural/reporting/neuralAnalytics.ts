import { NeuralAnalyticsReport, PerformanceTrend } from '@/services/neural/types/neuralAnalytics';

// Helper function to generate random number within range
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Helper function to generate trend data with realistic patterns
function generateTrendData(
  days: number = 30, 
  baseValue: number, 
  volatility: number, 
  trend: 'up' | 'down' | 'stable' = 'stable',
  min: number = 0
): Array<{ date: string, value: number }> {
  const result = [];
  const now = new Date();
  let value = baseValue;
  
  // Trend factors
  const trendFactor = trend === 'up' ? 0.02 : trend === 'down' ? -0.02 : 0;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some randomness and trend
    const change = (Math.random() * volatility * 2 - volatility) + (value * trendFactor);
    value = Math.max(min, value + change);
    
    result.push({
      date: date.toISOString(),
      value: Number(value.toFixed(2))
    });
  }
  
  return result;
}

// Generate a performance forecast
export function generatePerformanceForecast(days: number = 30): PerformanceTrend[] {
  const trends: PerformanceTrend[] = [];
  const now = new Date();
  
  // Initial values
  let expectedLoad = 5000 + Math.random() * 1000;
  let predictedResponseTime = 85 + Math.random() * 20;
  let predictedErrorRate = 0.01 + Math.random() * 0.01;
  let confidenceScore = 0.9;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - days + i + 1);
    
    // Add daily variations with some patterns
    // More load on weekdays
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Weekend load is typically lower
    const loadFactor = isWeekend ? 0.7 : 1.0 + (dayOfWeek === 1 ? 0.2 : 0); // Mondays have higher load
    
    // Add some random daily fluctuation
    expectedLoad = Math.max(3000, expectedLoad * (1 + (Math.random() * 0.06 - 0.03)) * loadFactor);
    
    // Response time tends to increase with load, but also has random variation
    predictedResponseTime = Math.max(60, 
      predictedResponseTime * (1 + (Math.random() * 0.04 - 0.02) + (expectedLoad > 5500 ? 0.01 : -0.005))
    );
    
    // Error rate can spike occasionally
    if (Math.random() < 0.05) {
      predictedErrorRate = predictedErrorRate * (1 + Math.random() * 0.5);
    } else {
      // Otherwise it fluctuates normally
      predictedErrorRate = Math.max(0.001, predictedErrorRate * (1 + (Math.random() * 0.04 - 0.02)));
    }
    
    // Confidence decreases for future predictions
    confidenceScore = Math.max(0.5, 0.95 - (i/days) * 0.3 - Math.random() * 0.05);
    
    trends.push({
      date: date.toISOString(),
      metrics: {
        expectedLoad: Math.round(expectedLoad),
        predictedResponseTime: Number(predictedResponseTime.toFixed(1)),
        predictedErrorRate: Number(predictedErrorRate.toFixed(4)),
        confidenceScore: Number(confidenceScore.toFixed(2))
      }
    });
  }
  
  return trends;
}

// Generate synthetic neural analytics data for demo purposes
export function generateNeuralAnalytics(): NeuralAnalyticsReport {
  const timestamp = new Date().toISOString();
  const cpuUtilization = 60 + Math.random() * 20;
  const memoryUtilization = 50 + Math.random() * 30;
  const requestsPerSecond = 80 + Math.random() * 40;
  const responseTimeMs = 90 + Math.random() * 30;
  const errorRate = 0.5 + Math.random() * 1.5;
  
  // Generate performance forecast data
  const performanceForecast = generatePerformanceForecast();
  
  // Calculate changes for operational metrics
  const responseTimeChange = Number((Math.random() * 10 - 5).toFixed(1));
  const errorRateChange = Number((Math.random() * 1 - 0.5).toFixed(1));
  const operationsChange = Number((Math.random() * 8 - 2).toFixed(1));
  const accuracyChange = Number((Math.random() * 3 - 1).toFixed(1));
  
  // Generate recommendation based on metrics
  const recommendations: string[] = [];
  if (cpuUtilization > 75) {
    recommendations.push("Consider scaling out neural processing capacity to reduce CPU load");
  }
  if (memoryUtilization > 70) {
    recommendations.push("Memory utilization is high - optimize cache usage for neural models");
  }
  if (errorRate > 1.5) {
    recommendations.push("Error rate exceeds threshold - verify input data quality and model calibration");
  }
  if (responseTimeMs > 110) {
    recommendations.push("Response latency is increasing - consider optimizing neural inference paths");
  }
  if (recommendations.length === 0) {
    recommendations.push("All neural systems operating within optimal parameters");
  }
  
  // Randomly decide if we should generate anomalies
  const hasAnomalies = Math.random() < 0.7; // 70% chance of having anomalies
  const anomalies = hasAnomalies ? [
    {
      id: `anom-${Math.floor(Math.random() * 1000)}`,
      type: Math.random() < 0.5 ? 'Performance Degradation' : 'Error Rate Spike',
      severity: Math.random() < 0.2 ? 'high' : Math.random() < 0.6 ? 'medium' : 'low',
      description: Math.random() < 0.5 
        ? 'Unusual response time patterns detected in neural processing pipeline' 
        : 'Abnormal error rate detected in semantic analysis module',
      timestamp: new Date().toISOString(),
      relatedComponentId: `comp-${Math.floor(Math.random() * 100)}`
    }
  ] : [];
  
  // Generate neural service metrics
  const serviceMetrics = [
    {
      id: 'svc-1',
      name: 'Neural Language Processor',
      type: 'language-processing',
      status: 'active' as const,
      metrics: {
        throughput: 450 + Math.random() * 100,
        latency: 75 + Math.random() * 25,
        errorRate: 0.4 + Math.random() * 0.8,
      },
      enabled: true,
      lastActivity: new Date().toISOString()
    },
    {
      id: 'svc-2',
      name: 'Visual Recognition Service',
      type: 'computer-vision',
      status: 'active' as const,
      metrics: {
        throughput: 280 + Math.random() * 80,
        latency: 110 + Math.random() * 40,
        errorRate: 0.8 + Math.random() * 1.2,
      },
      enabled: true,
      lastActivity: new Date().toISOString()
    }
  ];
  
  // Generate usage metrics with daily trend
  const usageTrend = generateTrendData(30, 1200, 200, 'up', 800);
  
  return {
    timestamp,
    systemMetrics: {
      cpuUtilization,
      memoryUtilization,
      requestsPerSecond,
      responseTimeMs,
      errorRate,
    },
    serviceMetrics,
    anomalies,
    trends: {
      requestVolume: 'increasing',
      errorRate: errorRateChange > 0 ? 'increasing' : 'decreasing',
      responseTime: responseTimeChange > 0 ? 'increasing' : 'decreasing',
    },
    recommendations,
    modelPerformance: {
      accuracy: 0.94 + Math.random() * 0.05,
      precision: 0.92 + Math.random() * 0.04,
      recall: 0.90 + Math.random() * 0.06,
      f1Score: 0.91 + Math.random() * 0.05,
      latency: 95 + Math.random() * 20,
      throughput: 800 + Math.random() * 200,
      mapData: [
        { key: 'textAnalysis', value: 0.95 + Math.random() * 0.04 },
        { key: 'imageClassification', value: 0.92 + Math.random() * 0.05 },
        { key: 'sentimentAnalysis', value: 0.89 + Math.random() * 0.06 }
      ]
    },
    operationalMetrics: {
      totalRequests: Math.floor(1200000 + Math.random() * 200000),
      successfulRequests: Math.floor(1180000 + Math.random() * 190000),
      failedRequests: Math.floor(10000 + Math.random() * 5000),
      averageResponseTime: responseTimeMs,
      p95ResponseTime: responseTimeMs * 1.5,
      p99ResponseTime: responseTimeMs * 2.2,
      requestsPerMinute: Math.floor(requestsPerSecond * 60),
      errorRate: errorRate,
      activeConnections: Math.floor(200 + Math.random() * 100),
      totalOperations: Math.floor(5000000 + Math.random() * 1000000),
      operationsChange: operationsChange,
      averageAccuracy: 0.94 + Math.random() * 0.05,
      accuracyChange: accuracyChange,
      responseTimeChange: responseTimeChange,
      errorRateChange: errorRateChange,
    },
    usageMetrics: {
      dailyActiveUsers: Math.floor(5000 + Math.random() * 1000),
      monthlyActiveUsers: Math.floor(50000 + Math.random() * 10000),
      totalUsers: Math.floor(100000 + Math.random() * 20000),
      sessionsPerUser: 3 + Math.random() * 2,
      averageSessionDuration: 600 + Math.random() * 300,
      retentionRate: 0.7 + Math.random() * 0.2,
      serviceTypeDistribution: [
        { name: 'Text Processing', value: 45 + Math.random() * 10 },
        { name: 'Image Analysis', value: 30 + Math.random() * 10 },
        { name: 'Voice Processing', value: 25 + Math.random() * 10 }
      ],
      resourceAllocation: [
        { name: 'Language Models', value: 40 + Math.random() * 10 },
        { name: 'Vision Models', value: 35 + Math.random() * 10 },
        { name: 'Infrastructure', value: 25 + Math.random() * 5 }
      ],
      dailyUsageTrend: usageTrend
    },
    advancedMetrics: {
      resourceUtilization: 0.65 + Math.random() * 0.2,
      efficientUseScore: 0.75 + Math.random() * 0.15,
      loadBalancingEfficiency: 0.8 + Math.random() * 0.15,
      cachingEffectiveness: 0.7 + Math.random() * 0.2,
      algorithmicEfficiency: 0.85 + Math.random() * 0.1,
      mapData: [
        { key: 'modelSize', value: 2.4 + Math.random() * 0.4 },
        { key: 'inferenceTime', value: 45 + Math.random() * 10 },
        { key: 'memoryFootprint', value: 1.8 + Math.random() * 0.3 }
      ]
    },
    correlationMatrix: {
      labels: ['Response Time', 'Error Rate', 'User Load', 'CPU Usage'],
      values: [
        [1.0, 0.4, 0.7, 0.8],
        [0.4, 1.0, 0.3, 0.5],
        [0.7, 0.3, 1.0, 0.9],
        [0.8, 0.5, 0.9, 1.0]
      ],
      maxCorrelation: 0.9,
      minCorrelation: 0.3,
      averageCorrelation: 0.6,
      metricsList: [
        { name: 'Response/CPU', value: 0.8 },
        { name: 'Error/User', value: 0.3 },
        { name: 'Load/Response', value: 0.7 }
      ]
    },
    performanceForecast
  };
}
