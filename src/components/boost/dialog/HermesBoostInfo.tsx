
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Rocket } from 'lucide-react';
import { HermesStatus } from '@/types/pulse-boost';

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  return (
    <Card className="border-none shadow-none bg-muted/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="h-4 w-4 text-amber-500" />
          <h3 className="font-medium text-sm">Visibility Score</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{hermesStatus.score || 0}</span>
            <span className="text-xs text-muted-foreground">Out of 100</span>
          </div>
          
          <Progress value={hermesStatus.score || 0} className="h-2" />
          
          <p className="text-xs text-muted-foreground">
            Estimated visibility: {hermesStatus.estimatedVisibility || 0}%
          </p>
          
          {hermesStatus.recommendations && hermesStatus.recommendations.length > 0 && (
            <div className="mt-3">
              <h4 className="text-xs font-medium mb-1">Recommendations:</h4>
              <ul className="text-xs space-y-1">
                {hermesStatus.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-primary">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
