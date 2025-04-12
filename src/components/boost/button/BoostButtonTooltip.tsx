
import { ReactNode } from "react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { BoostStatus } from "@/types/boost";

interface BoostButtonTooltipProps {
  boostStatus: BoostStatus;
  placement?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
}

const BoostButtonTooltip = ({
  boostStatus,
  placement = "top",
  children
}: BoostButtonTooltipProps) => {
  const tooltipText = boostStatus.isActive 
    ? `Boosted: ${boostStatus.progress}% complete`
    : "Boost your profile visibility";
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={placement}>
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BoostButtonTooltip;
