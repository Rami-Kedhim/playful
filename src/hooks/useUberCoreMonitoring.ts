
import { useState, useEffect, useCallback } from 'react';
import { uberCore } from '@/core/UberCore';
import { NeuralSystemMetricsResult } from '@/types/neural-system';

export function useUberCoreMonitoring(refreshInterval = 10000) {
  const [metrics, setMetrics] = useState<NeuralSystemMetricsResult>({
    logs: [],
    performance: {
      cpuUsage: 0,
      memoryUsage: 0,
      responseTime: 0,
      accuracy: 0,
      latency: 0,
      processingEfficiency: 0,
      processingTrend: 'stable',
      accuracyRate: 0,
      accuracyTrend: 'stable',
      history: [],
      recommendations: []
    },
    refreshMetrics: async () => await fetchMetrics(),
    errorMessage: null,
    isLoading: true,
    isMonitoring: false
  });
  
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch metrics from UberCore
  const fetchMetrics = useCallback(async () => {
    try {
      setMetrics(prev => ({ ...prev, isLoading: true }));
      
      // Get system status and health metrics from UberCore
      const systemStatus = uberCore.getSystemStatus();
      const healthMetrics = uberCore.checkSubsystemHealth();
      const integrityCheck = uberCore.checkSystemIntegrity();
      
      // Process logs from various subsystems
      const logs = healthMetrics.map(subsystem => ({
        message: `${subsystem.status} health: ${subsystem.health}%`,
        timestamp: new Date().toISOString(),
        level: subsystem.health > 90 ? 'info' : subsystem.health > 70 ? 'warning' : 'error'
      }));
      
      if (!integrityCheck.isValid) {
        logs.push({
          message: `System integrity issue: ${integrityCheck.message}`,
          timestamp: new Date().toISOString(),
          level: 'error'
        });
      }
      
      // Calculate average metrics
      const avgCpuUsage = healthMetrics.reduce((sum, item) => sum + (item.health || 0), 0) / healthMetrics.length;
      const avgMemoryUsage = Math.min(95, avgCpuUsage + (Math.random() * 10 - 5));
      
      // Random history data for trend visualization
      const history = Array.from({ length: 10 }, (_, i) => 
        Math.round(70 + Math.sin(i * 0.5) * 15 + Math.random() * 10)
      );
      
      // Generate recommendations based on system health
      const recommendations = [];
      if (avgCpuUsage < 70) recommendations.push("System performance optimal");
      if (avgCpuUsage > 85) recommendations.push("Consider optimizing neural processing load");
      if (avgMemoryUsage > 90) recommendations.push("High memory usage detected, consider allocation increase");
      if (!integrityCheck.isValid) recommendations.push("System integrity check failed - maintenance required");
      
      // Create the metrics result
      const newMetrics: NeuralSystemMetricsResult = {
        logs,
        performance: {
          cpuUsage: avgCpuUsage,
          memoryUsage: avgMemoryUsage,
          responseTime: 20 + Math.random() * 40,
          accuracy: 85 + Math.random() * 10,
          latency: 15 + Math.random() * 25,
          processingEfficiency: Math.min(100, avgCpuUsage + 10),
          processingTrend: avgCpuUsage > 90 ? 'down' : 'up',
          accuracyRate: 90 + Math.random() * 5,
          accuracyTrend: 'up',
          history,
          recommendations
        },
        refreshMetrics: async () => await fetchMetrics(),
        errorMessage: integrityCheck.isValid ? null : integrityCheck.message,
        isLoading: false,
        isMonitoring,
        startMonitoring: () => startMonitoring(),
        stopMonitoring: () => stopMonitoring(),
        metrics: {
          systemLoad: avgCpuUsage / 100,
          memoryAllocation: avgMemoryUsage,
          networkThroughput: 75 + Math.random() * 20,
          requestRate: 30 + Math.random() * 15,
          cpuUtilization: avgCpuUsage,
          memoryUtilization: avgMemoryUsage,
          modelCount: 3,
          activeConnections: Math.floor(10 + Math.random() * 20),
          requestsPerMinute: Math.floor(50 + Math.random() * 100),
          averageResponseTime: 20 + Math.random() * 40,
          errorRate: Math.random() * 3,
          uptime: systemStatus.uptime || 99.9,
          systemUptime: systemStatus.uptime || 99.9,
          networkLatency: 15 + Math.random() * 25,
          responseTime: 20 + Math.random() * 40,
          userSatisfactionScore: 90 + Math.random() * 10
        },
        status: avgCpuUsage > 90 ? 'critical' : avgCpuUsage > 75 ? 'warning' : 'optimal',
        recommendations,
        lastUpdated: new Date(),
        hasAnomalies: !integrityCheck.isValid,
        anomalies: integrityCheck.isValid ? [] : [{ 
          type: 'integrity', 
          message: integrityCheck.message,
          severity: 'high'
        }]
      };
      
      setMetrics(newMetrics);
      setError(null);
      return newMetrics;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch neural metrics';
      console.error('Error fetching UberCore metrics:', err);
      setError(errorMessage);
      
      setMetrics(prev => ({ 
        ...prev, 
        isLoading: false, 
        errorMessage: errorMessage 
      }));
      
      return metrics;
    }
  }, [isMonitoring, metrics]);
  
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
  }, []);
  
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);
  
  // Set up interval for fetching metrics
  useEffect(() => {
    // Initial fetch
    fetchMetrics();
    
    // Set up interval for continuous monitoring
    let intervalId: number | null = null;
    
    if (isMonitoring) {
      intervalId = window.setInterval(() => {
        fetchMetrics();
      }, refreshInterval);
    }
    
    // Clean up interval on unmount
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [fetchMetrics, isMonitoring, refreshInterval]);
  
  return { 
    metrics, 
    isLoading: metrics.isLoading,
    error, 
    isMonitoring, 
    startMonitoring, 
    stopMonitoring,
    refreshMetrics: fetchMetrics
  };
}

export default useUberCoreMonitoring;
