
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Activity, Server, Clock } from 'lucide-react';

interface BrainHubMetricsProps {
  cpuUsage: number;
  memoryUsage: number;
  responseTime?: number;
  className?: string;
}

const BrainHubMetrics: React.FC<BrainHubMetricsProps> = ({
  cpuUsage,
  memoryUsage,
  responseTime,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-xs">
            <Activity className="h-3 w-3 mr-1" />
            <span>CPU Usage</span>
          </div>
          <span className="text-xs">{cpuUsage}%</span>
        </div>
        <Progress value={cpuUsage} className="h-1.5" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-xs">
            <Server className="h-3 w-3 mr-1" />
            <span>Memory Usage</span>
          </div>
          <span className="text-xs">{memoryUsage}%</span>
        </div>
        <Progress value={memoryUsage} className="h-1.5" />
      </div>
      
      {responseTime !== undefined && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span>Response Time</span>
            </div>
            <span className="text-xs">{responseTime} ms</span>
          </div>
          <Progress 
            value={Math.min(responseTime / 10, 100)} 
            className="h-1.5" 
          />
        </div>
      )}
    </div>
  );
};

export default BrainHubMetrics;
