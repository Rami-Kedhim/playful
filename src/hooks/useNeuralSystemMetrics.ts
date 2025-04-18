
import { useState, useEffect, useCallback } from 'react';

export interface SystemLog {
  message: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
}

export interface SystemPerformance {
  processingEfficiency: number;
  processingTrend: 'up' | 'down';
  accuracyRate: number;
  accuracyTrend: 'up' | 'down';
  history: number[];
  recommendations: string[];
  cpuUtilization: number;
  memoryUtilization: number;
  errorFrequency: number;
  networkLatency: number;
  responseTime: number;
  userSatisfactionScore: number;
  systemLoad: number;
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface SystemHealthMetrics {
  cpuUtilization: number;
  memoryUtilization: number;
  errorFrequency: number;
  systemUptime: number;
  networkLatency: number;
  responseTime: number;
  userSatisfactionScore: number;
  systemLoad: number;
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface NeuralSystemMetricsResult {
  logs: SystemLog[];
  performance: SystemPerformance;
  refreshMetrics: () => Promise<void>;
  errorMessage: string | null;
  isLoading: boolean;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

export const useNeuralSystemMetrics = (): NeuralSystemMetricsResult => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [performance, setPerformance] = useState<SystemPerformance>({
    processingEfficiency: 85,
    processingTrend: 'up',
    accuracyRate: 92,
    accuracyTrend: 'up',
    history: [65, 70, 72, 78, 80, 85, 82, 88, 85, 92],
    recommendations: [
      "Increase CPU allocation by 15%",
      "Optimize memory usage during peak hours",
      "Reduce API call rate to external services"
    ],
    cpuUtilization: 76,
    memoryUtilization: 68,
    errorFrequency: 0.5,
    networkLatency: 120,
    responseTime: 200,
    userSatisfactionScore: 4.2,
    systemLoad: 78,
    memoryAllocation: 72,
    networkThroughput: 85,
    requestRate: 125,
    averageResponseTime: 210,
    errorRate: 0.8
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  // Function to refresh metrics
  const refreshMetrics = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate some random logs
      const newLogs: SystemLog[] = [
        {
          message: "Neural system checkpoint completed",
          timestamp: new Date().toISOString(),
          level: "info"
        },
        {
          message: "Memory optimization cycle executed",
          timestamp: new Date(Date.now() - 120000).toISOString(),
          level: "info"
        },
        {
          message: "Connection timeout detected on external API",
          timestamp: new Date(Date.now() - 480000).toISOString(),
          level: "warning"
        },
        {
          message: "Authentication service response degraded",
          timestamp: new Date(Date.now() - 840000).toISOString(), 
          level: "warning"
        },
        {
          message: "Failed to process input vector dimensions",
          timestamp: new Date(Date.now() - 1260000).toISOString(),
          level: "error"
        }
      ];
      
      // Update metrics with slight variations
      const newPerformance = { ...performance };
      newPerformance.processingEfficiency = Math.min(100, Math.max(50, performance.processingEfficiency + (Math.random() * 10 - 5)));
      newPerformance.processingTrend = Math.random() > 0.5 ? 'up' : 'down';
      
      newPerformance.accuracyRate = Math.min(100, Math.max(50, performance.accuracyRate + (Math.random() * 6 - 3)));
      newPerformance.accuracyTrend = Math.random() > 0.5 ? 'up' : 'down';
      
      // Shift history and add new value
      const newHistory = [...performance.history.slice(1), Math.round(newPerformance.processingEfficiency)];
      newPerformance.history = newHistory;
      
      if (Math.random() > 0.7) {
        // Occasionally update recommendations
        newPerformance.recommendations = [
          "Increase CPU allocation by 15%",
          "Optimize memory usage during peak hours",
          "Reduce API call rate to external services"
        ];
        
        if (Math.random() > 0.6) {
          newPerformance.recommendations.push(
            "Consider upgrading network infrastructure"
          );
        }
      }
      
      // Update health metrics
      newPerformance.cpuUtilization = Math.min(100, Math.max(20, performance.cpuUtilization + (Math.random() * 10 - 5)));
      newPerformance.memoryUtilization = Math.min(100, Math.max(20, performance.memoryUtilization + (Math.random() * 8 - 4)));
      newPerformance.errorFrequency = Math.max(0, Math.min(5, performance.errorFrequency + (Math.random() * 0.4 - 0.2)));
      newPerformance.networkLatency = Math.max(50, Math.min(500, performance.networkLatency + (Math.random() * 30 - 15)));
      newPerformance.systemLoad = Math.min(100, Math.max(20, performance.systemLoad + (Math.random() * 10 - 5)));
      newPerformance.memoryAllocation = Math.min(100, Math.max(20, performance.memoryAllocation + (Math.random() * 8 - 4)));
      newPerformance.networkThroughput = Math.min(100, Math.max(20, performance.networkThroughput + (Math.random() * 10 - 5)));
      newPerformance.requestRate = Math.max(50, Math.min(200, performance.requestRate + (Math.random() * 20 - 10)));
      newPerformance.averageResponseTime = Math.max(100, Math.min(500, performance.averageResponseTime + (Math.random() * 30 - 15)));
      newPerformance.errorRate = Math.max(0, Math.min(5, performance.errorRate + (Math.random() * 0.3 - 0.15)));
      
      setLogs(newLogs);
      setPerformance(newPerformance);
    } catch (error) {
      setErrorMessage("Failed to refresh neural system metrics");
      console.error("Error refreshing metrics:", error);
    } finally {
      setIsLoading(false);
    }
  }, [performance]);
  
  // Initial load
  useEffect(() => {
    refreshMetrics();
  }, [refreshMetrics]);
  
  // Set up monitoring if active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        refreshMetrics();
      }, 10000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isMonitoring, refreshMetrics]);
  
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
  }, []);
  
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);
  
  return {
    logs,
    performance,
    refreshMetrics,
    errorMessage,
    isLoading,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  };
};

export default useNeuralSystemMetrics;
