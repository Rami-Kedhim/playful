
import { useState, useEffect, useCallback } from 'react';
import { uberCore } from '@/core/UberCore';
import { PerformanceReport } from '@/types/neuralMetrics';
import { SystemHealthMetrics } from '@/types/core-systems';

interface UseUberCoreNeuralMonitorOptions {
  autoStart?: boolean;
  monitorInterval?: number;
  onAlert?: (alerts: string[]) => void;
}

// Define proper types for our components
interface SubsystemHealth {
  name: string;
  status: string;
  health: number;
}

interface SystemStatus {
  operational: boolean;
  services?: { name: string; status: string }[];
  uptime?: number;
}

/**
 * Hook for monitoring UberCore neural system health and performance in React components
 */
export function useUberCoreNeuralMonitor(options: UseUberCoreNeuralMonitorOptions = {}) {
  const { autoStart = true, monitorInterval = 30000, onAlert } = options;
  
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [performanceReport, setPerformanceReport] = useState<PerformanceReport | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    operational: false,
    services: [],
    uptime: 0
  });
  const [systemMetrics, setSystemMetrics] = useState<SystemHealthMetrics | null>(null);
  const [subsystemHealth, setSubsystemHealth] = useState<SubsystemHealth[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the latest report and status
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get system status from UberCore
      const status = uberCore.getSystemStatus();
      
      // Get subsystem health from UberCore and ensure it has the correct shape
      const healthData = uberCore.checkSubsystemHealth().map(item => ({
        name: item.status,
        status: item.status,
        health: item.health
      }));
      
      // Create a performance report (mock data)
      const report: PerformanceReport = {
        timestamp: new Date(),
        overallHealth: 'healthy',
        services: {
          companion: {
            status: 'healthy',
            metrics: {
              requestsProcessed: 120,
              errorCount: 1,
              responseTime: 140,
              errorRate: 0.01,
              successRate: 0.99,
              processingSpeed: 10,
              accuracy: 0.95,
              uptime: 99.9,
              operationsCount: 150,
              errors: 1,
              latency: 140
            }
          },
          creators: {
            status: 'healthy',
            metrics: {
              requestsProcessed: 85,
              errorCount: 0,
              responseTime: 120,
              errorRate: 0,
              successRate: 1.0,
              processingSpeed: 12,
              accuracy: 0.98,
              uptime: 99.9,
              operationsCount: 100,
              errors: 0,
              latency: 120
            }
          },
          escorts: {
            status: 'healthy',
            metrics: {
              requestsProcessed: 230,
              errorCount: 3,
              responseTime: 160,
              errorRate: 0.013,
              successRate: 0.987,
              processingSpeed: 9,
              accuracy: 0.93,
              uptime: 99.8,
              operationsCount: 250,
              errors: 3,
              latency: 160
            }
          },
          livecams: {
            status: 'healthy',
            metrics: {
              requestsProcessed: 45,
              errorCount: 0,
              responseTime: 180,
              errorRate: 0,
              successRate: 1.0,
              processingSpeed: 8,
              accuracy: 0.97,
              uptime: 99.9,
              operationsCount: 50,
              errors: 0,
              latency: 180
            }
          }
        },
        systemMetrics: {
          cpuUsage: 45,
          memoryUsage: 32,
          responseTime: 150,
          operationsPerSecond: 10,
          errorRate: 0.01
        },
        recommendations: [
          "System is operating within normal parameters",
          "Consider optimizing memory usage for livecams service"
        ]
      };
      
      // System metrics (mock data based on UberCore structure)
      const metrics: SystemHealthMetrics = {
        load: 45,
        memory: 32,
        latency: 120,
        errorRate: 0.01,
        averageResponseTime: 150,
      };
      
      // Update state with fetched data
      setPerformanceReport(report);
      setSystemStatus({
        operational: true,
        services: Object.keys(report.services).map(key => ({
          name: key,
          status: report.services[key].status
        })),
        uptime: 99.8
      });
      setSystemMetrics(metrics);
      setSubsystemHealth(healthData);
      
      // Check for alerts that need to be reported
      if (onAlert && report) {
        const alerts: string[] = [];
        
        // Collect critical alerts and warnings
        Object.entries(report.services).forEach(([name, service]) => {
          if (service.status === 'error' || service.status === 'critical') {
            alerts.push(`Service ${name} ${service.status}: ${service.metrics.errorCount} errors`);
          }
        });
        
        if (alerts.length > 0) {
          onAlert(alerts);
        }
      }
      
      return { report, status };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch neural system data';
      setError(errorMessage);
      console.error('Neural system monitoring error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [onAlert]);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    refreshData();
  }, [refreshData]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Start monitoring on mount if autoStart is true
  useEffect(() => {
    if (autoStart) {
      startMonitoring();
    } else {
      // Just fetch data once without starting the monitor
      refreshData();
    }
    
    // Set up interval for continuous monitoring
    let intervalId: NodeJS.Timeout | null = null;
    
    if (autoStart && monitorInterval > 0) {
      intervalId = setInterval(() => {
        refreshData();
      }, monitorInterval);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsMonitoring(false);
    };
  }, [autoStart, startMonitoring, refreshData, monitorInterval]);

  return {
    isMonitoring,
    performanceReport,
    systemStatus,
    systemMetrics,
    subsystemHealth,
    isLoading,
    error,
    startMonitoring,
    stopMonitoring,
    refreshData
  };
}

export default useUberCoreNeuralMonitor;
