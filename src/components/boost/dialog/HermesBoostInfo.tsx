
import { Sparkles } from "lucide-react";

interface HermesBoostInfoProps {
  hermesData?: {
    position: number;
    activeUsers: number;
    estimatedVisibility: number;
    lastUpdateTime: string;
  };
}

const HermesBoostInfo = ({ hermesData }: HermesBoostInfoProps) => {
  if (!hermesData) return null;
  
  return (
    <div className="rounded-md border p-3 bg-secondary/10">
      <h4 className="text-sm font-medium flex items-center mb-2">
        <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
        Current Boost Metrics
      </h4>
      
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Profiles boosting right now: <span className="text-foreground">{hermesData.activeUsers}</span></p>
        <p>• Average visibility increase: <span className="text-foreground">{hermesData.estimatedVisibility}%</span></p>
        <p>• Best ranking achieved: <span className="text-foreground">#{hermesData.position}</span></p>
      </div>
      
      <p className="text-xs mt-2 italic text-muted-foreground">
        Last updated: {new Date(hermesData.lastUpdateTime).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default HermesBoostInfo;
