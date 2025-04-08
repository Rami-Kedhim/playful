
import { useState, useEffect } from 'react';
import { brainHub } from '@/services/neural';
import { neuralHub, SystemHealthMetrics } from '@/services/neural';
import { neuralMetrics, generateNeuralAnalytics } from '@/services/neural/reporting/neuralAnalytics';

export type BrainHubHealthStatus = 'good' | 'warning' | 'error';

export interface BrainHubHealth {
  status: BrainHubHealthStatus;
  message?: string;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    requestsPerMinute: number;
    lastOptimized: number;
    neuralMetrics?: SystemHealthMetrics;
  };
  warnings: string[];
  errors: string[];
}

export interface BrainHubAnalytics {
  dailyOperations: number;
  averageResponseTime: number;
  errorRate: number;
  utilizationTrend: {
    timestamp: string;
    value: number;
  }[];
  recommendations: string[];
}

export function useBrainHubHealth() {
  const [health, setHealth] = useState<BrainHubHealth>({
    status: 'good',
    metrics: {
      cpuUsage: 0,
      memoryUsage: 0,
      requestsPerMinute: 0,
      lastOptimized: Date.now()
    },
    warnings: [],
    errors: []
  });
  
  const [analytics, setAnalytics] = useState<BrainHubAnalytics>({
    dailyOperations: 0,
    averageResponseTime: 0,
    errorRate: 0,
    utilizationTrend: [],
    recommendations: []
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    startMonitoring();
    
    return () => {
      stopMonitoring();
    };
  }, []);

  const startMonitoring = () => {
    if (isMonitoring) return;
    
    setIsMonitoring(true);
    
    checkHealth();
    updateAnalytics();
    
    const healthInterval = setInterval(() => {
      checkHealth();
    }, 10000);
    
    const analyticsInterval = setInterval(() => {
      updateAnalytics();
    }, 30000);
    
    return () => {
      clearInterval(healthInterval);
      clearInterval(analyticsInterval);
      setIsMonitoring(false);
    };
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const checkHealth = () => {
    try {
      const systemStatus = brainHub.getSystemStatus();
      
      let neuralMetrics: SystemHealthMetrics | undefined = undefined;
      try {
        neuralMetrics = neuralHub.getHealthMetrics();
      } catch (error) {
        console.warn("Neural hub metrics unavailable", error);
      }
      
      const enhancedMetrics = brainHub.getEnhancedSystemMetrics();
      
      const warnings: string[] = [];
      const errors: string[] = [];
      
      if (systemStatus.cpuUsage > 80) {
        warnings.push(`High CPU usage: ${systemStatus.cpuUsage}%`);
      }
      
      if (systemStatus.memoryUsage > 85) {
        warnings.push(`High memory usage: ${systemStatus.memoryUsage}%`);
      }
      
      if (systemStatus.requestsPerMinute > 150) {
        warnings.push(`High request rate: ${systemStatus.requestsPerMinute} requests/minute`);
      }
      
      if (neuralMetrics && neuralMetrics.stability < 0.7) {
        warnings.push(`Low neural stability: ${(neuralMetrics.stability * 100).toFixed(1)}%`);
      }
      
      if (systemStatus.cpuUsage > 95) {
        errors.push(`Critical CPU usage: ${systemStatus.cpuUsage}%`);
      }
      
      if (systemStatus.memoryUsage > 95) {
        errors.push(`Critical memory usage: ${systemStatus.memoryUsage}%`);
      }
      
      if (enhancedMetrics.predictive?.optimizationOpportunities) {
        warnings.push(...enhancedMetrics.predictive.optimizationOpportunities);
      }
      
      let overallStatus: BrainHubHealthStatus = 'good';
      let message: string | undefined = undefined;
      
      if (errors.length > 0) {
        overallStatus = 'error';
        message = `${errors.length} critical issue${errors.length > 1 ? 's' : ''} detected`;
      } else if (warnings.length > 0) {
        overallStatus = 'warning';
        message = `${warnings.length} warning${warnings.length > 1 ? 's' : ''} detected`;
      }
      
      setHealth({
        status: overallStatus,
        message,
        metrics: {
          cpuUsage: systemStatus.cpuUsage,
          memoryUsage: systemStatus.memoryUsage,
          requestsPerMinute: systemStatus.requestsPerMinute,
          lastOptimized: systemStatus.lastOptimized,
          neuralMetrics
        },
        warnings,
        errors
      });
      
    } catch (error) {
      console.error("Error checking Brain Hub health", error);
      setHealth(prev => ({
        ...prev,
        status: 'error',
        message: 'Failed to check Brain Hub health',
        errors: [...prev.errors, 'Health check failure: ' + (error instanceof Error ? error.message : String(error))]
      }));
    }
  };
  
  const updateAnalytics = () => {
    try {
      // Get neural analytics
      const neuralReport = generateNeuralAnalytics();
      
      // Get performance report from metrics
      const dailyReport = neuralMetrics.generatePerformanceReport('daily');
      
      // Create utilization trend from neural trends
      const utilizationTrend = neuralReport.trends.map(trend => ({
        timestamp: trend.timestamp.toISOString(),
        value: trend.load
      }));
      
      // Update analytics state
      setAnalytics({
        dailyOperations: dailyReport.totalOperations,
        averageResponseTime: dailyReport.averageResponseTime,
        errorRate: dailyReport.errorRate,
        utilizationTrend,
        recommendations: neuralReport.summary.recommendations
      });
      
    } catch (error) {
      console.error("Error updating Brain Hub analytics", error);
    }
  };

  return {
    health,
    analytics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    checkHealth,
    updateAnalytics
  };
}

export default useBrainHubHealth;
