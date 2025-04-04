
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap } from "lucide-react";

interface LivecamBoostBadgeProps {
  isBoosted: boolean;
}

const LivecamBoostBadge = ({ isBoosted }: LivecamBoostBadgeProps) => {
  if (!isBoosted) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className="gap-1 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <Zap className="h-3 w-3" />
            Boosted
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>This livecam is currently receiving a visibility boost</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LivecamBoostBadge;
