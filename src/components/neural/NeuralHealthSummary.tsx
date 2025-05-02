
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Activity, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface NeuralHealthSummaryProps {
  className?: string;
}

const NeuralHealthSummary: React.FC<NeuralHealthSummaryProps> = ({ className }) => {
  // Mock data for demonstration
  const systemHealth = {
    status: 'operational',
    healthScore: 94,
    alerts: 1,
    recommendations: 2,
    lastUpdated: new Date(),
    cpuUsage: 42,
    memoryUsage: 38,
    responseTime: 84
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Neural System Health</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(systemHealth.status)}`}></div>
              <span className="text-sm font-medium">
                {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System Health</span>
              <span className="text-sm font-bold">{systemHealth.healthScore}%</span>
            </div>
            <Progress value={systemHealth.healthScore} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-muted/50 rounded">
              <div className="text-xs text-muted-foreground">CPU</div>
              <div className="font-medium text-sm">{systemHealth.cpuUsage}%</div>
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <div className="text-xs text-muted-foreground">Memory</div>
              <div className="font-medium text-sm">{systemHealth.memoryUsage}%</div>
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <div className="text-xs text-muted-foreground">Response</div>
              <div className="font-medium text-sm">{systemHealth.responseTime}ms</div>
            </div>
          </div>
          
          {systemHealth.alerts > 0 && (
            <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 rounded">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                {systemHealth.alerts} alert{systemHealth.alerts > 1 ? 's' : ''} and {systemHealth.recommendations} recommendation{systemHealth.recommendations > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link to="/neural/monitor">
            <Activity className="h-4 w-4 mr-2" />
            View Neural Monitoring System
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NeuralHealthSummary;
