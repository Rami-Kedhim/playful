
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import useNeuralAnalytics from '@/hooks/useNeuralAnalytics';

const NeuralAnalyticsPanel = () => {
  const { analyticsData, loading, error } = useNeuralAnalytics();
  
  if (loading) {
    return (
      <Card className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    );
  }
  
  if (error || !analyticsData) {
    return (
      <Card className="w-full h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load neural analytics</p>
      </Card>
    );
  }
  
  // Extract metrics from analytics data
  const responseTime = analyticsData.systemMetrics?.responseTimeMs || 0;
  const accuracy = analyticsData.modelPerformance?.accuracy * 100 || 0;
  const throughput = analyticsData.systemMetrics?.throughput || 0;
  const errorRate = analyticsData.systemMetrics?.errorRate || 0;
  
  // Determine change indicators
  const responseTimeChange = analyticsData.operationalMetrics?.responseTimeChange || 0;
  const accuracyChange = analyticsData.operationalMetrics?.accuracyChange || 0;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Neural System Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Response Time */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Response Time</span>
            <span className="text-sm flex items-center gap-1">
              {responseTime.toFixed(2)}ms
              {responseTimeChange !== 0 && (
                responseTimeChange < 0 ? 
                <ArrowDownIcon className="h-4 w-4 text-green-500" /> : 
                <ArrowUpIcon className="h-4 w-4 text-red-500" />
              )}
            </span>
          </div>
          <Progress value={Math.min(100, (responseTime / 500) * 100)} className="h-1" />
        </div>
        
        {/* Accuracy */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Accuracy</span>
            <span className="text-sm flex items-center gap-1">
              {accuracy.toFixed(2)}%
              {accuracyChange !== 0 && (
                accuracyChange > 0 ? 
                <ArrowUpIcon className="h-4 w-4 text-green-500" /> : 
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
            </span>
          </div>
          <Progress value={accuracy} className="h-1" />
        </div>
        
        {/* Throughput */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Throughput</span>
            <span className="text-sm">{throughput.toFixed(2)} req/s</span>
          </div>
          <Progress value={Math.min(100, (throughput / 50) * 100)} className="h-1" />
        </div>
        
        {/* Error Rate */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Error Rate</span>
            <span className="text-sm">{(errorRate * 100).toFixed(2)}%</span>
          </div>
          <Progress value={errorRate * 100} className="h-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalyticsPanel;
