
import { useState, useEffect, useCallback } from 'react';
import { neuralSystemMonitor } from '@/services/neural/monitoring/NeuralSystemMonitor';
import { PerformanceReport } from '@/types/neuralMetrics';
import { NeuralSystemStatus } from '@/services/neural/types/neuralHub';

interface UseNeuralSystemMonitorOptions {
  autoStart?: boolean;
  monitorInterval?: number;
  onAlert?: (alerts: string[]) => void;
}

/**
 * Hook for monitoring neural system health and performance in React components
 */
export function useNeuralSystemMonitor(options: UseNeuralSystemMonitorOptions = {}) {
  const { autoStart = true, monitorInterval = 30000, onAlert } = options;
  
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [performanceReport, setPerformanceReport] = useState<PerformanceReport | null>(null);
  const [systemStatus, setSystemStatus] = useState<NeuralSystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the latest report and status
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const report = neuralSystemMonitor.performHealthCheck();
      const status = neuralSystemMonitor.getSystemStatus();
      
      setPerformanceReport(report);
      setSystemStatus(status);
      
      // Check for alerts that need to be reported
      if (onAlert && report) {
        const alerts: string[] = [];
        
        // Collect critical alerts and warnings
        Object.values(report.services).forEach(service => {
          if (service.status === 'error' || service.status === 'critical') {
            alerts.push(`Service ${service.status}: ${service.metrics.errorCount} errors`);
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
    if (neuralSystemMonitor.isActive()) {
      return;
    }
    
    neuralSystemMonitor.startMonitoring(monitorInterval);
    setIsMonitoring(true);
    refreshData();
  }, [monitorInterval, refreshData]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    neuralSystemMonitor.stopMonitoring();
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
    
    return () => {
      // Don't stop the global monitor on unmount, just update local state
      setIsMonitoring(false);
    };
  }, [autoStart, startMonitoring, refreshData]);

  return {
    isMonitoring,
    performanceReport,
    systemStatus,
    isLoading,
    error,
    startMonitoring,
    stopMonitoring,
    refreshData
  };
}

export default useNeuralSystemMonitor;
