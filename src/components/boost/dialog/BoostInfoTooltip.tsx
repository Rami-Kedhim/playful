
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BoostInfoTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center text-sm text-muted-foreground cursor-help mt-2">
            <Info className="h-4 w-4 mr-1" />
            How do profile boosts work?
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">
            Boosted profiles appear with a special badge and get higher priority in search 
            results and browsing. The Oxum algorithm ensures fairness in the boosting system.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BoostInfoTooltip;
