
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, BadgeCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  level: "none" | "basic" | "enhanced" | "premium";
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
  const sizeClasses = {
    sm: "text-xs py-0.5 px-1.5",
    md: "text-sm py-1 px-2",
    lg: "text-base py-1.5 px-3"
  };

  const getBadgeContent = () => {
    const iconClass = size === "sm" ? "h-3 w-3 mr-1" : size === "lg" ? "h-5 w-5 mr-2" : "h-4 w-4 mr-1.5";
    
    switch (level) {
      case "premium":
        return (
          <Badge variant="default" className={`bg-primary hover:bg-primary ${sizeClasses[size]} ${className}`}>
            <BadgeCheck className={iconClass} />
            Premium
          </Badge>
        );
      case "enhanced":
        return (
          <Badge variant="default" className={`bg-blue-500 hover:bg-blue-600 ${sizeClasses[size]} ${className}`}>
            <CheckCircle className={iconClass} />
            Enhanced
          </Badge>
        );
      case "basic":
        return (
          <Badge variant="default" className={`bg-green-500 hover:bg-green-600 ${sizeClasses[size]} ${className}`}>
            <Shield className={iconClass} />
            Basic
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className={`text-muted-foreground ${sizeClasses[size]} ${className}`}>
            Not Verified
          </Badge>
        );
    }
  };

  const getTooltipContent = () => {
    switch (level) {
      case "premium":
        return "Premium verification includes government ID, background check, and personal references";
      case "enhanced":
        return "Enhanced verification includes government ID and background check";
      case "basic":
        return "Basic verification includes government ID verification";
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
