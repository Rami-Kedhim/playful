
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SystemStatusProps {
  status: {
    status: string;
    uptime: number;
    components?: Array<{
      name: string;
      status: string;
      health: number;
    }>;
  };
}

const SystemStatusPanel: React.FC<SystemStatusProps> = ({ status }) => {
  const getStatusColor = (statusValue: string): string => {
    switch (statusValue.toLowerCase()) {
      case 'operational':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };
  
  const getHealthColor = (health: number): string => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>System Status</span>
          <span className={getStatusColor(status.status)}>● {status.status}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">System Uptime</span>
          <span className="font-medium">{status.uptime.toFixed(1)}%</span>
        </div>
        
        {status.components && status.components.map((component, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>{component.name}</span>
              <span className={getStatusColor(component.status)}>{component.status}</span>
            </div>
            <Progress value={component.health} className={getHealthColor(component.health)} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SystemStatusPanel;
