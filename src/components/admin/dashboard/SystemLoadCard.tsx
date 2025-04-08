
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface SystemLoadCardProps {
  systemLoad: number;
  handleSystemLoadChange: (value: number[]) => void;
}

const SystemLoadCard: React.FC<SystemLoadCardProps> = ({ 
  systemLoad,
  handleSystemLoadChange
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Activity className="mr-2 h-4 w-4" />
          System Load
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{systemLoad}%</span>
            <Badge className={systemLoad > 80 ? "bg-red-500" : systemLoad > 60 ? "bg-amber-500" : "bg-green-500"}>
              {systemLoad > 80 ? "High" : systemLoad > 60 ? "Moderate" : "Optimal"}
            </Badge>
          </div>
          
          <Slider
            value={[systemLoad]}
            max={100}
            step={1}
            onValueChange={handleSystemLoadChange}
            className="py-4"
          />
          
          <p className="text-xs text-muted-foreground">
            Current system load affects recommendation quality and distribution fairness
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemLoadCard;
