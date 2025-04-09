
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  showTooltip?: boolean;
}

const FilterBadge = ({ 
  label, 
  onRemove, 
  icon,
  variant = "outline",
  className,
  showTooltip = false
}: FilterBadgeProps) => {
  const badge = (
    <Badge 
      variant={variant} 
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 h-7 transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <span className="text-xs font-medium">{label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-1 rounded-full hover:bg-muted p-0.5 text-muted-foreground hover:text-foreground"
        aria-label={`Remove ${label} filter`}
      >
        <X size={12} />
      </button>
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
};

export default FilterBadge;
