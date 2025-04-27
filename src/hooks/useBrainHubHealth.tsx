
import { useState, useEffect, useCallback } from 'react';
import { BrainHubHealth, BrainHubAnalytics } from '@/types/brainHubHealth';
import checkBrainHubHealth from '@/services/brainHubHealth/healthCheckService';
import updateBrainHubAnalytics from '@/services/brainHubHealth/analyticsService';

export const useBrainHubHealth = (monitoringInterval = 30000) => {
  const [health, setHealth] = useState<BrainHubHealth>({
    status: 'unknown',
    metrics: {
      cpuUsage: 0,
      memoryUsage: 0,
      requestsPerMinute: 0,
      lastOptimized: Date.now(),
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
  
  const [loading, setLoading] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const checkHealth = useCallback(() => {
    try {
      const healthStatus = checkBrainHubHealth();
      setHealth(healthStatus);
      return healthStatus;
    } catch (error) {
      console.error('Error checking brain hub health:', error);
      const errorHealth: BrainHubHealth = {
        status: 'error',
        message: 'Failed to retrieve system health data',
        metrics: {
          cpuUsage: 0,
          memoryUsage: 0,
          requestsPerMinute: 0,
          lastOptimized: Date.now(),
        },
        warnings: [],
        errors: ['Connection error to Brain Hub service']
      };
      setHealth(errorHealth);
      return errorHealth;
    }
  }, []);
  
  const updateAnalytics = useCallback(() => {
    try {
      const analyticsData = updateBrainHubAnalytics();
      setAnalytics(analyticsData);
      return analyticsData;
    } catch (error) {
      console.error('Error updating brain hub analytics:', error);
      return null;
    }
  }, []);
  
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    
    // Do initial checks
    checkHealth();
    updateAnalytics();
    setLoading(false);
    
    // Set up interval for monitoring
    const intervalId = setInterval(() => {
      checkHealth();
      updateAnalytics();
    }, monitoringInterval);
    
    // Return cleanup function
    return () => {
      clearInterval(intervalId);
      setIsMonitoring(false);
    };
  }, [checkHealth, updateAnalytics, monitoringInterval]);
  
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);
  
  // Start monitoring on mount
  useEffect(() => {
    const cleanup = startMonitoring();
    
    return () => {
      cleanup();
    };
  }, [startMonitoring]);
  
  return {
    health,
    analytics,
    loading,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    checkHealth,
    updateAnalytics
  };
};

export default useBrainHubHealth;
