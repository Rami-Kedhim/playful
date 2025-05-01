
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

const NeuralAnalyticsPanel = () => {
  const neuralMetrics = [
    { name: 'Flow Dynamics', value: 92, unit: '%' },
    { name: 'Engagement Rate', value: 78, unit: '%' },
    { name: 'Neural Load', value: 12, unit: 'ms' },
    { name: 'User Matches', value: 842, unit: '' },
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          <span>Neural System Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {neuralMetrics.map((metric, index) => (
            <div key={index} className="bg-background/50 p-3 rounded-md">
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div className="text-2xl font-bold">
                {metric.value}{metric.unit}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-sm font-medium mb-2">Lucie AI Status</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm">Operational - Processing queries at optimal capacity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralAnalyticsPanel;
