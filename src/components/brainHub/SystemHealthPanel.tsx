import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBrainHubHealth } from '@/hooks/useBrainHubHealth';
import { BrainHubHealthStatus } from '@/types/brainHubHealth';
import { CircleCheck, AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import PersistenceControls from './PersistenceControls';

interface SystemHealthPanelProps {
  className?: string;
}

const SystemHealthPanel: React.FC<SystemHealthPanelProps> = ({ className = '' }) => {
  const { health, refreshHealth } = useBrainHubHealth();
  
  const getStatusIcon = (status: BrainHubHealthStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CircleCheck className="w-10 h-10 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-10 h-10 text-red-500" />;
      default:
        return <RefreshCw className="w-10 h-10 text-blue-500" />;
    }
  };
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">System Health</CardTitle>
          <CardDescription>
            Current status of the Brain Hub neural systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            {getStatusIcon(health.status)}
            <div>
              <h4 className="font-medium text-lg capitalize">{health.status}</h4>
              <p className="text-muted-foreground">{health.message}</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {health.metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{metric.name}</span>
                <span className={`text-sm font-medium ${
                  metric.status === 'healthy' ? 'text-green-500' : 
                  metric.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Add the Persistence Controls component */}
      <div className="space-y-6">
        <PersistenceControls />
        {/* Other small components can be added here */}
      </div>
    </div>
  );
};

export default SystemHealthPanel;
