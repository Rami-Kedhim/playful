
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { useHermesOxumBoost } from "@/hooks/boost/useHermesOxumBoost";
import { Zap, TrendingUp, Users } from "lucide-react";

interface HermesOxumQueueVisualizationProps {
  profileId: string;
}

const HermesOxumQueueVisualization: React.FC<HermesOxumQueueVisualizationProps> = ({ profileId }) => {
  // Fixed import to use named export
  const { hermesStatus: hermesBoostStatus } = useHermesOxumBoost(profileId);
  const [queueData, setQueueData] = useState<any[]>([]);
  
  // Generate mock queue data
  useEffect(() => {
    if (hermesBoostStatus?.isActive || hermesBoostStatus?.active) {
      // Create queue visualization with realistic data
      const position = hermesBoostStatus.position || 1;
      const totalProfiles = Math.max(10, position + Math.floor(Math.random() * 5));
      
      const mockData = [];
      for (let i = 1; i <= totalProfiles; i++) {
        const isCurrentProfile = i === position;
        
        // Generate more realistic score values
        const baseScore = Math.floor(Math.random() * 40) + 40;
        const score = isCurrentProfile ? 
          (hermesBoostStatus.boostScore || baseScore) : 
          baseScore;
        
        mockData.push({
          position: i,
          score,
          isCurrentProfile,
          profileName: isCurrentProfile ? "Your Profile" : `Profile ${i}`,
        });
      }
      
      setQueueData(mockData.sort((a, b) => a.position - b.position));
    }
  }, [hermesBoostStatus]);

  // Don't render if boost is not active
  if (!(hermesBoostStatus?.isActive || hermesBoostStatus?.active)) {
    return null;
  }

  // Set a default timeRemaining if not present in the data
  const timeRemainingMinutes = hermesBoostStatus.timeRemaining || 990; // 16h 30m default
  const timeRemainingHours = Math.floor(timeRemainingMinutes / 60);
  const timeRemainingMins = timeRemainingMinutes % 60;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Hermes-Oxum Boost Queue
            </CardTitle>
            <CardDescription>
              Current position: {hermesBoostStatus.position} in queue
            </CardDescription>
          </div>
          <Badge variant={(hermesBoostStatus.effectivenessScore || 0) > 70 ? "default" : "secondary"}>
            {hermesBoostStatus.effectivenessScore || 75}% Effectiveness
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Score explanation */}
          <div className="flex items-center space-x-2 text-sm">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-muted-foreground">
              Your profile ranks #{hermesBoostStatus.position} with a boost score of {Math.round(hermesBoostStatus.boostScore || 85)}
            </span>
          </div>
          
          {/* Queue visualization */}
          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={queueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="position" label={{ value: "Queue Position", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Boost Score", angle: -90, position: "insideLeft" }} />
                <Tooltip 
                  formatter={(value, name, props) => [`${value}`, "Score"]}
                  labelFormatter={(value) => `Position ${value}`}
                />
                <Bar dataKey="score" name="Boost Score">
                  {queueData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isCurrentProfile ? "#1d4ed8" : "#94a3b8"}
                      stroke={entry.isCurrentProfile ? "#1e40af" : "#64748b"}
                      strokeWidth={entry.isCurrentProfile ? 2 : 1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Queue stats */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center p-2 rounded-md bg-secondary/20">
              <span className="text-xs text-muted-foreground">Position</span>
              <span className="text-xl font-semibold">{hermesBoostStatus.position}</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-md bg-secondary/20">
              <span className="text-xs text-muted-foreground">Time Left</span>
              <span className="text-xl font-semibold">
                {timeRemainingHours}h {timeRemainingMins}m
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-md bg-secondary/20">
              <span className="text-xs text-muted-foreground">Users in Queue</span>
              <span className="text-xl font-semibold">
                {queueData.length}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesOxumQueueVisualization;
