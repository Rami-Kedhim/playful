
import React, { useState, useEffect } from 'react';
import PerformanceChart from "@/components/neural/PerformanceChart";
import MetricCard from "@/components/analytics/MetricCard";
import { NeuralMetricsDisplayProps } from '@/types/analytics';

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  title,
  refreshInterval = 60000
}) => {
  const [metrics, setMetrics] = useState({
    responseTime: { value: 230, change: -5.2 },
    errorRate: { value: 0.32, change: -12.5 },
    userSatisfaction: { value: 96.7, change: 2.1 },
    predictionAccuracy: { value: 92.4, change: 1.3 }
  });

  const [responseTimeData, setResponseTimeData] = useState([
    { name: '1h', value: 245 },
    { name: '2h', value: 256 },
    { name: '3h', value: 240 },
    { name: '4h', value: 258 },
    { name: '5h', value: 240 },
    { name: '6h', value: 230 }
  ]);

  const [errorRateData, setErrorRateData] = useState([
    { name: '1h', value: 0.42 },
    { name: '2h', value: 0.38 },
    { name: '3h', value: 0.41 },
    { name: '4h', value: 0.37 },
    { name: '5h', value: 0.35 },
    { name: '6h', value: 0.32 }
  ]);

  const [loadData, setLoadData] = useState([
    { name: '1h', value: 58 },
    { name: '2h', value: 63 },
    { name: '3h', value: 71 },
    { name: '4h', value: 84 },
    { name: '5h', value: 79 },
    { name: '6h', value: 85 }
  ]);

  const [satisfactionData, setStatisfactionData] = useState([
    { name: '1h', value: 94.2 },
    { name: '2h', value: 94.5 },
    { name: '3h', value: 95.1 },
    { name: '4h', value: 95.4 },
    { name: '5h', value: 96.3 },
    { name: '6h', value: 96.7 }
  ]);

  // Simulate fetching new data
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate API call for metrics
      setMetrics(prev => ({
        responseTime: { 
          value: Math.floor(Math.random() * 30) + 220,
          change: Math.random() > 0.5 ? Math.random() * -8 : Math.random() * 5
        },
        errorRate: { 
          value: 0.3 + Math.random() * 0.1,
          change: Math.random() > 0.7 ? Math.random() * 5 : Math.random() * -15
        },
        userSatisfaction: { 
          value: 95 + Math.random() * 3,
          change: Math.random() > 0.3 ? Math.random() * 3 : Math.random() * -1
        },
        predictionAccuracy: { 
          value: 90 + Math.random() * 5,
          change: Math.random() > 0.4 ? Math.random() * 2 : Math.random() * -1
        }
      }));
      
      // Update chart data
      setResponseTimeData(prev => {
        const newData = [...prev.slice(1), { 
          name: `${prev.length + 1}h`, 
          value: Math.floor(Math.random() * 30) + 220 
        }];
        return newData;
      });

      setErrorRateData(prev => {
        const newData = [...prev.slice(1), { 
          name: `${prev.length + 1}h`, 
          value: 0.3 + Math.random() * 0.1
        }];
        return newData;
      });
      
      setLoadData(prev => {
        const newData = [...prev.slice(1), { 
          name: `${prev.length + 1}h`, 
          value: 50 + Math.floor(Math.random() * 40)
        }];
        return newData;
      });
      
      setStatisfactionData(prev => {
        const newData = [...prev.slice(1), { 
          name: `${prev.length + 1}h`, 
          value: 94 + Math.random() * 3
        }];
        return newData;
      });
      
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="Response Time"
          value={metrics.responseTime.value}
          unit="ms"
          change={metrics.responseTime.change}
        />
        <MetricCard 
          title="Error Rate"
          value={metrics.errorRate.value}
          unit="%"
          change={metrics.errorRate.change}
        />
        <MetricCard 
          title="User Satisfaction"
          value={metrics.userSatisfaction.value}
          unit="%"
          change={metrics.userSatisfaction.change}
        />
        <MetricCard 
          title="Prediction Accuracy"
          value={metrics.predictionAccuracy.value}
          unit="%"
          change={metrics.predictionAccuracy.change}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Response Time</h3>
          <PerformanceChart
            data={responseTimeData}
            dataKey="responseTime"
          />
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Error Rate</h3>
          <PerformanceChart
            data={errorRateData}
            dataKey="errorRate"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">System Load</h3>
          <PerformanceChart
            data={loadData}
            dataKey="systemLoad"
          />
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">User Satisfaction</h3>
          <PerformanceChart
            data={satisfactionData}
            dataKey="satisfaction"
          />
        </div>
      </div>
    </div>
  );
};

export default NeuralMetricsDisplay;
