
// Mock data generation for neural analytics
// In a real implementation, these would be API calls to the backend

export const generateMockNeuralAnalytics = () => {
  // Generate random performance metrics
  const generateRandomMetric = (base: number, variance: number) => {
    return Math.round((base + (Math.random() * 2 - 1) * variance) * 10) / 10;
  };

  const systemMetrics = {
    cpuUsage: generateRandomMetric(45, 10),
    memoryUsage: generateRandomMetric(38, 8),
    responseTimeMs: generateRandomMetric(120, 30),
    errorRate: generateRandomMetric(0.8, 0.3)
  };

  const modelPerformance = {
    accuracy: generateRandomMetric(0.92, 0.05),
    precision: generateRandomMetric(0.91, 0.04),
    recall: generateRandomMetric(0.89, 0.06),
    f1Score: generateRandomMetric(0.90, 0.05)
  };

  // Generate operational metrics
  const operationalMetrics = {
    totalOperations: Math.floor(10000 + Math.random() * 5000),
    successfulOperations: Math.floor(9400 + Math.random() * 500),
    failedOperations: Math.floor(50 + Math.random() * 30),
    operationsPerSecond: Math.floor(100 + Math.random() * 50),
    responseTimeChange: Math.round((Math.random() * 2 - 0.5) * 10) / 10,
    accuracyChange: Math.round((Math.random() * 2 - 0.3) * 10) / 10,
    operationsChange: Math.round((Math.random() * 30 - 5)),
    errorRateChange: Math.round((Math.random() * 2 - 1.2) * 10) / 10
  };

  // Generate time series forecast data
  const performanceForecast = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() + i);
    
    performanceForecast.push({
      date: date.toISOString(),
      metrics: {
        predictedLoad: Math.round(45 + Math.sin(i / 6) * 20 + Math.random() * 5),
        predictedResponseTime: Math.round(120 + Math.sin(i / 8) * 40 + Math.random() * 10),
        predictedErrorRate: Math.max(0, Math.round((0.8 + Math.sin(i / 12) * 0.5 + Math.random() * 0.3) * 100) / 100),
        confidence: Math.round((0.95 - i * 0.01) * 100) / 100
      }
    });
  }

  return {
    timestamp: new Date().toISOString(),
    systemMetrics,
    modelPerformance,
    operationalMetrics,
    performanceForecast,
    systemHealth: {
      status: systemMetrics.errorRate > 2 ? 'warning' : 'healthy',
      uptimeHours: Math.floor(Math.random() * 720),
      lastMaintenanceDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  };
};

export const generateDetailedPerformanceMetrics = () => {
  // Generate 24 hours of data points
  const hoursData = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const hourTime = new Date(now);
    hourTime.setHours(now.getHours() - 24 + i);
    
    hoursData.push({
      timestamp: hourTime.toISOString(),
      metrics: {
        cpuUsage: Math.round(40 + Math.sin(i / 6) * 15 + Math.random() * 10),
        memoryUsage: Math.round(35 + Math.sin(i / 8) * 10 + Math.random() * 8),
        gpuUsage: Math.round(30 + Math.sin(i / 4) * 20 + Math.random() * 15),
        requestsPerSecond: Math.round(80 + Math.sin(i / 3) * 40 + Math.random() * 20),
        responseTimeMs: Math.round(110 + Math.sin(i / 5) * 30 + Math.random() * 15),
        errorRate: Math.max(0, Math.round((0.5 + Math.sin(i / 10) * 0.4 + Math.random() * 0.3) * 100) / 100)
      }
    });
  }
  
  return {
    timeSeriesData: hoursData,
    anomalies: [
      {
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        metric: 'memoryUsage',
        expected: 42,
        actual: 68,
        severity: 'medium',
        resolved: true
      },
      {
        timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
        metric: 'errorRate',
        expected: 0.6,
        actual: 2.3,
        severity: 'high',
        resolved: false
      }
    ],
    recommendations: [
      "Consider scaling neural processing capacity to handle peak loads",
      "Implement additional memory optimization to reduce spikes",
      "Schedule model retraining to address accuracy drift"
    ],
    trendsAnalysis: {
      cpuTrend: 'stable',
      memoryTrend: 'increasing',
      responseTrend: 'improving',
      errorRateTrend: 'stable'
    }
  };
};
