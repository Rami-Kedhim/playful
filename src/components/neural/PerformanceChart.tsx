import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useNeuralAnalyticsDashboard from '@/hooks/useNeuralAnalyticsDashboard';

interface PerformanceChartProps {
  metricKey?: 'responseTime' | 'accuracy' | 'errorRate' | 'operations';
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ metricKey }) => {
  const { analyticsData, getTrendDataForMetric } = useNeuralAnalyticsDashboard();

  if (!analyticsData) {
    return <div className="h-full flex items-center justify-center">Loading chart data...</div>;
  }

  // If specific metric key is provided, show only that metric
  if (metricKey) {
    const data = getTrendDataForMetric(metricKey);
    
    const getColorForMetric = (key: string) => {
      switch (key) {
        case 'responseTime': return '#6366f1';  // indigo
        case 'accuracy': return '#10b981';      // green
        case 'errorRate': return '#ef4444';     // red
        case 'operations': return '#f59e0b';    // amber
        default: return '#6366f1';
      }
    };

    const getUnitForMetric = (key: string) => {
      switch (key) {
        case 'responseTime': return 'ms';
        case 'accuracy': return '%';
        case 'errorRate': return '%';
        case 'operations': return '';
        default: return '';
      }
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="date" />
          <YAxis unit={getUnitForMetric(metricKey)} />
          <Tooltip 
            formatter={(value) => [
              `${value}${getUnitForMetric(metricKey)}`, 
              metricKey.charAt(0).toUpperCase() + metricKey.slice(1)
            ]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getColorForMetric(metricKey)}
            strokeWidth={2} 
            activeDot={{ r: 6 }}
            name={metricKey.charAt(0).toUpperCase() + metricKey.slice(1)} 
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // Otherwise show overview with multiple metrics
  const multiMetricData = analyticsData.performanceForecast.map(day => ({
    date: day.date,
    responseTime: day.metrics.predictedResponseTime,
    errorRate: day.metrics.predictedErrorRate * 100,
    load: day.metrics.expectedLoad
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={multiMetricData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="responseTime" 
          stroke="#6366f1" 
          strokeWidth={2}
          name="Response Time (ms)" 
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="errorRate" 
          stroke="#ef4444" 
          strokeWidth={2}
          name="Error Rate (%)" 
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="load" 
          stroke="#f59e0b" 
          strokeWidth={2}
          name="Load" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
