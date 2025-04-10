
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, BadgeCheck, User } from "lucide-react";
import { VerificationLevel } from "@/types/escort";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  level: VerificationLevel;
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VerificationBadge = ({ 
  level, 
  showTooltip = true,
  size = "md",
  className = ""
}: VerificationBadgeProps) => {
  const getBadgeContent = () => {
    const classes = {
      sm: "text-xs py-0.5 px-1.5",
      md: "text-sm py-1 px-2",
      lg: "py-1.5 px-3"
    };
    
    const iconSize = {
      sm: 12,
      md: 14,
      lg: 16
    };
    
    const sizeClass = classes[size];
    const iconWidth = iconSize[size];
    
    switch (level) {
      case 'premium':
        return (
          <Badge 
            className={`bg-primary hover:bg-primary ${sizeClass} ${className}`}
          >
            <BadgeCheck className={`w-${iconWidth} h-${iconWidth} mr-1`} />
            Premium
          </Badge>
        );
      case 'enhanced':
        return (
          <Badge 
            className={`bg-blue-500 hover:bg-blue-600 ${sizeClass} ${className}`}
          >
            <CheckCircle className={`w-${iconWidth} h-${iconWidth} mr-1`} />
            Enhanced
          </Badge>
        );
      case 'basic':
        return (
          <Badge 
            className={`bg-green-500 hover:bg-green-600 ${sizeClass} ${className}`}
          >
            <Shield className={`w-${iconWidth} h-${iconWidth} mr-1`} />
            Basic
          </Badge>
        );
      case 'none':
      default:
        return (
          <Badge 
            variant="outline" 
            className={`text-muted-foreground ${sizeClass} ${className}`}
          >
            <User className={`w-${iconWidth} h-${iconWidth} mr-1`} />
            Not Verified
          </Badge>
        );
    }
  };

  const getTooltipContent = () => {
    switch (level) {
      case 'premium':
        return "Premium verification includes government ID, selfie, background check, and personal references";
      case 'enhanced':
        return "Enhanced verification includes government ID, selfie, and background check";
      case 'basic':
        return "Basic verification includes government ID and selfie verification";
      case 'none':
      default:
        return "This profile has not completed verification";
    }
  };

  const badge = getBadgeContent();

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>{getTooltipContent()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
};

export default VerificationBadge;
