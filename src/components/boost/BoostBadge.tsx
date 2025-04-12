
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap } from "lucide-react";

interface BoostBadgeProps {
  isActive: boolean;
  remainingTime?: string;
  variant?: "default" | "small" | "minimal";
  onClick?: () => void;
}

const BoostBadge: React.FC<BoostBadgeProps> = ({
  isActive,
  remainingTime,
  variant = "default",
  onClick
}) => {
  if (!isActive) return null;
  
  // Different badge styles based on variant
  const getBadgeClass = () => {
    switch (variant) {
      case "small":
        return "bg-primary/80 text-primary-foreground text-xs py-0 h-5";
      case "minimal":
        return "bg-primary/20 text-primary hover:bg-primary/30 p-0 h-5";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className={`${getBadgeClass()} flex items-center gap-1 cursor-pointer`}
            onClick={onClick}
          >
            <Zap className={`h-${variant === "minimal" ? 3 : 4} w-${variant === "minimal" ? 3 : 4}`} />
            {variant !== "minimal" && (
              <span>
                {variant === "small" ? "Boosted" : `Boosted ${remainingTime ? `• ${remainingTime}` : ""}`}
              </span>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isActive
              ? `This profile is boosted ${remainingTime ? `(${remainingTime})` : ""}`
              : "Boost this profile for more visibility"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BoostBadge;
