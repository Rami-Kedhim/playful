
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert, BadgeCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface VerificationBadgeProps {
  level: "none" | "basic" | "enhanced" | "premium";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VerificationBadge = ({ 
  level, 
  showLabel = false,
  size = "md",
  className
}: VerificationBadgeProps) => {
  
  // Define sizes for the badge
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  
  // Define text sizes
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  // Define colors and icons based on verification level
  const config = {
    none: {
      icon: ShieldAlert,
      color: "text-gray-400",
      bgColor: "bg-gray-100",
      label: "Not Verified",
      description: "This profile has not been verified"
    },
    basic: {
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      label: "Basic Verification",
      description: "ID verified"
    },
    enhanced: {
      icon: ShieldCheck,
      color: "text-green-500",
      bgColor: "bg-green-100",
      label: "Enhanced Verification",
      description: "ID & phone verified"
    },
    premium: {
      icon: BadgeCheck,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      label: "Premium Verification",
      description: "Fully verified with multiple checks"
    }
  };
  
  const { icon: Icon, color, bgColor, label, description } = config[level];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-1.5", className)}>
            <div className={cn("rounded-full p-1", bgColor)}>
              <Icon className={cn(sizeClasses[size], color)} />
            </div>
            
            {showLabel && (
              <span className={cn("font-medium", color, textSizes[size])}>
                {label}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
