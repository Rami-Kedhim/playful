
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { EnhancedBoostStatus } from '@/types/pulse-boost';
import { Zap, Clock } from 'lucide-react';

interface BoostStatusIndicatorProps {
  status: EnhancedBoostStatus;
}

const BoostStatusIndicator: React.FC<BoostStatusIndicatorProps> = ({ status }) => {
  if (!status.isActive) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="p-4 flex items-center gap-3">
          <Badge variant="outline" className="bg-muted/50">
            Not Boosted
          </Badge>
          <span className="text-sm text-muted-foreground">Your profile is not currently boosted</span>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-gradient-to-r from-primary to-purple-600">
              <Zap className="mr-1 h-3 w-3" />
              Boost Active
            </Badge>
            <span className="text-sm font-medium">{status.packageName || 'Unknown Package'}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {status.timeRemaining || 'Unknown time'} remaining
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{Math.round(status.progress || 0)}%</span>
          </div>
          <Progress value={status.progress || 0} className="h-2" />
        </div>
        
        <div className="text-xs text-muted-foreground">
          Started: {status.startedAt ? 
            new Date(status.startedAt).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'N/A'}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostStatusIndicator;
