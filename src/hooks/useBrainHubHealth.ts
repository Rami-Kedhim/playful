
import { useState, useEffect, useCallback } from 'react';
import { BrainHubHealth, BrainHubAnalytics } from '@/types/brainHubHealth';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { updateBrainHubAnalytics } from '@/services/brainHubHealth/analyticsService';

export function useBrainHubHealth(monitoringInterval = 30000) {
  const [health, setHealth] = useState<BrainHubHealth>({
    status: 'unknown',
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
  
  const checkHealth = useCallback(() => {
    try {
      // Get system status from BrainHub
      const systemStatus = brainHub.getSystemStatus();
      const enhancedMetrics = brainHub.getEnhancedSystemMetrics?.();
      
      // Determine overall health status
      let status: 'good' | 'warning' | 'error' = 'good';
      const warnings: string[] = [];
      const errors: string[] = [];
      
      if (systemStatus.cpuUsage > 80) {
        status = 'error';
        errors.push('Critical CPU utilization detected');
      } else if (systemStatus.cpuUsage > 60) {
        if (status !== 'error') status = 'warning';
        warnings.push('High CPU utilization detected');
      }
      
      if (systemStatus.memoryUsage > 85) {
        status = 'error';
        errors.push('Critical memory utilization detected');
      } else if (systemStatus.memoryUsage > 70) {
        if (status !== 'error') status = 'warning';
        warnings.push('High memory utilization detected');
      }
      
      // Check optimization age
      const hoursSinceOptimization = (Date.now() - systemStatus.lastOptimized) / (1000 * 60 * 60);
      if (hoursSinceOptimization > 48) {
        if (status !== 'error') status = 'warning';
        warnings.push('System optimization is overdue');
      }
      
      // Create health status message
      let message = '';
      if (status === 'good') {
        message = 'All systems operating within normal parameters';
      } else if (status === 'warning') {
        message = 'System requires attention';
      } else {
        message = 'Critical issues detected';
      }
      
      // Update health state
      setHealth({
        status,
        message,
        metrics: systemStatus,
        warnings,
        errors
      });
      
      return { status, metrics: systemStatus, warnings, errors };
    } catch (error) {
      console.error('Error checking brain hub health:', error);
      setHealth(prev => ({
        ...prev,
        status: 'error',
        message: 'Failed to retrieve system health data',
        errors: [...prev.errors, 'Connection error to Brain Hub service']
      }));
      
      return null;
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
