
import { Info } from "lucide-react";
import { HermesBoostStatus } from "@/hooks/boost/useHermesOxumBoost";

interface HermesBoostInfoProps {
  hermesData: HermesBoostStatus | null;
}

const HermesBoostInfo = ({ hermesData }: HermesBoostInfoProps) => {
  if (!hermesData || !hermesData.isActive) {
    return null;
  }

  return (
    <div className="p-3 bg-muted/20 border border-muted rounded-md">
      <h4 className="text-sm font-medium mb-2 flex items-center">
        <Info className="h-4 w-4 mr-2 text-blue-500" />
        Hermes Boost Analytics
      </h4>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Queue Position:</span>
          <span className="font-medium ml-1">{hermesData.position || 'N/A'}</span>
        </div>
        
        <div>
          <span className="text-muted-foreground">Effectiveness:</span>
          <span className={`font-medium ml-1 ${
            hermesData.effectivenessScore > 80 ? 'text-green-500' : 
            hermesData.effectivenessScore > 60 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {hermesData.effectivenessScore}%
          </span>
        </div>

        <div>
          <span className="text-muted-foreground">Boost Score:</span>
          <span className="font-medium ml-1">{Math.round(hermesData.boostScore)}</span>
        </div>
        
        <div>
          <span className="text-muted-foreground">Time Left:</span>
          <span className="font-medium ml-1">
            {Math.floor(hermesData.timeRemaining / 60)}h {Math.round(hermesData.timeRemaining % 60)}m
          </span>
        </div>
      </div>
    </div>
  );
};

export default HermesBoostInfo;
