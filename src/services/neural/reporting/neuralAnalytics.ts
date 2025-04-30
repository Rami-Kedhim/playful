
// This file provides mock data for neural analytics
// In a production environment, this would be replaced with real API calls

export function generateMockNeuralAnalytics() {
  return {
    systemMetrics: {
      responseTimeMs: 120 + Math.random() * 80,
      errorRate: 0.02 + Math.random() * 0.03,
      throughput: 25 + Math.random() * 15,
      cpuUtilization: 0.45 + Math.random() * 0.2,
      memoryUtilization: 0.55 + Math.random() * 0.15,
      networkLatency: 75 + Math.random() * 25
    },
    modelPerformance: {
      accuracy: 0.92 + Math.random() * 0.07,
      precision: 0.91 + Math.random() * 0.08,
      recall: 0.89 + Math.random() * 0.09,
      f1Score: 0.90 + Math.random() * 0.08
    },
    operationalMetrics: {
      uptime: 99.98,
      totalOperations: Math.floor(50000 + Math.random() * 10000),
      operationsChange: -2 + Math.random() * 10,
      responseTimeChange: -5 + Math.random() * 10,
      accuracyChange: -1 + Math.random() * 5,
      errorRateChange: Math.random() > 0.5 ? (2 + Math.random() * 3) : (-2 - Math.random() * 3)
    },
    performanceTrend: Array(24).fill(0).map((_, i) => ({
      timestamp: new Date(Date.now() - (24 - i) * 60 * 60 * 1000).toISOString(),
      responseTime: 110 + Math.sin(i / 3) * 30 + Math.random() * 20,
      accuracy: 91 + Math.cos(i / 5) * 5 + Math.random() * 3,
      errorRate: 2 + Math.sin(i / 4) * 1 + Math.random()
    })),
    performanceForecast: Array(24).fill(0).map((_, i) => ({
      date: new Date(Date.now() + i * 60 * 60 * 1000).toISOString(),
      metrics: {
        predictedResponseTime: 120 + Math.sin(i / 6) * 20 + Math.random() * 15,
        predictedErrorRate: 0.02 + Math.sin(i / 8) * 0.01 + Math.random() * 0.01,
        expectedLoad: 100 + Math.sin(i / 4) * 30 + Math.random() * 20
      }
    })),
    recommendations: [
      "Optimize response handling in the Lucie module to improve latency",
      "Consider scaling up resources during peak usage hours (18:00-22:00)",
      "Implement batch processing for non-critical operations to reduce system load",
      "Activate advanced caching for frequency-accessed persona data",
      "Update the neural model to version 3.4.2 for improved accuracy"
    ]
  };
}

export function generateDetailedPerformanceMetrics() {
  return {
    processingMetrics: {
      averageThroughput: 42.5,
      peakThroughput: 78.2,
      bottlenecks: [
        { module: "Hermes", impact: "High", recommendation: "Increase flow capacity" },
        { module: "Oxum", impact: "Medium", recommendation: "Optimize boost allocation" }
      ]
    },
    resourceAllocation: {
      cpu: {
        usage: 0.68,
        distribution: [
          { module: "Lucie", percent: 40 },
          { module: "Hermes", percent: 25 },
          { module: "Oxum", percent: 20 },
          { module: "Orus", percent: 10 },
          { module: "Other", percent: 5 }
        ]
      },
      memory: {
        usage: 0.72,
        distribution: [
          { module: "Lucie", percent: 45 },
          { module: "Hermes", percent: 20 },
          { module: "Oxum", percent: 15 },
          { module: "Orus", percent: 15 },
          { module: "Other", percent: 5 }
        ]
      }
    },
    modelPerformanceDetails: {
      accuracyByDomain: [
        { domain: "Persona Verification", accuracy: 0.98 },
        { domain: "Content Moderation", accuracy: 0.95 },
        { domain: "User Intent", accuracy: 0.87 },
        { domain: "Flow Prediction", accuracy: 0.83 }
      ],
      trainingStatus: {
        lastTraining: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        samples: 124567,
        epochsCompleted: 42,
        improvementFromBaseline: "12.5%"
      }
    },
    integrations: {
      services: [
        { name: "Persona Service", status: "Healthy", latency: 28 },
        { name: "Payment Gateway", status: "Healthy", latency: 145 },
        { name: "Content Delivery", status: "Degraded", latency: 310 },
        { name: "Analytics Pipeline", status: "Healthy", latency: 67 }
      ]
    }
  };
}
