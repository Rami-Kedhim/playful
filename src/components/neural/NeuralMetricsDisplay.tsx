
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NeuralMetricsDisplayProps } from '@/types/analytics';
import { Activity, BarChart3, Clock, Shield } from 'lucide-react';

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  metrics,
  showDetails = false,
  trend, // Now properly defined in NeuralMetricsDisplayProps
  period, // Now properly defined in NeuralMetricsDisplayProps
  title, // Now properly defined in NeuralMetricsDisplayProps
  refreshInterval // Now properly defined in NeuralMetricsDisplayProps
}) => {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{title}</h3>
          {period && <span className="text-sm text-muted-foreground">{period}</span>}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Shield className="h-5 w-5 text-blue-500" />}
          title="Accuracy"
          value={metrics.accuracy}
          unit="%"
          trend={trend}
        />
        
        <MetricCard
          icon={<Clock className="h-5 w-5 text-green-500" />}
          title="Speed"
          value={metrics.speed}
          unit="%"
          trend={trend}
        />
        
        <MetricCard
          icon={<Activity className="h-5 w-5 text-purple-500" />}
          title="Completeness"
          value={metrics.completeness}
          unit="%"
          trend={trend}
        />
        
        <MetricCard
          icon={<BarChart3 className="h-5 w-5 text-amber-500" />}
          title="Consistency"
          value={metrics.consistency}
          unit="%"
          trend={trend}
        />
      </div>
      
      {showDetails && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="space-y-1 text-sm">
              <p>Last refreshed: {new Date().toLocaleTimeString()}</p>
              {refreshInterval && <p>Auto-refresh: Every {refreshInterval / 1000} seconds</p>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
}> = ({ icon, title, value, unit = '', trend }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          {icon}
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="ml-1 text-sm text-muted-foreground">{unit}</span>}
        </div>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${
            trend === 'up' ? 'text-green-500' :
            trend === 'down' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '→ '}
            {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
