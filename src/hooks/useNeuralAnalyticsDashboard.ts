
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
  
  // Generate trend data for metrics based on existing data
  const generateTrendData = (metricKey: string, count: number = 14) => {
    if (!analyticsData) return [];
    
    const today = new Date();
    const data: Array<{date: string, value: number}> = [];
    
    // Generate trend data based on the metric
    let baseValue = 0;
    let variance = 0;
    let trend = 0;
    
    switch (metricKey) {
      case 'responseTime':
        baseValue = analyticsData.operationalMetrics.averageResponseTime;
        variance = baseValue * 0.2;  // 20% variance
        trend = -0.5;  // slight downward trend (improvement)
        break;
      case 'accuracy':
        baseValue = analyticsData.operationalMetrics.averageAccuracy * 100;
        variance = 2;  // 2% variance
        trend = 0.1;   // slight upward trend (improvement)
        break;
      case 'errorRate':
        baseValue = analyticsData.operationalMetrics.errorRate;
        variance = baseValue * 0.3;  // 30% variance
        trend = -0.3;  // downward trend (improvement)
        break;
      case 'operations':
        baseValue = analyticsData.operationalMetrics.totalOperations / 30;  // daily average
        variance = baseValue * 0.15;  // 15% variance
        trend = 2;     // upward trend (more usage)
        break;
      default:
        return [];
    }
    
    // Generate the trend data with some randomization
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Apply trend and random variance
      const trendFactor = trend * (count - i) / count;
      const randomVariance = (Math.random() - 0.5) * variance;
      let value = baseValue + baseValue * trendFactor + randomVariance;
      
      // Ensure value is reasonable (non-negative for most metrics, between 0-100 for percentages)
      if (metricKey === 'accuracy') {
        value = Math.max(70, Math.min(100, value));
      } else {
        value = Math.max(0, value);
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Number(value.toFixed(2))
      });
    }
    
    return getFilteredChartData(data);
  };
  
  // Get trend data for the selected metric
  const getMetricTrendData = useCallback((metricKey: string) => {
    return generateTrendData(metricKey);
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
