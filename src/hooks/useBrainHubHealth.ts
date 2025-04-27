
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
  const [error, setError] = useState<string | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const checkHealth = useCallback(async () => {
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
    } catch (err: any) {
      setError(err.message || 'Failed to update Brain Hub analytics');
      return analytics;
    }
  }, [analytics]);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    
    checkHealth();
    updateAnalytics();
    setLoading(false);
    
    return () => {
      setIsMonitoring(false);
    };
  }, [checkHealth, updateAnalytics]);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  useEffect(() => {
    checkHealth();
    updateAnalytics();
    
    let intervalId: NodeJS.Timeout | null = null;
    
    if (isMonitoring) {
      intervalId = setInterval(() => {
        checkHealth();
        updateAnalytics();
      }, monitoringInterval);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [checkHealth, updateAnalytics, isMonitoring, monitoringInterval]);

  return {
    health,
    analytics,
    loading,
    error,
    checkHealth,
    updateAnalytics,
    isMonitoring,
    startMonitoring: useCallback(() => setIsMonitoring(true), []),
    stopMonitoring: useCallback(() => setIsMonitoring(false), [])
  };
};

export default useBrainHubHealth;
