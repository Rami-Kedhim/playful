import { useState, useEffect, useCallback } from 'react';
import { BrainHubHealth, BrainHubAnalytics } from '@/types/brainHubHealth';
import checkBrainHubHealth from '@/services/brainHubHealth/healthCheckService';
import updateBrainHubAnalytics from '@/services/brainHubHealth/analyticsService';

/**
 * Hook for accessing Brain Hub health information and analytics
 */
export function useBrainHubHealth(monitoringInterval = 30000) {
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
  
  const [analytics, setAnalytics] = useState(() => updateBrainHubAnalytics());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  /**
   * Check the current health status of the Brain Hub
   */
  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get health data
      const healthData = checkBrainHubHealth();
      setHealth(healthData);
      
      setLoading(false);
      return healthData;
    } catch (err: any) {
      setError(err.message || 'Failed to check Brain Hub health');
      setLoading(false);
      return null;
    }
  }, []);
  
  /**
   * Update analytics data for Brain Hub
   */
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
    
    // Do initial checks
    checkHealth();
    updateAnalytics();
    setLoading(false);
    
    // Return cleanup function
    return () => {
      setIsMonitoring(false);
    };
  }, [checkHealth, updateAnalytics]);
  
  /**
   * Stop monitoring Brain Hub health
   */
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Initialize health data on mount
  useEffect(() => {
    checkHealth();
    updateAnalytics();
    
    // Set up polling for health updates if monitoring is enabled
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
}

export default useBrainHubHealth;
