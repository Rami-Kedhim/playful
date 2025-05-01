
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Users, ArrowUpRight, ArrowDown } from "lucide-react";
import { hermesOrusOxum } from "@/core/HermesOrusOxum";
import { logInteraction } from "@/utils/uberCore";

interface HermesOxumQueueVisualizationProps {
  profileId: string;
}

const HermesOxumQueueVisualization = ({ profileId }: HermesOxumQueueVisualizationProps) => {
  const [loading, setLoading] = useState(true);
  const [queuePosition, setQueuePosition] = useState(0);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [visibilityScore, setVisibilityScore] = useState(0);
  const [positionChange, setPositionChange] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        setLoading(true);
        
        // Get the optimal time window
        const optimalWindow = hermesOrusOxum.getOptimalTimeWindow();
        const currentHour = new Date().getHours();
        
        // Calculate current visibility impact
        const timeImpact = hermesOrusOxum.calculateTimeImpact(
          currentHour,
          optimalWindow
        );
        
        // In a real system, we would get actual data
        // For demo, we're generating plausible data
        const mockQueue = hermesOrusOxum.getBoostQueue();
        const position = Math.floor(Math.random() * 20) + 1;
        const totalInQueue = position + Math.floor(Math.random() * 30) + 10;
        
        // Record that this profile was viewed
        hermesOrusOxum.recordProfileView(profileId);
        
        // Log interaction with Hermes
        logInteraction('BoostVisualization', 'view-queue-status', {
          profileId,
          queuePosition: position,
          totalInQueue,
          timeImpact
        });
        
        // Simulate position change from last check
        // Negative number is good (moved up in queue)
        const change = Math.random() > 0.5 ? 
          -Math.floor(Math.random() * 5) : 
          Math.floor(Math.random() * 3);
        
        setQueuePosition(position);
        setTotalProfiles(totalInQueue);
        setVisibilityScore(timeImpact);
        setPositionChange(change);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Hermes-Oxum queue data:", err);
        setLoading(false);
      }
    };
    
    fetchQueueData();
    
    // Refresh data every 30 seconds
    const intervalId = setInterval(fetchQueueData, 30000);
    return () => clearInterval(intervalId);
  }, [profileId]);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Visibility Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-[100px] w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate percentile - lower position is better
  const percentile = Math.max(0, Math.min(99, Math.floor((1 - (queuePosition / totalProfiles)) * 100)));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Visibility Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-4xl font-bold">#{queuePosition}</div>
          <div className="text-muted-foreground text-sm">
            Position in visibility queue
            {positionChange !== null && (
              <span className={`ml-2 ${positionChange < 0 ? 'text-green-500' : positionChange > 0 ? 'text-red-500' : ''}`}>
                {positionChange < 0 ? (
                  <span className="flex items-center justify-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {Math.abs(positionChange)} up
                  </span>
                ) : positionChange > 0 ? (
                  <span className="flex items-center justify-center">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    {positionChange} down
                  </span>
                ) : null}
              </span>
            )}
          </div>
        </div>
        
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
            style={{ width: `${percentile}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
            <Users className="h-5 w-5 mb-1 text-blue-500" />
            <span className="text-2xl font-bold">{totalProfiles}</span>
            <span className="text-xs text-muted-foreground">Total Profiles</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
            <BarChart3 className="h-5 w-5 mb-1 text-purple-500" />
            <span className="text-2xl font-bold">{visibilityScore.toFixed(0)}</span>
            <span className="text-xs text-muted-foreground">Visibility Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesOxumQueueVisualization;
