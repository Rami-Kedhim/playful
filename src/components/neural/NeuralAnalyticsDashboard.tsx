
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PerformanceChart from './PerformanceChart';

interface NeuralAnalyticsDashboardProps {
  className?: string;
}

const NeuralAnalyticsDashboard: React.FC<NeuralAnalyticsDashboardProps> = ({ className }) => {
  // Mock metrics data
  const metrics = {
    processingEfficiency: 87,
    accuracyRate: 94,
    systemLoad: 42,
    networkThroughput: 76,
    memoryUsage: 38,
    errorRate: 2.3
  };
  
  // Mock recommendation data
  const recommendations = [
    'Optimize neural pathways for improved response time',
    'Consider upgrading memory allocation for complex operations',
    'Schedule maintenance during low-traffic periods'
  ];
  
  return (
    <div className={className}>
      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.processingEfficiency}%</div>
            <PerformanceChart
              data={[65, 68, 72, 73, 80, 85, 87]}
              labels={['6d', '5d', '4d', '3d', '2d', 'Yesterday', 'Today']}
              color="#8b5cf6"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.accuracyRate}%</div>
            <PerformanceChart
              data={[89, 91, 90, 92, 93, 92, 94]}
              labels={['6d', '5d', '4d', '3d', '2d', 'Yesterday', 'Today']}
              color="#10b981"
            />
          </CardContent>
        </Card>
      </div>
      
      {/* System Resources */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-xs text-muted-foreground mb-1">System Load</div>
            <div className="text-xl font-bold">{metrics.systemLoad}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-xs text-muted-foreground mb-1">Memory Usage</div>
            <div className="text-xl font-bold">{metrics.memoryUsage}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-xs text-muted-foreground mb-1">Network</div>
            <div className="text-xl font-bold">{metrics.networkThroughput} MB/s</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-xs text-muted-foreground mb-1">Error Rate</div>
            <div className="text-xl font-bold">{metrics.errorRate}%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>System Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralAnalyticsDashboard;
