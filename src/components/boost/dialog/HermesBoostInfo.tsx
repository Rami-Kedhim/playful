
import { HermesBoostStatus } from "@/hooks/boost/useHermesOxumBoost";
import { Progress } from "@/components/ui/progress";
import { Zap, InfoIcon, Users, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HermesBoostInfoProps {
  hermesData: HermesBoostStatus | null;
}

const HermesBoostInfo = ({ hermesData }: HermesBoostInfoProps) => {
  if (!hermesData) return null;
  
  return (
    <div className="p-4 border border-amber-400/20 bg-amber-500/5 rounded-md mt-4">
      <div className="flex items-center mb-3">
        <Zap className="h-4 w-4 text-amber-500 mr-2" />
        <h4 className="text-sm font-medium">Hermes-Oxum Boost Engine</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px]">
              <p>The Hermes-Oxum Engine optimizes your profile visibility using machine learning algorithms. This shows the live status of your boost in the system.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5 mr-1.5" />
          <span>Queue position: </span>
          <span className="ml-auto font-medium text-foreground">{hermesData.queuePosition}/{hermesData.totalUsers}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          <span>Est. wait time: </span>
          <span className="ml-auto font-medium text-foreground">{hermesData.estimatedWait}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Boost efficiency</span>
          <span className="font-medium">{hermesData.boostEfficiency}%</span>
        </div>
        <Progress value={hermesData.boostEfficiency} className="h-1.5" />
      </div>
      
      <div className="mt-3 text-center text-xs text-muted-foreground">
        <span>Running on {hermesData.algorithmVersion}</span>
      </div>
    </div>
  );
};

export default HermesBoostInfo;
