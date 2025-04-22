
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HermesOxumQueueVisualizationProps {
  profileId: string;
}

const HermesOxumQueueVisualization = ({ profileId }: HermesOxumQueueVisualizationProps) => {
  const [loading, setLoading] = useState(true);
  const [hermesData, setHermesData] = useState({
    position: 0,
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: new Date().toISOString()
  });
  
  useEffect(() => {
    // Fetch Hermes queue data for the profile
    const fetchHermesData = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would be an API call
        // For now, simulate with mock data
        setTimeout(() => {
          setHermesData({
            position: Math.floor(Math.random() * 20) + 1,
            activeUsers: Math.floor(Math.random() * 500) + 50,
            estimatedVisibility: Math.floor(Math.random() * 100),
            lastUpdateTime: new Date().toISOString()
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching Hermes data:", error);
        setLoading(false);
      }
    };
    
    fetchHermesData();
    
    // Set up polling every 30 seconds
    const interval = setInterval(fetchHermesData, 30000);
    return () => clearInterval(interval);
  }, [profileId]);
  
  const calculateVisibilityColor = (value: number) => {
    if (value > 80) return "bg-green-500";
    if (value > 50) return "bg-blue-500";
    if (value > 30) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <BarChart className="h-5 w-5 mr-2" />
          Hermes-Oxum Queue Status
        </CardTitle>
        <CardDescription>
          Real-time visibility metrics for your boost
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Queue Position</span>
                <span className="font-medium">#{hermesData.position}</span>
              </div>
              <Progress 
                value={100 - (hermesData.position / 20 * 100)} 
                className="h-2" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-secondary/20 p-3 rounded-md text-center">
                <Users className="h-4 w-4 mx-auto mb-1" />
                <div className="text-lg font-semibold">{hermesData.activeUsers}</div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </div>
              
              <div className="bg-secondary/20 p-3 rounded-md text-center">
                <Zap className="h-4 w-4 mx-auto mb-1" />
                <div className="text-lg font-semibold">{hermesData.estimatedVisibility}%</div>
                <div className="text-xs text-muted-foreground">Visibility</div>
              </div>
            </div>
            
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-sm">
                <span>Visibility Impact</span>
                <span className={`text-${calculateVisibilityColor(hermesData.estimatedVisibility).replace("bg-", "")}`}>
                  {hermesData.estimatedVisibility}%
                </span>
              </div>
              <Progress 
                value={hermesData.estimatedVisibility} 
                className={`h-2 ${calculateVisibilityColor(hermesData.estimatedVisibility)}`} 
              />
            </div>
            
            <div className="text-xs text-muted-foreground text-right pt-1">
              Last updated: {new Date(hermesData.lastUpdateTime).toLocaleTimeString()}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HermesOxumQueueVisualization;
