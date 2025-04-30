
import { NeuralAnalyticsReport, PerformanceTrend } from '@/services/neural/types/neuralAnalytics';
import { format, subDays, addDays } from 'date-fns';

/**
 * Generate mock analytics data for neural systems
 */
export function generateNeuralAnalytics(): NeuralAnalyticsReport {
  const now = new Date();
  const timestamp = now.toISOString();
  
  // Generate performance forecast data
  const performanceForecast = generatePerformanceForecast();
  
  return {
    timestamp,
    serviceMetrics: generateServiceMetrics(),
    systemMetrics: generateSystemMetrics(),
    anomalies: generateAnomalies(),
    trends: generateTrends(),
    recommendations: generateRecommendations(),
    modelPerformance: generateModelPerformance(),
    operationalMetrics: generateOperationalMetrics(),
    usageMetrics: generateUsageMetrics(),
    advancedMetrics: generateAdvancedMetrics(),
    correlationMatrix: generateCorrelationMatrix(),
    performanceForecast
  };
}

/**
 * Generate mock service metrics
 */
function generateServiceMetrics() {
  const serviceTypes = ['processor', 'analyzer', 'reasoner', 'memory', 'interface'];
  const statuses = ['active', 'active', 'active', 'maintenance', 'inactive'];
  
  return Array(5).fill(null).map((_, i) => ({
    id: `svc-${i + 1}`,
    name: `Neural ${serviceTypes[i % serviceTypes.length]} ${i + 1}`,
    type: serviceTypes[i % serviceTypes.length],
    status: statuses[i % statuses.length] as 'active' | 'inactive' | 'maintenance',
    metrics: {
      load: Math.random() * 100,
      latency: Math.round(Math.random() * 100 + 10),
      errorRate: Math.random() * 2,
      throughput: Math.round(Math.random() * 1000 + 100),
    },
    enabled: Math.random() > 0.1,
    lastActivity: new Date(Date.now() - Math.random() * 3600000).toISOString()
  }));
}

/**
 * Generate mock system metrics
 */
function generateSystemMetrics() {
  return {
    cpuUtilization: Math.random() * 90 + 10,
    memoryUtilization: Math.random() * 85 + 15,
    requestsPerSecond: Math.round(Math.random() * 500 + 50),
    responseTimeMs: Math.round(Math.random() * 200 + 30),
    errorRate: Math.random() * 1.5,
  };
}

/**
 * Generate mock anomalies
 */
function generateAnomalies() {
  const types = ['latency_spike', 'error_rate_increase', 'memory_leak', 'request_surge'];
  const severityLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  const now = new Date();
  
  // Generate between 0 and 3 anomalies
  const count = Math.floor(Math.random() * 3);
  
  return Array(count).fill(null).map((_, i) => ({
    id: `anomaly-${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
    description: `Detected unusual pattern in neural processing subsystem ${i + 1}`,
    timestamp: new Date(now.getTime() - Math.random() * 86400000).toISOString(),
    relatedComponentId: `svc-${Math.floor(Math.random() * 5) + 1}`
  }));
}

/**
 * Generate mock trends
 */
function generateTrends() {
  return {
    requestVolume: Math.random() > 0.5 ? 'increasing' : 'stable',
    errorRate: Math.random() > 0.7 ? 'increasing' : 'stable',
    responseTime: Math.random() > 0.6 ? 'stable' : 'decreasing',
  };
}

/**
 * Generate mock recommendations
 */
function generateRecommendations() {
  const possibleRecommendations = [
    'Optimize neural memory allocation for improved latency',
    'Scale cognitive processing units during peak hours',
    'Update connection weights in reasoning module',
    'Implement error recovery mechanisms in analyzer service',
    'Increase caching for frequently accessed memory patterns',
    'Reduce batch size for real-time processing jobs',
    'Implement circuit breakers for unstable downstream services',
    'Upgrade to latest neural processing model',
    'Adjust learning rate for better convergence',
    'Implement Blue-Green deployment for zero-downtime updates',
    'Consider A/B testing for new processing algorithm'
  ];
  
  // Select 2-5 random recommendations
  const count = Math.floor(Math.random() * 3) + 2;
  const recommendations = [];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * possibleRecommendations.length);
    recommendations.push(possibleRecommendations[index]);
    possibleRecommendations.splice(index, 1);
  }
  
  return recommendations;
}

/**
 * Generate mock model performance metrics
 */
function generateModelPerformance() {
  return {
    accuracy: Math.random() * 0.2 + 0.8, // 80-100%
    precision: Math.random() * 0.25 + 0.75, // 75-100%
    recall: Math.random() * 0.3 + 0.7, // 70-100%
    f1Score: Math.random() * 0.25 + 0.75, // 75-100%
    latency: Math.random() * 100 + 20, // 20-120ms
    throughput: Math.random() * 1000 + 500, // 500-1500 req/sec
    mapData: [
      { key: 'BLEU Score', value: Math.random() * 30 + 20 },
      { key: 'ROUGE Score', value: Math.random() * 40 + 30 },
      { key: 'Perplexity', value: Math.random() * 10 + 5 },
      { key: 'Cross-Entropy Loss', value: Math.random() * 0.5 + 0.1 }
    ]
  };
}

/**
 * Generate mock operational metrics
 */
function generateOperationalMetrics() {
  return {
    totalRequests: Math.round(Math.random() * 100000 + 50000),
    successfulRequests: Math.round(Math.random() * 95000 + 45000),
    failedRequests: Math.round(Math.random() * 5000),
    averageResponseTime: Math.random() * 100 + 50,
    p95ResponseTime: Math.random() * 200 + 100,
    p99ResponseTime: Math.random() * 300 + 200,
    requestsPerMinute: Math.round(Math.random() * 1000 + 500),
    errorRate: Math.random() * 2,
    activeConnections: Math.round(Math.random() * 100 + 50),
    totalOperations: Math.round(Math.random() * 500000 + 100000),
    operationsChange: Math.round(Math.random() * 20 - 5),
    averageAccuracy: Math.random() * 0.2 + 0.8,
    accuracyChange: (Math.random() * 4 - 2).toFixed(2),
    responseTimeChange: (Math.random() * 10 - 5).toFixed(2),
    errorRateChange: (Math.random() * 0.4 - 0.2).toFixed(2)
  };
}

/**
 * Generate mock usage metrics
 */
function generateUsageMetrics() {
  const now = new Date();
  const dailyUsageTrend = Array(14).fill(null).map((_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (13 - i));
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      value: Math.round(Math.random() * 10000 + 5000 + i * 200 + Math.sin(i) * 1000)
    };
  });
  
  return {
    dailyActiveUsers: Math.round(Math.random() * 50000 + 10000),
    monthlyActiveUsers: Math.round(Math.random() * 200000 + 50000),
    totalUsers: Math.round(Math.random() * 1000000 + 500000),
    sessionsPerUser: Math.random() * 5 + 1,
    averageSessionDuration: Math.round(Math.random() * 600 + 120),
    retentionRate: Math.random() * 0.4 + 0.6,
    serviceTypeDistribution: [
      { name: 'Cognitive', value: Math.random() * 100 },
      { name: 'Analytic', value: Math.random() * 100 },
      { name: 'Generative', value: Math.random() * 100 },
      { name: 'Predictive', value: Math.random() * 100 }
    ],
    resourceAllocation: [
      { name: 'Memory', value: Math.random() * 100 },
      { name: 'Processing', value: Math.random() * 100 },
      { name: 'Storage', value: Math.random() * 100 },
      { name: 'Bandwidth', value: Math.random() * 100 }
    ],
    dailyUsageTrend
  };
}

/**
 * Generate mock advanced metrics
 */
function generateAdvancedMetrics() {
  return {
    resourceUtilization: Math.random() * 0.3 + 0.7,
    efficientUseScore: Math.random() * 20 + 80,
    loadBalancingEfficiency: Math.random() * 0.3 + 0.7,
    cachingEffectiveness: Math.random() * 0.4 + 0.6,
    algorithmicEfficiency: Math.random() * 0.3 + 0.7,
    mapData: [
      { key: 'Model Latency', value: Math.random() * 100 + 50 },
      { key: 'Inference Cost', value: Math.random() * 0.1 + 0.01 },
      { key: 'Token Efficiency', value: Math.random() * 0.5 + 0.5 },
      { key: 'Energy Efficiency', value: Math.random() * 0.7 + 0.3 }
    ]
  };
}

/**
 * Generate mock correlation matrix
 */
function generateCorrelationMatrix() {
  const labels = ['CPU', 'Memory', 'Latency', 'ErrorRate', 'Throughput'];
  const n = labels.length;
  
  // Create correlation matrix (symmetric)
  const values: number[][] = [];
  for (let i = 0; i < n; i++) {
    values[i] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        values[i][j] = 1; // Diagonal is always 1 (perfect correlation)
      } else if (j > i) {
        values[i][j] = Math.round((Math.random() * 2 - 1) * 100) / 100; // Random between -1 and 1
      } else {
        values[i][j] = values[j][i]; // Make symmetric
      }
    }
  }
  
  // Calculate stats
  let sum = 0;
  let count = 0;
  let min = 1;
  let max = -1;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const val = Math.abs(values[i][j]);
        sum += val;
        count++;
        min = Math.min(min, val);
        max = Math.max(max, val);
      }
    }
  }
  
  return {
    labels,
    values,
    maxCorrelation: max,
    minCorrelation: min,
    averageCorrelation: sum / count,
    metricsList: labels.map(label => ({
      name: label,
      value: Math.random() * 100
    }))
  };
}

/**
 * Generate performance forecast data
 */
export function generatePerformanceForecast(): PerformanceTrend[] {
  const now = new Date();
  const forecast: PerformanceTrend[] = [];
  
  // Generate data for the last 7 days plus next 7 days (forecast)
  for (let i = -7; i < 8; i++) {
    const date = i < 0 ? subDays(now, Math.abs(i)) : addDays(now, i);
    
    // Base values with some randomization
    const baseLoad = i < 0 ? 5000 + Math.random() * 2000 : 5000 + i * 200 + Math.random() * 2000;
    const baseResponseTime = i < 0 ? 80 + Math.random() * 40 : 80 + i * 2 + Math.random() * 40;
    const baseErrorRate = i < 0 ? 0.01 + Math.random() * 0.005 : 0.01 + i * 0.001 + Math.random() * 0.005;
    
    // Add some sinusoidal variation to make it look more realistic
    const dayFactor = Math.sin((i + 7) * 0.8) * 0.2;
    
    forecast.push({
      date: format(date, 'yyyy-MM-dd'),
      metrics: {
        expectedLoad: Math.round(baseLoad * (1 + dayFactor)),
        predictedResponseTime: Math.round(baseResponseTime * (1 + dayFactor * 0.5)),
        predictedErrorRate: Number((baseErrorRate * (1 + dayFactor * 0.3)).toFixed(4)),
        confidenceScore: Number((0.9 - Math.abs(i) * 0.03).toFixed(2))
      }
    });
  }
  
  return forecast;
}

/**
 * Generate hourly trend data for a specific metric
 */
export function generateHourlyTrendData(metricKey: string, days: number = 3): Array<{timestamp: string, value: number}> {
  const now = new Date();
  const data: Array<{timestamp: string, value: number}> = [];
  
  // Hours to go back: days * 24
  const hoursToGenerate = days * 24;
  
  // Base values for different metrics
  let baseValue: number;
  let volatility: number;
  let trend: number;
  
  switch(metricKey) {
    case 'responseTime':
      baseValue = 80;
      volatility = 15;
      trend = -0.01; // Slightly decreasing over time
      break;
    case 'accuracy':
      baseValue = 97;
      volatility = 1;
      trend = 0.005; // Slightly increasing over time
      break;
    case 'errorRate':
      baseValue = 1.5;
      volatility = 0.5;
      trend = -0.002; // Slightly decreasing over time
      break;
    case 'operations':
      baseValue = 5000;
      volatility = 1000;
      trend = 0.5; // Increasing over time
      break;
    default:
      baseValue = 100;
      volatility = 20;
      trend = 0;
  }
  
  // Generate per-hour data with realistic patterns
  for (let i = hoursToGenerate; i >= 0; i--) {
    const hourTime = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourOfDay = hourTime.getHours();
    
    // Daily pattern factors - busier during business hours
    const timeOfDayFactor = hourOfDay >= 8 && hourOfDay <= 18 
      ? 1 + Math.sin((hourOfDay - 8) * Math.PI / 10) * 0.3 // peak at mid-day
      : 0.7 + Math.random() * 0.1; // quieter at night
    
    // Weekly pattern - quieter on weekends
    const dayOfWeek = hourTime.getDay(); // 0 = Sunday, 6 = Saturday  
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1;
    
    // Trend factor - gradual change over time
    const trendFactor = 1 + (hoursToGenerate - i) * trend / 100;
    
    // Random volatility
    const randomFactor = 1 + (Math.random() - 0.5) * 0.1;
    
    // Calculate value with all factors
    let value = baseValue * timeOfDayFactor * weekendFactor * trendFactor * randomFactor;
    
    // Add occasional spikes
    if (Math.random() > 0.97) {
      value *= 1.5;
    }
    
    // Format timestamp
    const timestamp = format(hourTime, "yyyy-MM-dd'T'HH:mm:ss");
    
    data.push({ timestamp, value });
  }
  
  return data;
}

/**
 * Generate daily trend data for a specific metric
 */
export function generateDailyTrendData(metricKey: string, days: number = 30): Array<{date: string, value: number}> {
  const now = new Date();
  const data: Array<{date: string, value: number}> = [];
  
  // Base values for different metrics
  let baseValue: number;
  let volatility: number;
  let trend: number;
  
  switch(metricKey) {
    case 'responseTime':
      baseValue = 80;
      volatility = 10;
      trend = -0.05; // Slightly decreasing over time
      break;
    case 'accuracy':
      baseValue = 97;
      volatility = 0.5;
      trend = 0.02; // Slightly increasing over time
      break;
    case 'errorRate':
      baseValue = 1.5;
      volatility = 0.3;
      trend = -0.01; // Slightly decreasing over time
      break;
    case 'operations':
      baseValue = 5000;
      volatility = 500;
      trend = 2; // Increasing over time
      break;
    default:
      baseValue = 100;
      volatility = 10;
      trend = 0;
  }
  
  // Generate data with weekly patterns
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Weekly pattern - quieter on weekends
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1;
    
    // Monthly pattern - busier at month start and end
    const dayOfMonth = date.getDate();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const monthFactor = (dayOfMonth <= 5 || dayOfMonth >= daysInMonth - 5) ? 1.2 : 1;
    
    // Trend factor - gradual change over time
    const trendFactor = 1 + (days - i) * trend / 100;
    
    // Random volatility (lower than hourly data)
    const randomFactor = 1 + (Math.random() - 0.5) * 0.05;
    
    // Calculate value with all factors
    let value = baseValue * weekendFactor * monthFactor * trendFactor * randomFactor;
    
    // Format date
    const dateString = format(date, 'yyyy-MM-dd');
    
    data.push({ date: dateString, value });
  }
  
  return data;
}
