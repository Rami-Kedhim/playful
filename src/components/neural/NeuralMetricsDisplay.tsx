
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';
import { NeuralMetricsDisplayProps } from '@/types/analytics';

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({ 
  metrics,
  period = 'Last 24 hours'
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Neural Network Performance</CardTitle>
        </div>
        <div className="text-sm text-muted-foreground">{period}</div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Response Time</span>
            <span className="font-medium">{metrics.responseTime}ms</span>
          </div>
          <Progress value={100 - Math.min(metrics.responseTime / 10, 100)} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Accuracy</span>
            <span className="font-medium">{metrics.accuracy}%</span>
          </div>
          <Progress value={metrics.accuracy} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Engagement</span>
            <span className="font-medium">{metrics.engagement}%</span>
          </div>
          <Progress value={metrics.engagement} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>User Satisfaction</span>
            <span className="font-medium">{metrics.satisfaction}%</span>
          </div>
          <Progress value={metrics.satisfaction} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
