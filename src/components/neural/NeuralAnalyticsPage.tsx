
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NeuralMetricsDisplay from './NeuralMetricsDisplay';

const NeuralAnalyticsPage: React.FC = () => {
  // Sample neural metrics data conforming to the expected type
  const neurMetrics = {
    accuracy: 92,  // Use the expected property names
    speed: 85,     // from NeuralMetricsDisplayProps
    completeness: 78,
    consistency: 88
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Neural Analytics</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Real-time neural network performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NeuralMetricsDisplay 
              metrics={neurMetrics}
              showDetails={true}
              title="Neural Network Performance"
              period="7d"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralAnalyticsPage;
