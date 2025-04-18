import { useState, useEffect, useCallback } from 'react';

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
}

export interface NeuralSystemMetricsResult {
  metrics: SystemHealthMetrics;
  status: 'optimal' | 'good' | 'warning' | 'critical';
  recommendations: string[];
  lastUpdated: Date;
  hasAnomalies: boolean;
  anomalies: any[];
  logs: string[];
  performance: {
    current: number;
    historical: number[];
  };
  refreshMetrics: () => Promise<void>;
  errorMessage: string | null;
  isLoading: boolean;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

export const useNeuralSystemMetrics = (): NeuralSystemMetricsResult => {
  const [metrics, setMetrics] = useState<SystemHealthMetrics>({
    cpuUtilization: 42,
    memoryUtilization: 38,
    errorFrequency: 0.5,
    systemUptime: 86400,
    networkLatency: 120,
    responseTime: 200,
    userSatisfactionScore: 0.87,
    systemLoad: 0.65,
    memoryAllocation: 4096,
    networkThroughput: 15.7,
    requestRate: 42
  });
  
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [status, setStatus] = useState<'optimal' | 'good' | 'warning' | 'critical'>('good');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [hasAnomalies, setHasAnomalies] = useState<boolean>(false);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [performance, setPerformance] = useState({ current: 85, historical: [82, 84, 86, 83, 85] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [monitoringInterval, setMonitoringInterval] = useState<NodeJS.Timeout | null>(null);

  

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update with random fluctuations
      setMetrics(prev => ({
        cpuUtilization: Math.min(100, Math.max(5, prev.cpuUtilization + (Math.random() - 0.5) * 10)),
        memoryUtilization: Math.min(100, Math.max(5, prev.memoryUtilization + (Math.random() - 0.5) * 8)),
        errorFrequency: Math.max(0, prev.errorFrequency + (Math.random() - 0.5) * 0.3),
        systemUptime: prev.systemUptime + 300,
        networkLatency: Math.max(20, prev.networkLatency + (Math.random() - 0.5) * 30),
        responseTime: Math.max(50, prev.responseTime + (Math.random() - 0.5) * 40),
        userSatisfactionScore: Math.min(1, Math.max(0, prev.userSatisfactionScore + (Math.random() - 0.5) * 0.05)),
        systemLoad: Math.min(1, Math.max(0.1, prev.systemLoad + (Math.random() - 0.5) * 0.1)),
        memoryAllocation: Math.max(1024, prev.memoryAllocation + (Math.random() - 0.5) * 200),
        networkThroughput: Math.max(1, prev.networkThroughput + (Math.random() - 0.5) * 3),
        requestRate: Math.max(1, prev.requestRate + (Math.random() - 0.5) * 10)
      }));
      
      // Update status based on metrics
      const determineStatus = (metrics: SystemHealthMetrics) => {
        if (metrics.cpuUtilization > 90 || metrics.memoryUtilization > 90 || metrics.errorFrequency > 5) {
          return 'critical';
        } else if (metrics.cpuUtilization > 70 || metrics.memoryUtilization > 70 || metrics.errorFrequency > 2) {
          return 'warning';
        } else if (metrics.cpuUtilization > 50 || metrics.memoryUtilization > 50) {
          return 'good';
        } else {
          return 'optimal';
        }
      };
      
      // Generate recommendations based on status
      const generateRecommendations = (metrics: SystemHealthMetrics, status: string) => {
        const recommendations = [];
        
        if (metrics.cpuUtilization > 70) {
          recommendations.push("Consider scaling up CPU resources");
        }
        
        if (metrics.memoryUtilization > 70) {
          recommendations.push("Memory usage is high, consider optimizing memory-intensive operations");
        }
        
        if (metrics.errorFrequency > 2) {
          recommendations.push("Error rate is above threshold, investigate error patterns");
        }
        
        if (metrics.networkLatency > 150) {
          recommendations.push("Network latency is high, check network configuration");
        }
        
        if (metrics.userSatisfactionScore < 0.7) {
          recommendations.push("User satisfaction metrics are low, review user feedback");
        }
        
        return recommendations;
      };
      
      const newStatus = determineStatus(metrics);
      const newRecommendations = generateRecommendations(metrics, newStatus);
      
      setStatus(newStatus);
      setRecommendations(newRecommendations);
      
      // Generate sample logs
      const newLog = `[${new Date().toISOString()}] System health check completed. Status: ${newStatus.toUpperCase()}`;
      setLogs(prev => [newLog, ...prev].slice(0, 50));
      
      // Update performance metrics
      const newPerformanceValue = Math.round(
        100 - (metrics.cpuUtilization + metrics.memoryUtilization + metrics.errorFrequency * 10) / 3
      );
      setPerformance(prev => ({
        current: newPerformanceValue,
        historical: [...prev.historical.slice(-19), newPerformanceValue]
      }));
      
      // Check for anomalies
      const hasNewAnomalies = Math.random() > 0.7;
      setHasAnomalies(hasNewAnomalies);
      
      if (hasNewAnomalies) {
        const newAnomaly = {
          id: `anomaly-${Date.now()}`,
          timestamp: new Date(),
          metric: ['cpu', 'memory', 'network', 'error'][Math.floor(Math.random() * 4)],
          value: Math.round(Math.random() * 100),
          threshold: Math.round(Math.random() * 70),
          severity: Math.random() > 0.5 ? 'high' : 'medium'
        };
        setAnomalies(prev => [newAnomaly, ...prev].slice(0, 10));
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching neural system metrics:", error);
      setErrorMessage("Failed to retrieve system metrics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startMonitoring = useCallback(() => {
    if (!isMonitoring) {
      fetchMetrics();
      const interval = setInterval(fetchMetrics, 30000); // 30 seconds
      setMonitoringInterval(interval);
      setIsMonitoring(true);
    }
  }, [fetchMetrics, isMonitoring]);

  const stopMonitoring = useCallback(() => {
    if (monitoringInterval) {
      clearInterval(monitoringInterval);
      setMonitoringInterval(null);
    }
    setIsMonitoring(false);
  }, [monitoringInterval]);

  useEffect(() => {
    fetchMetrics();
    return () => {
      if (monitoringInterval) {
        clearInterval(monitoringInterval);
      }
    };
  }, [fetchMetrics]);

  return {
    metrics,
    status,
    recommendations,
    lastUpdated,
    hasAnomalies,
    anomalies,
    logs,
    performance,
    refreshMetrics: fetchMetrics,
    errorMessage,
    isLoading,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  };
};
