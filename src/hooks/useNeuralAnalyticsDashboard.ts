
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNeuralAnalytics } from './useNeuralAnalytics';
import { NeuralAnalyticsReport } from '@/services/neural/types/neuralAnalytics';
import { Anomaly } from '@/types/analytics';

export type AnalyticsChartType = 'usage' | 'performance' | 'forecast';

export interface MetricDetail {
  key: 'responseTime' | 'accuracy' | 'errorRate' | 'operations';
  title: string;
  description: string;
}

export function useNeuralAnalyticsDashboard() {
  const { analyticsData, loading, error, refreshAnalytics } = useNeuralAnalytics();
  const [activeChart, setActiveChart] = useState<AnalyticsChartType>('usage');
  const [acknowledgedAnomalies, setAcknowledgedAnomalies] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(30); // Default: 30 seconds
  const refreshTimerRef = useRef<number | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<MetricDetail | null>(null);
  
  // Extract and format key metrics for display
  const keyMetrics = analyticsData ? {
    responseTime: {
      value: analyticsData.operationalMetrics.averageResponseTime,
      change: analyticsData.operationalMetrics.responseTimeChange,
      unit: 'ms'
    },
    accuracy: {
      value: analyticsData.operationalMetrics.averageAccuracy * 100,
      change: analyticsData.operationalMetrics.accuracyChange,
      unit: '%'
    },
    errorRate: {
      value: analyticsData.operationalMetrics.errorRate,
      change: analyticsData.operationalMetrics.errorRateChange,
      unit: '%'
    },
    operations: {
      value: analyticsData.operationalMetrics.totalOperations,
      change: analyticsData.operationalMetrics.operationsChange,
      unit: ''
    }
  } : null;
  
  // Filter anomalies to exclude acknowledged ones
  const filteredAnomalies = analyticsData?.anomalies.filter(
    anomaly => !acknowledgedAnomalies.includes(anomaly.id || '')
  ) || [];
  
  // Check if there are any critical anomalies
  const hasCriticalAnomalies = filteredAnomalies.some(
    anomaly => anomaly.severity === 'high'
  ) || false;
  
  // Function to acknowledge an anomaly
  const acknowledgeAnomaly = (id: string) => {
    setAcknowledgedAnomalies(prev => [...prev, id]);
  };

  // Handle date range changes
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  // Toggle auto-refresh
  const toggleAutoRefresh = useCallback(() => {
    setIsAutoRefreshEnabled(prev => !prev);
  }, []);

  // Change refresh interval
  const changeRefreshInterval = useCallback((interval: number) => {
    setRefreshInterval(interval);
  }, []);
  
  // Drill down into a specific metric
  const drillIntoMetric = useCallback((metric: MetricDetail) => {
    setSelectedMetric(metric);
  }, []);
  
  // Exit drill-down view
  const exitDrillDown = useCallback(() => {
    setSelectedMetric(null);
  }, []);

  // Setup or clear auto-refresh timer
  useEffect(() => {
    // Clear existing timer
    if (refreshTimerRef.current) {
      window.clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    // Set new timer if auto-refresh is enabled
    if (isAutoRefreshEnabled) {
      refreshTimerRef.current = window.setInterval(() => {
        refreshAnalytics();
      }, refreshInterval * 1000);
    }

    // Cleanup on unmount
    return () => {
      if (refreshTimerRef.current) {
        window.clearInterval(refreshTimerRef.current);
      }
    };
  }, [isAutoRefreshEnabled, refreshInterval, refreshAnalytics]);
  
  // Filter chart data based on date range
  const getFilteredChartData = (data: Array<{date: string, value: number}>) => {
    if (!startDate && !endDate) return data;
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      const isAfterStart = !startDate || itemDate >= startDate;
      const isBeforeEnd = !endDate || itemDate <= endDate;
      return isAfterStart && isBeforeEnd;
    });
  };
  
  // Get trend data for the selected metric
  const getMetricTrendData = useCallback((metricKey: string) => {
    if (!analyticsData) return [];
    
    switch (metricKey) {
      case 'responseTime':
        return getFilteredChartData(analyticsData.operationalMetrics.responseTimeTrend || []);
      case 'accuracy':
        return getFilteredChartData(analyticsData.operationalMetrics.accuracyTrend || []);
      case 'errorRate':
        return getFilteredChartData(analyticsData.operationalMetrics.errorRateTrend || []);
      case 'operations':
        return getFilteredChartData(analyticsData.operationalMetrics.operationsTrend || []);
      default:
        return [];
    }
  }, [analyticsData, startDate, endDate]);
  
  return {
    analyticsData: analyticsData ? {
      ...analyticsData,
      anomalies: filteredAnomalies,
      usageMetrics: {
        ...analyticsData.usageMetrics,
        dailyUsageTrend: getFilteredChartData(analyticsData.usageMetrics.dailyUsageTrend)
      },
      // We also need to filter performanceForecast if it exists
      performanceForecast: analyticsData.performanceForecast ? 
        analyticsData.performanceForecast.filter(item => {
          const itemDate = new Date(item.date);
          const isAfterStart = !startDate || itemDate >= startDate;
          const isBeforeEnd = !endDate || itemDate <= endDate;
          return isAfterStart && isBeforeEnd;
        }) : 
        analyticsData.performanceForecast
    } : null,
    loading,
    error,
    refreshAnalytics,
    activeChart,
    setActiveChart,
    keyMetrics,
    hasCriticalAnomalies,
    acknowledgeAnomaly,
    startDate,
    endDate,
    handleDateRangeChange,
    isAutoRefreshEnabled,
    refreshInterval,
    toggleAutoRefresh,
    changeRefreshInterval,
    selectedMetric,
    drillIntoMetric,
    exitDrillDown,
    getMetricTrendData
  };
}

export default useNeuralAnalyticsDashboard;
