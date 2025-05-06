
import { useState, useEffect, useCallback } from 'react';
import { uberCore } from '@/core/UberCore';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { SystemHealthMetrics } from '@/types/neural-system';

export interface UberCoreBrainHubState {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  systemStatus: {
    uberCore: {
      status: string;
      uptime: number;
    };
    brainHub: {
      status: string;
      activeModules: string[];
    };
  };
  metrics: SystemHealthMetrics;
  neuralActivities: Array<{
    id: string;
    type: string;
    timestamp: Date;
    details: string;
  }>;
}

export function useUberCoreBrainHub() {
  const [state, setState] = useState<UberCoreBrainHubState>({
    isConnected: false,
    isLoading: true,
    error: null,
    systemStatus: {
      uberCore: {
        status: 'initializing',
        uptime: 0,
      },
      brainHub: {
        status: 'initializing',
        activeModules: [],
      }
    },
    metrics: {
      cpuUsage: 0,
      memoryUsage: 0,
      activeConnections: 0,
      requestsPerMinute: 0,
      averageResponseTime: 0,
      errorRate: 0,
      uptime: 0,
      systemLoad: 0,
      memoryAllocation: 0,
      networkThroughput: 0,
      requestRate: 0,
      modelCount: 0,
      gpuUsage: 0,
      errorFrequency: 0,
      systemUptime: 0,
      networkLatency: 0,
      responseTime: 0,
      userSatisfactionScore: 0,
      models: []
    },
    neuralActivities: []
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Get UberCore status
      const uberStatus = uberCore.getSystemStatus();
      
      // Get BrainHub status
      const brainStatus = await brainHub.processRequest({
        type: 'system_status',
        data: {}
      });
      
      // Get health metrics from UberCore
      const healthMetrics = uberCore.checkSubsystemHealth().reduce((acc, item) => {
        acc[item.status.toLowerCase()] = item.health;
        return acc;
      }, {} as Record<string, number>);
      
      // Get neural activities
      const activities = await brainHub.getDecisionLogs();
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isConnected: true,
        error: null,
        systemStatus: {
          uberCore: {
            status: uberStatus.status,
            uptime: uberStatus.uptime,
          },
          brainHub: {
            status: brainStatus.success ? 'operational' : 'error',
            activeModules: brainStatus.data?.activeModules || []
          }
        },
        metrics: {
          ...prev.metrics,
          cpuUsage: healthMetrics.cpu || 65,
          memoryUsage: healthMetrics.memory || 42,
          activeConnections: healthMetrics.api || 89,
          requestsPerMinute: Math.floor(Math.random() * 100) + 50,
          averageResponseTime: Math.floor(Math.random() * 200) + 50,
          errorRate: (Math.random() * 2).toFixed(2),
          systemLoad: healthMetrics.system || 50,
          modelCount: 5,
          models: []
        },
        neuralActivities: activities.map((log: any) => ({
          id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: log.module || 'core',
          timestamp: new Date(log.timestamp),
          details: log.message
        }))
      }));
    } catch (error) {
      console.error('Error connecting UberCore and BrainHub:', error);
      setState(prev => ({
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }, []);

  const initializeConnection = useCallback(async () => {
    try {
      // Initialize UberCore
      uberCore.initialize();
      
      // Initialize BrainHub
      await brainHub.initialize();
      
      // Register UberCore with BrainHub
      await brainHub.processRequest({
        type: 'register_core_system',
        data: {
          systemId: 'uber-core',
          systemType: 'core',
          capabilities: ['neural_processing', 'prediction', 'system_monitoring']
        }
      });
      
      await fetchData();
    } catch (error) {
      console.error('Error initializing UberCore-BrainHub connection:', error);
      setState(prev => ({
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to initialize'
      }));
    }
  }, [fetchData]);

  useEffect(() => {
    initializeConnection();
    
    const intervalId = setInterval(fetchData, 30000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [initializeConnection, fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const runDiagnostics = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Run UberCore diagnostics
      const integrityCheck = uberCore.checkSystemIntegrity();
      
      // Run BrainHub diagnostics
      await brainHub.processRequest({
        type: 'run_diagnostics',
        data: {
          depth: 'full',
          includeSubsystems: true
        }
      });
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        systemStatus: {
          ...prev.systemStatus,
          uberCore: {
            ...prev.systemStatus.uberCore,
            integrity: integrityCheck.isValid ? 'valid' : 'compromised',
            message: integrityCheck.message
          }
        }
      }));
      
      // Refresh data after diagnostics
      fetchData();
      
      return {
        success: true,
        message: 'Diagnostics completed successfully'
      };
    } catch (error) {
      console.error('Error running diagnostics:', error);
      setState(prev => ({
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Diagnostics failed'
      }));
      
      return {
        success: false,
        message: 'Diagnostics failed'
      };
    }
  }, [fetchData]);

  return {
    ...state,
    refreshData,
    runDiagnostics
  };
}

export default useUberCoreBrainHub;
