
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NeuralMetricsDisplay from './NeuralMetricsDisplay';
import { NeuralMetric } from '@/types/analytics';

interface NeuralAnalyticsProps {
  userId?: string;
  systemId?: string;
}

const NeuralAnalytics: React.FC<NeuralAnalyticsProps> = ({ userId, systemId }) => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<NeuralMetric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Mock data for example
        const mockMetrics: NeuralMetric[] = [
          {
            name: 'Accuracy',
            value: 97.2,
            previousValue: 94.8,
            change: 2.5,
            target: 99
          },
          {
            name: 'Speed',
            value: 382,
            previousValue: 412,
            change: -7.3,
            history: [350, 375, 400, 412, 382]
          },
          {
            name: 'Completeness',
            value: 89.5,
            previousValue: 85.2,
            change: 5.0,
            target: 95
          },
          {
            name: 'Consistency',
            value: 94.1,
            previousValue: 93.5,
            change: 0.6,
            target: 97
          }
        ];

        setMetrics(mockMetrics);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching neural metrics:', error);
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [userId, systemId]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="metrics" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Neural Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <NeuralMetricsDisplay 
                metrics={metrics} 
                loading={loading}
                refreshInterval={60000}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Trend analysis content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Prediction data will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuralAnalytics;
