
import React, { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ServiceTypeFilter } from "@/components/escorts/filters/ServiceTypeBadgeLabel";

interface Filter {
  key: string;
  label: string;
  value?: string | number;
}

interface ActiveFiltersDisplayProps {
  activeFilters: Filter[];
  onRemoveFilter: (filter: Filter) => void;
  onClearAllFilters: () => void;
  className?: string;
  showFilterCount?: boolean; // New prop to show/hide count
}

const ActiveFiltersDisplay = memo<ActiveFiltersDisplayProps>(({
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  className = "",
  showFilterCount = false, // Default to not showing count
}) => {
  // Return early if no active filters
  if (!activeFilters || activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {showFilterCount && (
        <div className="text-sm text-muted-foreground mb-2">
          <span>{activeFilters.length} active {activeFilters.length === 1 ? 'filter' : 'filters'}</span>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <Badge
            key={`${filter.key}-${filter.value || index}`}
            variant="secondary"
            className="flex gap-1.5 items-center pl-3 pr-2"
          >
            <span>
              {filter.label}
              {filter.value !== undefined && `: ${filter.value}`}
            </span>
            <button
              onClick={() => onRemoveFilter(filter)}
              className="rounded-full w-5 h-5 flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-secondary/30 flex items-center gap-1.5"
          onClick={onClearAllFilters}
        >
          Clear all
        </Badge>
      </div>
    </div>
  );
});

ActiveFiltersDisplay.displayName = "ActiveFiltersDisplay";

export default ActiveFiltersDisplay;
