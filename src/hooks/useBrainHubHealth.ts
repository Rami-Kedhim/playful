
import { useState, useEffect, useCallback } from 'react';
import { BrainHubHealth } from '@/types/brainHubHealth';
import { checkBrainHubHealth } from '@/services/brainHubHealth/healthCheckService';
import { updateBrainHubAnalytics } from '@/services/brainHubHealth/analyticsService';

/**
 * Hook for accessing Brain Hub health information and analytics
 */
export function useBrainHubHealth() {
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
      
      // Update analytics
      const analyticsData = updateBrainHubAnalytics();
      setAnalytics(analyticsData);
      
      setLoading(false);
      return healthData;
    } catch (err: any) {
      setError(err.message || 'Failed to check Brain Hub health');
      setLoading(false);
      return null;
    }
  }, []);

  // Initialize health data on mount
  useEffect(() => {
    checkHealth();
    
    // Set up polling for health updates
    const intervalId = setInterval(() => {
      checkHealth();
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [checkHealth]);

  return {
    health,
    analytics,
    loading,
    error,
    checkHealth
  };
}

export default useBrainHubHealth;
