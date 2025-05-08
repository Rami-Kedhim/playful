
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceChart from "@/components/neural/PerformanceChart";
import MetricCard from "@/components/analytics/MetricCard";
import { NeuralMetricsDisplayProps } from "@/types/analytics";

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({ 
  title = "Neural Network Performance",
  refreshInterval = 30000
}) => {
  const [metrics, setMetrics] = useState({
    accuracy: 94.2,
    reliability: 91.8,
    availability: 99.7,
    latency: 120,
    throughput: 842
  });

  const [historyData, setHistoryData] = useState({
    accuracy: generateHistoricalData(95, 2, 30),
    reliability: generateHistoricalData(92, 3, 30),
    availability: generateHistoricalData(99, 1, 30),
    latency: generateHistoricalData(125, 15, 30, true),
    throughput: generateHistoricalData(800, 100, 30)
  });

  function generateHistoricalData(
    baseValue: number,
    variance: number,
    days: number,
    isNegative = false
  ): { name: string; value: number }[] {
    const data: { name: string; value: number }[] = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const randomVariance = (Math.random() * variance * 2) - variance;
      let value = baseValue + randomVariance;
      
      // For metrics where lower is better (like latency)
      if (isNegative) {
        value = baseValue - randomVariance;
      }
      
      data.push({
        name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Number(value.toFixed(1))
      });
    }
    
    return data;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        accuracy: Number((prev.accuracy + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        reliability: Number((prev.reliability + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        availability: Number((Math.min(prev.availability + (Math.random() * 0.2 - 0.1), 100)).toFixed(1)),
        latency: Number((prev.latency + (Math.random() * 10 - 5)).toFixed(0)),
        throughput: Number((prev.throughput + (Math.random() * 20 - 10)).toFixed(0))
      }));
      
      // Also update historical data occasionally
      setHistoryData(prev => {
        const updateData = (data: { name: string; value: number }[], newValue: number) => {
          const newData = [...data.slice(1)];
          const now = new Date();
          newData.push({
            name: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: newValue
          });
          return newData;
        };
        
        return {
          accuracy: updateData(prev.accuracy, metrics.accuracy),
          reliability: updateData(prev.reliability, metrics.reliability),
          availability: updateData(prev.availability, metrics.availability),
          latency: updateData(prev.latency, metrics.latency),
          throughput: updateData(prev.throughput, metrics.throughput)
        };
      });
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval, metrics]);

  const refreshMetrics = () => {
    // Simulate refreshing from API
    setMetrics({
      accuracy: Number((90 + Math.random() * 10).toFixed(1)),
      reliability: Number((88 + Math.random() * 10).toFixed(1)),
      availability: Number((95 + Math.random() * 5).toFixed(1)),
      latency: Number((100 + Math.random() * 50).toFixed(0)),
      throughput: Number((750 + Math.random() * 200).toFixed(0))
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Model Accuracy"
          value={metrics.accuracy}
          unit="%"
          change={0.2}
        />
        <MetricCard
          title="System Reliability"
          value={metrics.reliability}
          unit="%"
          change={-0.1}
        />
        <MetricCard
          title="API Availability"
          value={metrics.availability}
          unit="%"
          change={0.05}
        />
        <MetricCard
          title="Response Latency"
          value={metrics.latency}
          unit="ms"
          change={-5}
        />
        <MetricCard
          title="Request Throughput"
          value={metrics.throughput}
          unit="/min"
          change={15}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Accuracy Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={historyData.accuracy.map(item => ({
                name: item.name,
                value: item.value
              }))}
              dataKey="value"
              onRefresh={refreshMetrics}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Reliability Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={historyData.reliability.map(item => ({
                name: item.name,
                value: item.value
              }))}
              dataKey="value"
              onRefresh={refreshMetrics}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={historyData.availability.map(item => ({
                name: item.name,
                value: item.value
              }))}
              dataKey="value"
              onRefresh={refreshMetrics}
              colors={{ stroke: "#10b981", fill: "rgba(16, 185, 129, 0.2)" }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={historyData.latency.map(item => ({
                name: item.name,
                value: item.value
              }))}
              dataKey="value"
              onRefresh={refreshMetrics}
              colors={{ stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.2)" }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={historyData.throughput.map(item => ({
                name: item.name,
                value: item.value
              }))}
              dataKey="value"
              onRefresh={refreshMetrics}
              colors={{ stroke: "#6366f1", fill: "rgba(99, 102, 241, 0.2)" }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralMetricsDisplay;
