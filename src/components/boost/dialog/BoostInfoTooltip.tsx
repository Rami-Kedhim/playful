
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BoostInfoTooltip = () => {
  return (
    <div className="mt-2 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <HelpCircle className="h-3 w-3" />
        <span>About Boosts</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <HelpCircle className="h-3 w-3 ml-1 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p>
                Profile boosts increase your visibility in search results and the platform.
                The Oxum Algorithm calculates your boost price based on factors like profile 
                completeness, region, rating, and traffic patterns.
              </p>
              <p className="mt-2">
                Higher profile completeness and ratings can lower your boost cost.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-1 flex flex-col gap-1 pl-4">
        <div className="flex items-center justify-between">
          <span>Base price:</span>
          <span>50 LC</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Premium locations:</span>
          <span>+15-20 LC</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Low profile completeness:</span>
          <span>+15-50 LC</span>
        </div>
        <div className="flex items-center justify-between">
          <span>High rating discount:</span>
          <span>-5-15 LC</span>
        </div>
      </div>
    </div>
  );
};

export default BoostInfoTooltip;
