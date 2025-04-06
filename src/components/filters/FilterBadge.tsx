
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
  showTooltip?: boolean;
}

export function FilterBadge({ 
  label, 
  onRemove, 
  variant = "secondary", 
  className,
  showTooltip = true
}: FilterBadgeProps) {
  const badge = (
    <Badge 
      variant={variant} 
      className={cn("flex items-center gap-1 transition-all", className)}
    >
      {label}
      <X 
        size={14} 
        className="cursor-pointer opacity-70 hover:opacity-100" 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    </Badge>
  );
  
  if (!showTooltip) return badge;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Remove filter: {label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
