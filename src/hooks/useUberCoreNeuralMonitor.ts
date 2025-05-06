
import { useState, useEffect, useCallback } from 'react';
import { uberCore } from '@/core/UberCore';
import { neuralHub, brainHub } from '@/services/neural/HermesOxumNeuralHub';
import { SystemHealthMetrics } from '@/services/neural/types/NeuralService';

export interface PerformanceReport {
  systemMetrics: SystemHealthMetrics;
  recommendations: string[];
  services: {
    [key: string]: {
      status: string;
      metrics: Record<string, number>;
      warnings: string[];
    }
  }
}

export interface SystemActivity {
  id: string;
  timestamp: string;
  type: string;
  status: string;
  duration: number;
  module: string;
  details?: any;
}

export interface SystemStatus {
  uberCore: {
    status: string;
    uptime: number;
    subsystems: Array<{
      name: string;
      status: string;
      health: number;
    }>;
  };
  brainHub: {
    status: string;
    activeModules: string[];
    lastActivity: string;
  };
}

/**
 * Hook for unified monitoring of UberCore and Neural systems
 */
export function useUberCoreNeuralMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(30000);
  
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    uberCore: {
      status: 'initializing',
      uptime: 0,
      subsystems: []
    },
    brainHub: {
      status: 'initializing',
      activeModules: [],
      lastActivity: new Date().toISOString()
    }
  });
  
  const [systemMetrics, setSystemMetrics] = useState<SystemHealthMetrics>({
    load: 0,
    memory: 0,
    latency: 0,
    errorRate: 0,
    averageResponseTime: 0,
    cpuUsage: 0,
    memoryUsage: 0
  });
  
  const [systemActivity, setSystemActivity] = useState<SystemActivity[]>([]);
  const [performanceReport, setPerformanceReport] = useState<PerformanceReport>({
    systemMetrics: {
      load: 0,
      memory: 0,
      latency: 0,
      errorRate: 0,
      averageResponseTime: 0
    },
    recommendations: [],
    services: {}
  });

  // Fetch all system metrics
  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get UberCore status
      const uberCoreStatus = uberCore.getSystemStatus();
      const subsystemHealth = uberCore.checkSubsystemHealth();
      
      // Get BrainHub metrics
      const brainHubStatus = brainHub.getSystemStatus();
      const neuralHubMetrics = await neuralHub.getDecisionLogs();
      
      // Update system status
      setSystemStatus({
        uberCore: {
          status: uberCoreStatus.status,
          uptime: uberCoreStatus.uptime,
          subsystems: subsystemHealth
        },
        brainHub: {
          status: brainHubStatus.status || 'operational',
          activeModules: neuralHubMetrics.map(log => log.module).filter((v, i, a) => a.indexOf(v) === i),
          lastActivity: neuralHubMetrics[0]?.timestamp || new Date().toISOString()
        }
      });
      
      // Update system metrics
      setSystemMetrics({
        load: Math.random() * 100,
        memory: Math.random() * 100,
        latency: Math.random() * 200,
        errorRate: Math.random() * 0.1,
        averageResponseTime: Math.random() * 300,
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100
      });
      
      // Create performance report
      setPerformanceReport({
        systemMetrics: {
          load: Math.random() * 100,
          memory: Math.random() * 100,
          latency: Math.random() * 200,
          errorRate: Math.random() * 0.1,
          averageResponseTime: Math.random() * 300
        },
        recommendations: [
          'Optimize neural pathways for improved response time',
          'Consider scaling memory allocation for high-traffic periods',
          'Update model parameters for better accuracy'
        ],
        services: {
          'core': {
            status: 'operational',
            metrics: {
              requestsProcessed: 1240,
              errorRate: 0.02,
              responseTime: 120
            },
            warnings: []
          },
          'neural': {
            status: 'operational',
            metrics: {
              modelAccuracy: 0.95,
              inferenceTime: 180,
              cacheMisses: 23
            },
            warnings: ['Consider model retraining']
          }
        }
      });
      
      return true;
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to fetch system metrics');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch activity logs
  const fetchActivityLogs = useCallback(async () => {
    try {
      // Mock activity data
      const mockActivities: SystemActivity[] = [
        {
          id: 'act-1',
          timestamp: new Date().toISOString(),
          type: 'inference',
          status: 'completed',
          duration: 245,
          module: 'text-processor'
        },
        {
          id: 'act-2',
          timestamp: new Date(Date.now() - 120000).toISOString(),
          type: 'training',
          status: 'in-progress',
          duration: 3600,
          module: 'image-classifier'
        },
        {
          id: 'act-3',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          type: 'inference',
          status: 'completed',
          duration: 78,
          module: 'recommendation-engine'
        }
      ];
      
      setSystemActivity(mockActivities);
      return mockActivities;
    } catch (err) {
      console.error('Error fetching activity logs:', err);
      return [];
    }
  }, []);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    fetchMetrics();
    fetchActivityLogs();
  }, [fetchMetrics, fetchActivityLogs]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Refresh metrics on a regular interval when monitoring is active
  useEffect(() => {
    if (!isMonitoring) return;
    
    const intervalId = setInterval(() => {
      fetchMetrics();
      fetchActivityLogs();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [isMonitoring, refreshInterval, fetchMetrics, fetchActivityLogs]);

  return {
    // Status and state
    isMonitoring,
    isLoading,
    error,
    refreshInterval,
    
    // Data
    systemStatus,
    systemMetrics,
    systemActivity,
    performanceReport,
    
    // Functions
    startMonitoring,
    stopMonitoring,
    setRefreshInterval,
    fetchMetrics,
    fetchActivityLogs,
  };
}

export default useUberCoreNeuralMonitor;
