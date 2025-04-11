
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "default";
  icon?: React.ReactNode;
  className?: string;
}

/**
 * A badge component for displaying filters with a remove button
 */
const FilterBadge: React.FC<FilterBadgeProps> = ({
  label,
  onRemove,
  variant = "default",
  size = "default",
  icon,
  className
}) => {
  return (
    <Badge 
      variant={variant}
      className={cn(
        "gap-1.5 px-2 py-0.5 cursor-default group",
        size === "sm" && "text-xs h-5",
        className
      )}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="rounded-full flex items-center justify-center 
                   hover:bg-primary-foreground transition-colors
                   group-hover:bg-background/50"
      >
        <X size={size === "sm" ? 12 : 14} />
      </button>
    </Badge>
  );
};

export default FilterBadge;
