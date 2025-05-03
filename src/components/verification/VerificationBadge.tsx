
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VerificationLevel } from "@/types/verification";

interface VerificationBadgeProps {
  level?: VerificationLevel;
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  level = VerificationLevel.BASIC,
  showLabel = true,
  className = "",
  size = 'md',
}) => {
  const getLevelColor = () => {
    switch (level) {
      case VerificationLevel.PREMIUM:
        return "bg-purple-100 text-purple-800 border-purple-300";
      case VerificationLevel.ENHANCED:
        return "bg-blue-100 text-blue-800 border-blue-300";
      case VerificationLevel.BASIC:
      default:
        return "bg-green-100 text-green-800 border-green-300";
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'lg': return 'h-5 w-5';
      case 'md': 
      default: return 'h-4 w-4';
    }
  };
  
  const getTooltipText = () => {
    switch (level) {
      case VerificationLevel.PREMIUM:
        return "Premium Verification - Highest level of verification";
      case VerificationLevel.ENHANCED:
        return "Enhanced Verification - Additional identity checks completed";
      case VerificationLevel.BASIC:
      default:
        return "Basic Verification - Identity has been verified";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`${getLevelColor()} flex items-center gap-1 py-1 px-2 ${className}`}
          >
            <CheckCircle className={getIconSize()} />
            {showLabel && (
              <span className="ml-1">
                {level.charAt(0).toUpperCase() + level.slice(1)} Verified
              </span>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
