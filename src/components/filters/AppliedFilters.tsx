
import React from "react";
import { Button } from "@/components/ui/button";
import { FilterBadge } from "./FilterBadge";
import { cn } from "@/lib/utils";

interface FilterItem {
  id: string;
  label: string;
  group?: string;
}

interface AppliedFiltersProps {
  filters: FilterItem[];
  onRemoveFilter: (id: string) => void;
  onClearAll: () => void;
  className?: string;
  showClearButton?: boolean;
}

export function AppliedFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  className,
  showClearButton = true
}: AppliedFiltersProps) {
  if (filters.length === 0) return null;
  
  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {filters.map((filter) => (
        <FilterBadge
          key={filter.id}
          label={filter.label}
          onRemove={() => onRemoveFilter(filter.id)}
        />
      ))}
      
      {showClearButton && filters.length > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearAll}
          className="h-8 text-xs ml-auto"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
