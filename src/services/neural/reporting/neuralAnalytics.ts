
import { NeuralAnalyticsReport } from "@/services/neural/types/neuralAnalytics";

/**
 * Generate mock neural analytics data for development and testing
 */
export function generateMockNeuralAnalytics(): NeuralAnalyticsReport {
  const now = new Date();
  
  // Generate performance forecast data
  const performanceForecast = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(now);
    date.setHours(date.getHours() + i);
    
    // Add some variability to make the chart interesting
    const baseResponseTime = 150 + Math.sin(i / 4) * 50;
    const baseErrorRate = 0.02 + (Math.cos(i / 6) * 0.015);
    const baseLoad = 250 + (Math.sin(i / 3) * 100) + (i % 8 === 0 ? 150 : 0);
    
    return {
      date: date.toISOString(),
      metrics: {
        expectedLoad: Math.max(50, Math.round(baseLoad + (Math.random() * 25 - 12.5))),
        predictedResponseTime: parseFloat((baseResponseTime + (Math.random() * 20 - 10)).toFixed(1)),
        predictedErrorRate: parseFloat((baseErrorRate + (Math.random() * 0.005)).toFixed(4)),
        confidenceScore: 0.8 + (Math.random() * 0.15)
      }
    };
  });
  
  // Generate some anomalies with random data
  const anomalies = Math.random() > 0.7 ? [] : Array.from(
    { length: Math.floor(Math.random() * 4) + 1 }, 
    (_, i) => {
      const severityOptions = ['low', 'medium', 'high'];
      const typeOptions = [
        'Memory Spike', 
        'Latency Anomaly', 
        'Error Rate Spike',
        'Neural Network Degradation'
      ];
      
      const aDate = new Date();
      aDate.setMinutes(aDate.getMinutes() - Math.floor(Math.random() * 120));
      
      return {
        id: `anomaly-${Date.now()}-${i}`,
        type: typeOptions[Math.floor(Math.random() * typeOptions.length)],
        severity: severityOptions[Math.floor(Math.random() * severityOptions.length)],
        description: `Detected unusual pattern in system behavior requiring investigation`,
        timestamp: aDate.toISOString(),
        relatedComponentId: `component-${Math.floor(Math.random() * 1000)}`
      };
    }
  );

  return {
    timestamp: now.toISOString(),
    serviceMetrics: [
      {
        id: "neural-core-1",
        name: "Neural Core Processor",
        type: "core",
        status: "active",
        metrics: {
          utilization: 68.5,
          errorRate: 0.42,
          responseTime: 124.6
        },
        enabled: true,
        lastActivity: now.toISOString()
      },
      {
        id: "data-transformer-1",
        name: "Data Transformer",
        type: "transformer",
        status: "active",
        metrics: {
          utilization: 45.2,
          errorRate: 0.18,
          responseTime: 87.3
        },
        enabled: true,
        lastActivity: new Date(now.getTime() - 320000).toISOString()
      }
    ],
    systemMetrics: {
      cpuUtilization: 62.5,
      memoryUtilization: 75.8,
      requestsPerSecond: 342.7,
      responseTimeMs: 165.2,
      errorRate: 1.8
    },
    anomalies,
    trends: {
      requestVolume: "increasing",
      errorRate: "stable",
      responseTime: "decreasing"
    },
    recommendations: [
      "Consider scaling neural processing capacity to handle increased load",
      "Optimize memory allocation for improved performance",
      "Review neural network models for potential optimization"
    ],
    modelPerformance: {
      accuracy: 0.967,
      precision: 0.948,
      recall: 0.972,
      f1Score: 0.96,
      latency: 142.8,
      throughput: 486.2,
      mapData: [
        { key: "accuracy", value: 0.967 },
        { key: "precision", value: 0.948 },
        { key: "recall", value: 0.972 },
        { key: "f1Score", value: 0.96 }
      ]
    },
    operationalMetrics: {
      totalRequests: 24785,
      successfulRequests: 24331,
      failedRequests: 454,
      averageResponseTime: 165.2,
      p95ResponseTime: 312.8,
      p99ResponseTime: 487.3,
      requestsPerMinute: 412.3,
      errorRate: 1.8,
      activeConnections: 182,
      totalOperations: 78462,
      operationsChange: 7.2,
      averageAccuracy: 96.7,
      accuracyChange: 1.2,
      responseTimeChange: -5.7,
      errorRateChange: -0.3
    },
    usageMetrics: {
      dailyActiveUsers: 2485,
      monthlyActiveUsers: 16842,
      totalUsers: 32750,
      sessionsPerUser: 3.7,
      averageSessionDuration: 428,
      retentionRate: 78.2,
      serviceTypeDistribution: [
        { name: "Core Services", value: 62.3 },
        { name: "Advanced Features", value: 24.7 },
        { name: "Experimental", value: 13.0 }
      ],
      resourceAllocation: [
        { name: "CPU", value: 62.5 },
        { name: "Memory", value: 75.8 },
        { name: "Network", value: 48.2 }
      ],
      dailyUsageTrend: Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (13 - i));
        return {
          date: d.toISOString().split('T')[0],
          value: 2000 + Math.floor(Math.random() * 1000)
        };
      })
    },
    advancedMetrics: {
      resourceUtilization: 68.3,
      efficientUseScore: 84.6,
      loadBalancingEfficiency: 92.1,
      cachingEffectiveness: 76.8,
      algorithmicEfficiency: 87.5,
      mapData: [
        { key: "resourceUtilization", value: 68.3 },
        { key: "efficientUseScore", value: 84.6 },
        { key: "loadBalancingEfficiency", value: 92.1 },
        { key: "cachingEffectiveness", value: 76.8 },
        { key: "algorithmicEfficiency", value: 87.5 }
      ]
    },
    correlationMatrix: {
      labels: ["CPU", "Memory", "Requests", "Errors"],
      values: [
        [1.0, 0.72, 0.84, 0.31],
        [0.72, 1.0, 0.65, 0.28],
        [0.84, 0.65, 1.0, 0.58],
        [0.31, 0.28, 0.58, 1.0]
      ],
      maxCorrelation: 0.84,
      minCorrelation: 0.28,
      averageCorrelation: 0.56,
      metricsList: [
        { name: "CPU-Requests", value: 0.84 },
        { name: "CPU-Memory", value: 0.72 },
        { name: "Requests-Errors", value: 0.58 }
      ]
    },
    performanceForecast
  };
}

/**
 * Generate detailed performance metrics for specific components
 */
export function generateDetailedPerformanceMetrics() {
  const now = new Date();
  
  return {
    components: [
      {
        id: "neural-core-1",
        name: "Neural Core Processor",
        metrics: {
          processingCapacity: 92.6,
          responseTime: 124.6,
          errorRate: 0.42,
          utilizationRate: 68.5,
          sessionHandlingScore: 94.2,
          lastOptimized: new Date(now.getTime() - 86400000).toISOString()
        }
      },
      {
        id: "data-transformer-1",
        name: "Data Transformer",
        metrics: {
          processingCapacity: 87.3,
          responseTime: 87.3,
          errorRate: 0.18,
          utilizationRate: 45.2,
          dataIntegrityScore: 99.8,
          lastOptimized: new Date(now.getTime() - 43200000).toISOString()
        }
      }
    ],
    systemHealth: {
      overallScore: 92.4,
      critical: false,
      components: {
        core: 94.8,
        memory: 88.3,
        network: 96.5,
        storage: 90.2
      },
      recommendations: [
        "Memory optimization recommended",
        "Consider network capacity expansion for future growth"
      ]
    },
    historicalPerformance: Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      
      // Generate some patterns in the data
      const baseScore = 90 + Math.sin(i / 5) * 5;
      const baseUtilization = 60 + Math.sin(i / 7) * 15;
      
      return {
        date: d.toISOString().split('T')[0],
        score: parseFloat((baseScore + (Math.random() * 2 - 1)).toFixed(1)),
        utilization: parseFloat((baseUtilization + (Math.random() * 5)).toFixed(1)),
        errors: Math.floor(Math.random() * 5) + (i % 10 === 0 ? 8 : 0)
      };
    })
  };
}
