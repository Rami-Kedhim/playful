
import React from "react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { VerificationLevel } from "@/types/verification";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface VerificationBadgeProps {
  level: VerificationLevel | undefined;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  level = "none", 
  size = "md", 
  showLabel = true 
}) => {
  let icon, label, badgeColor;
  
  switch (level) {
    case "premium":
      icon = <ShieldCheck className="h-4 w-4" />;
      label = "Premium";
      badgeColor = "bg-purple-500 hover:bg-purple-600";
      break;
    case "verified":
      icon = <ShieldCheck className="h-4 w-4" />;
      label = "Enhanced";
      badgeColor = "bg-blue-500 hover:bg-blue-600";
      break;
    case "basic":
      icon = <Shield className="h-4 w-4" />;
      label = "Verified";
      badgeColor = "bg-green-500 hover:bg-green-600";
      break;
    default:
      icon = <ShieldAlert className="h-4 w-4" />;
      label = "Unverified";
      badgeColor = "bg-gray-500 hover:bg-gray-600";
  }

  const sizeClass = {
    sm: "text-xs py-0.5 px-1.5",
    md: "text-sm py-1 px-2",
    lg: "text-base py-1.5 px-3"
  }[size];

  const tooltipContent = {
    premium: "Premium verification with background check and official ID verification",
    verified: "Enhanced verification with multiple forms of ID verified",
    basic: "Basic verification with photo ID",
    none: "This profile is not verified"
  }[level as VerificationLevel];

  if (level === "none") {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${badgeColor} ${sizeClass} flex items-center gap-1`}>
            {icon}
            {showLabel && <span>{label}</span>}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
