
import { useState, useEffect, useCallback } from 'react';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';
import { SystemHealthMetrics } from '@/services/neural/types/neuralHub';
import { neuralMetrics } from '@/services/neural/reporting/neuralMetrics';

export interface NeuralSystemMetricsData {
  systemLoad: number;
  memoryAllocation: number;
  networkThroughput: number;
  activeModels: number;
  requestRate: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface NeuralSystemPerformanceData {
  processingEfficiency: number;
  accuracyRate: number;
  processingTrend: 'up' | 'down';
  accuracyTrend: 'up' | 'down';
  recommendations: string[];
  history: number[];
}

export interface NeuralSystemLogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

export function useNeuralSystemMetrics() {
  const [metrics, setMetrics] = useState<NeuralSystemMetricsData | null>(null);
  const [performance, setPerformance] = useState<NeuralSystemPerformanceData | null>(null);
  const [logs, setLogs] = useState<NeuralSystemLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  // Function to convert system health metrics to our format
  const convertHealthMetricsToSystemMetrics = (healthMetrics: SystemHealthMetrics): NeuralSystemMetricsData => {
    return {
      systemLoad: Math.round(healthMetrics.load * 100),
      memoryAllocation: Math.round(healthMetrics.memoryUtilization * 100),
      networkThroughput: parseFloat((Math.random() * 7 + 3).toFixed(1)), // Simulated network throughput
      activeModels: Math.floor(Math.random() * 5) + 2, // Simulated active models count
      requestRate: Math.floor(healthMetrics.operationsPerSecond / 100),
      averageResponseTime: Math.round(healthMetrics.responseTime),
      errorRate: parseFloat((healthMetrics.errorRate * 100).toFixed(2))
    };
  };
  
  // Function to generate performance data based on health metrics
  const generatePerformanceData = (healthMetrics: SystemHealthMetrics): NeuralSystemPerformanceData => {
    // Calculate synthetic performance metrics from health metrics
    const processingEfficiency = Math.round((1 - healthMetrics.memoryUtilization) * (1 - healthMetrics.errorRate) * 100);
    const accuracyRate = Math.round((1 - healthMetrics.errorRate) * (healthMetrics.stability) * 100);
    
    // Generate random history data
    const history = Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 40);
    
    // Generate recommendations based on metrics
    const recommendations = [];
    if (healthMetrics.load > 0.7) {
      recommendations.push("Consider scaling neural processing capacity to handle current load");
    }
    if (healthMetrics.memoryUtilization > 0.8) {
      recommendations.push("Memory usage high - optimize model caching strategy");
    }
    if (healthMetrics.errorRate > 0.05) {
      recommendations.push("Error rate above threshold - review model validation logic");
    }
    if (healthMetrics.responseTime > 100) {
      recommendations.push("Response time elevated - consider query optimization");
    }
    // Add at least one recommendation if empty
    if (recommendations.length === 0) {
      recommendations.push("All systems operating within optimal parameters");
    }
    
    return {
      processingEfficiency,
      accuracyRate,
      processingTrend: Math.random() > 0.5 ? 'up' : 'down',
      accuracyTrend: Math.random() > 0.3 ? 'up' : 'down', // Bias toward improving accuracy
      recommendations,
      history
    };
  };
  
  // Function to generate simulated log entries
  const generateLogEntries = (): NeuralSystemLogEntry[] => {
    const logMessages = [
      { level: 'info', message: 'Neural system startup complete' },
      { level: 'info', message: 'Model cache optimized' },
      { level: 'info', message: 'Hermes-Oxum integration verified' },
      { level: 'info', message: 'Periodic health check completed' },
      { level: 'warning', message: 'Memory allocation approaching threshold' },
      { level: 'warning', message: 'Network latency increased' },
      { level: 'warning', message: 'Model response time degraded' },
      { level: 'error', message: 'Failed to load optimization parameters' },
      { level: 'error', message: 'Neural engine connection timeout' },
      { level: 'info', message: 'Queue processing statistics updated' }
    ];
    
    // Generate timestamps for the past hour with decreasing intervals
    const now = new Date();
    
    return Array.from({ length: 10 }, (_, index) => {
      const minutesAgo = Math.floor((index * index) / 2); // Non-linear time distribution
      const timestamp = new Date(now.getTime() - minutesAgo * 60000);
      const timeString = timestamp.toTimeString().substring(0, 8);
      
      // Select a random message, with errors being less common
      const messageIndex = Math.floor(Math.random() * logMessages.length);
      const { level, message } = logMessages[messageIndex] as {
        level: 'info' | 'warning' | 'error';
        message: string;
      };
      
      return {
        timestamp: timeString,
        level,
        message
      };
    }).sort((a, b) => {
      // Sort in reverse chronological order (newest first)
      return a.timestamp > b.timestamp ? -1 : 1;
    });
  };

  const loadMetricsData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Get health metrics from the neural hub
      const healthMetrics = neuralHub.getHealthMetrics();
      
      // Convert to our format
      const systemMetrics = convertHealthMetricsToSystemMetrics(healthMetrics);
      const performanceData = generatePerformanceData(healthMetrics);
      const logEntries = generateLogEntries();
      
      setMetrics(systemMetrics);
      setPerformance(performanceData);
      setLogs(logEntries);
    } catch (error) {
      setErrorMessage('Failed to load neural system metrics');
      console.error('Error loading neural system metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const refreshMetrics = useCallback(async () => {
    return loadMetricsData();
  }, [loadMetricsData]);
  
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
  }, []);
  
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  useEffect(() => {
    loadMetricsData();
    
    // Set up a polling interval for real-time updates
    let intervalId: NodeJS.Timeout | null = null;
    if (isMonitoring) {
      intervalId = setInterval(() => {
        loadMetricsData();
      }, 15000); // Update every 15 seconds when monitoring
    }
    
    // Clean up the interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loadMetricsData, isMonitoring]);

  return {
    metrics,
    performance,
    logs,
    isLoading,
    errorMessage,
    refreshMetrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
  };
}
