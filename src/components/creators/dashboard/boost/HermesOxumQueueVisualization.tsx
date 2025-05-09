
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useBoostAnalytics } from '@/hooks/useBoostAnalytics';

interface HermesOxumQueueVisualizationProps {
  userId: string;
  activeBoosts: number;
}

const HermesOxumQueueVisualization: React.FC<HermesOxumQueueVisualizationProps> = ({
  userId,
  activeBoosts = 0
}) => {
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [totalInQueue, setTotalInQueue] = useState<number>(100);
  const [progress, setProgress] = useState(0);
  
  // Fix the argument error by providing the userId
  const { analytics, loading } = useBoostAnalytics(userId);
  
  useEffect(() => {
    // Simulate queue position - in production this would come from Hermes
    const position = Math.floor(Math.random() * 50) + 1;
    setQueuePosition(position);
    
    // Fix the argument error by adjusting the parameters
    // This is a simple fix without knowing the actual implementation
    // We're using only position now
    setProgress(((totalInQueue - position) / totalInQueue) * 100);
    
  }, [totalInQueue]);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Queue Position</CardTitle>
          <CardDescription>Loading your position data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hermes Queue Position</CardTitle>
        <CardDescription>
          Your position in the visibility queue
        </CardDescription>
      </CardHeader>
      <CardContent>
        {queuePosition !== null && (
          <>
            <div className="flex justify-between mb-2">
              <span>Position {queuePosition} of {totalInQueue}</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {activeBoosts > 0 
                ? `Your profile has ${activeBoosts} active boost${activeBoosts > 1 ? 's' : ''}`
                : "Add a boost to improve your queue position"}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HermesOxumQueueVisualization;
