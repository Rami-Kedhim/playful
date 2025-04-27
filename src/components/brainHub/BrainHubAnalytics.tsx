
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BrainHubAnalyticsProps {
  className?: string;
}

const BrainHubAnalytics: React.FC<BrainHubAnalyticsProps> = ({ className = '' }) => {
  const { analytics } = useBrainHubHealth();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">System Analytics</CardTitle>
        <CardDescription>
          Performance metrics and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.utilizationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatDate} 
                tick={{ fontSize: 12 }} 
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, '']}
                labelFormatter={(label: number) => formatDate(label)}
              />
              <Line 
                type="monotone" 
                dataKey="cpuUsage" 
                stroke="#8884d8" 
                name="CPU Usage" 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="memoryUsage" 
                stroke="#82ca9d" 
                name="Memory Usage" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">Daily Operations:</span>
            <span className="text-sm font-medium">{analytics.dailyOperations.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Avg Response Time:</span>
            <span className="text-sm font-medium">{analytics.averageResponseTime}ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Error Rate:</span>
            <span className="text-sm font-medium">{analytics.errorRate}%</span>
          </div>
        </div>
        
        {analytics.recommendations.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
            <ul className="text-xs space-y-1 list-disc pl-4">
              {analytics.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BrainHubAnalytics;
