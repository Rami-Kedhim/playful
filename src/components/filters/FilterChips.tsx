
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AnimatedContainer } from '@/components/ui/animated-container';

interface FilterChipProps {
  label: string;
  onRemove: () => void;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
  showTooltip?: boolean;
  index?: number;
}

export const FilterChip = ({ 
  label, 
  onRemove, 
  variant = "secondary", 
  className,
  showTooltip = true,
  index = 0
}: FilterChipProps) => {
  const badge = (
    <AnimatedContainer delay={0.05 * index} animation="scale">
      <Badge 
        variant={variant} 
        className={cn(
          "flex items-center gap-1 transition-all py-1 px-3",
          "hover:shadow-sm cursor-default",
          className
        )}
      >
        {label}
        <X 
          size={14} 
          className="cursor-pointer opacity-70 hover:opacity-100 ml-1" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove filter: ${label}`}
        />
      </Badge>
    </AnimatedContainer>
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

interface FilterChipsGroupProps {
  filters: {
    id: string;
    label: string;
  }[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
  showTooltips?: boolean;
}

export const FilterChipsGroup = ({
  filters,
  onRemove,
  onClearAll,
  variant = "secondary",
  className,
  showTooltips = true,
}: FilterChipsGroupProps) => {
  if (filters.length === 0) return null;
  
  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {filters.map((filter, index) => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          onRemove={() => onRemove(filter.id)}
          variant={variant}
          showTooltip={showTooltips}
          index={index}
        />
      ))}
      
      {onClearAll && filters.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
