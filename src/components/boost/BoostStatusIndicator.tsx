
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, Clock } from "lucide-react";
import { BoostStatus } from "@/types/boost";

interface BoostStatusIndicatorProps {
  status: BoostStatus;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

const BoostStatusIndicator: React.FC<BoostStatusIndicatorProps> = ({
  status,
  size = 'md',
  showTooltip = true,
  className = ''
}) => {
  if (!status.isActive) return null;

  const sizeClasses = {
    sm: 'text-xs py-0.5 px-1.5',
    md: 'text-sm py-1 px-2',
    lg: 'py-1 px-3'
  };
  
  const badgeContent = (
    <Badge 
      variant="outline" 
      className={`gap-1 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20 ${sizeClasses[size]} ${className}`}
    >
      <Zap className={`${size === 'sm' ? 'h-2.5 w-2.5' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'} fill-current`} />
      Boosted
    </Badge>
  );
  
  if (!showTooltip) return badgeContent;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-1">
          <p className="font-medium">Profile is boosted</p>
          {status.packageName && <p className="text-xs">{status.packageName}</p>}
          {status.timeRemaining && (
            <div className="flex items-center text-xs gap-1 mt-1">
              <Clock className="h-3 w-3" />
              <span>{status.timeRemaining} remaining</span>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BoostStatusIndicator;
