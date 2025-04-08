
import { useState, useEffect } from 'react';
import { BrainHubHealth, BrainHubAnalytics } from '@/types/brainHubHealth';
import { checkBrainHubHealth } from '@/services/brainHubHealth/healthCheckService';
import { updateBrainHubAnalytics } from '@/services/brainHubHealth/analyticsService';

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
    const healthData = checkBrainHubHealth();
    setHealth(healthData);
  };
  
  const updateAnalytics = () => {
    const analyticsData = updateBrainHubAnalytics();
    setAnalytics(analyticsData);
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

export type { BrainHubHealth, BrainHubAnalytics, BrainHubHealthStatus } from '@/types/brainHubHealth';
export default useBrainHubHealth;
