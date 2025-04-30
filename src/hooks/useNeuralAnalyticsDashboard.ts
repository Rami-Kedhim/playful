
import { useState, useEffect, useCallback } from 'react';
import useNeuralAnalytics from './useNeuralAnalytics';

export interface MetricDetail {
  key: 'responseTime' | 'accuracy' | 'errorRate' | 'operations';
  title: string;
  description?: string;
}

export default function useNeuralAnalyticsDashboard() {
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [dateRange, setDateRange] = useState<{from?: Date, to?: Date}>({});
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(30); // in seconds
  const [selectedMetric, setSelectedMetric] = useState<MetricDetail | null>(null);

  // Generate trend data for the selected metric
  const getTrendDataForMetric = useCallback((metricKey: string) => {
    if (!analyticsData) return [];
    
    // Get data from the right source based on metric
    let sourceData;
    if (metricKey === 'responseTime') {
      sourceData = analyticsData.performanceForecast.map(item => ({
        date: item.date,
        value: item.metrics.predictedResponseTime
      }));
    } else if (metricKey === 'accuracy') {
      sourceData = analyticsData.performanceForecast.map(item => ({
        date: item.date,
        value: (1 - item.metrics.predictedErrorRate) * 100
      }));
    } else if (metricKey === 'errorRate') {
      sourceData = analyticsData.performanceForecast.map(item => ({
        date: item.date,
        value: item.metrics.predictedErrorRate * 100
      }));
    } else if (metricKey === 'operations') {
      sourceData = analyticsData.performanceForecast.map(item => ({
        date: item.date,
        value: item.metrics.expectedLoad
      }));
    } else {
      sourceData = [];
    }
    
    return sourceData;
  }, [analyticsData]);

  // Handle date range changes
  const handleDateChange = useCallback((start?: Date, end?: Date) => {
    setDateRange({ from: start, to: end });
    // In a real app, we would filter the analytics data based on the date range
    refreshAnalytics();
  }, [refreshAnalytics]);

  // Handle auto-refresh
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (isAutoRefreshEnabled && refreshInterval > 0) {
      intervalId = setInterval(() => {
        refreshAnalytics();
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoRefreshEnabled, refreshInterval, refreshAnalytics]);

  // Toggle auto-refresh
  const toggleAutoRefresh = useCallback(() => {
    setIsAutoRefreshEnabled(prev => !prev);
  }, []);

  // Change refresh interval
  const changeRefreshInterval = useCallback((interval: number) => {
    setRefreshInterval(interval);
  }, []);

  // Handle drill-down into a specific metric
  const handleDrillDown = useCallback((metric: MetricDetail) => {
    setSelectedMetric(metric);
  }, []);

  // Return to main dashboard
  const handleBackToOverview = useCallback(() => {
    setSelectedMetric(null);
  }, []);

  // Get value for a specific metric
  const getMetricValue = useCallback((metricKey: string): { value: number, change: number } => {
    if (!analyticsData) return { value: 0, change: 0 };
    
    switch(metricKey) {
      case 'responseTime':
        return { 
          value: analyticsData.systemMetrics.responseTimeMs, 
          change: analyticsData.operationalMetrics.responseTimeChange 
        };
      case 'accuracy':
        return { 
          value: analyticsData.modelPerformance.accuracy * 100, 
          change: analyticsData.operationalMetrics.accuracyChange 
        };
      case 'errorRate':
        return { 
          value: analyticsData.systemMetrics.errorRate, 
          change: analyticsData.operationalMetrics.errorRateChange 
        };
      case 'operations':
        return { 
          value: analyticsData.operationalMetrics.totalOperations, 
          change: analyticsData.operationalMetrics.operationsChange 
        };
      default:
        return { value: 0, change: 0 };
    }
  }, [analyticsData]);

  return {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    dateRange,
    handleDateChange,
    isAutoRefreshEnabled,
    refreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    handleDrillDown,
    handleBackToOverview,
    getMetricValue,
    getTrendDataForMetric
  };
}
