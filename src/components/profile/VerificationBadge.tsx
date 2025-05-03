
import React from "react";
import { Shield, Check, AlertTriangle } from "lucide-react";
import { VerificationLevel } from "@/types/verification";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  level: VerificationLevel;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ level }) => {
  if (level === VerificationLevel.NONE) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center text-gray-400">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Not Verified</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>This profile has not been verified</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const badges = {
    [VerificationLevel.BASIC]: {
      color: "text-blue-500",
      icon: <Shield className="h-4 w-4 mr-1" />,
      label: "Basic Verification",
      description: "Identity has been verified"
    },
    [VerificationLevel.ENHANCED]: {
      color: "text-green-500",
      icon: <Shield className="h-4 w-4 mr-1" />,
      label: "Enhanced Verification",
      description: "Identity and address verified"
    },
    [VerificationLevel.PREMIUM]: {
      color: "text-purple-500",
      icon: <Shield className="h-4 w-4 mr-1" />,
      label: "Premium Verification",
      description: "Full verification with video interview"
    }
  };

  const badge = badges[level] || badges[VerificationLevel.BASIC];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center ${badge.color}`}>
            {badge.icon}
            <span>{badge.label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
