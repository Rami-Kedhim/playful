
import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, BarChart } from 'lucide-react';
import { HermesBoostInfoProps } from '../types';

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ 
  hermesStatus, 
  status,
  hermesData 
}) => {
  // Use whichever prop is provided
  const data = hermesData || hermesStatus || status;
  
  if (!data) {
    return null;
  }
  
  const lastUpdateTime = new Date(data.lastUpdateTime);
  const formattedUpdateTime = lastUpdateTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <Card>
      <CardContent className="p-4">
        <CardTitle className="text-sm font-medium flex items-center mb-2">
          <BarChart className="h-4 w-4 mr-2" />
          Hermes-Oxum System Status
        </CardTitle>
        <CardDescription>
          Live boost performance metrics updated at {formattedUpdateTime}
        </CardDescription>
        
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="flex flex-col items-center p-2 bg-muted rounded">
            <Users className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-medium">{data.activeUsers}</span>
            <span className="text-xs text-muted-foreground">Active Users</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted rounded">
            <TrendingUp className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-medium">#{data.position}</span>
            <span className="text-xs text-muted-foreground">Current Rank</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted rounded">
            <BarChart className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-medium">{data.estimatedVisibility}%</span>
            <span className="text-xs text-muted-foreground">Visibility</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
