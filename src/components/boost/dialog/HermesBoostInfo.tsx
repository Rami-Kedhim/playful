
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp } from 'lucide-react';
import { HermesStatus } from '@/types/pulse-boost';

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
}

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({ hermesStatus }) => {
  const visibility = hermesStatus.estimatedVisibility || 0;
  const position = hermesStatus.position || 0;
  const score = hermesStatus.score || 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-primary" />
          Hermes Optimizer Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Current Visibility</span>
            <span className="text-sm font-medium">{visibility}%</span>
          </div>
          <Progress value={visibility} className="h-2" />
        </div>
        
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">Current Position</span>
          <p className="text-lg font-semibold">#{position} in search results</p>
        </div>
        
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">Boost Score</span>
          <p className="text-lg font-semibold">{score}/100</p>
        </div>
        
        {hermesStatus.recommendations && hermesStatus.recommendations.length > 0 && (
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Recommendations</span>
            <ul className="text-sm list-disc pl-5 space-y-1">
              {hermesStatus.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Last updated: {new Date().toLocaleTimeString()}
      </CardFooter>
    </Card>
  );
};

export default HermesBoostInfo;
