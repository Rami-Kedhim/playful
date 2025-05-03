
import React, { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeBadgeLabel, { type ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

interface Filter {
  label: string;
  key: string;
  value?: string;
}

interface AppliedFiltersProps {
  filters: Filter[];
  removeFilter: (filter: Filter) => void;
  clearFilters: () => void;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({ 
  filters, 
  removeFilter,
  clearFilters 
}) => {
  if (filters.length === 0) {
    return (
      <Badge variant="secondary">
        No filters applied
      </Badge>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <FilterBadge
          key={`${filter.key}-${filter.value || index}`}
          filter={filter}
          onRemove={() => removeFilter(filter)}
        />
      ))}
      <Badge 
        variant="outline" 
        className="cursor-pointer hover:bg-secondary/30"
        onClick={clearFilters}
      >
        Clear all
      </Badge>
    </div>
  );
};

interface FilterBadgeProps {
  filter: Filter;
  onRemove: () => void;
}

// Memoize FilterBadge to prevent unnecessary rerenders
const FilterBadge = memo<FilterBadgeProps>(({ filter, onRemove }) => {
  // Special service type rendering
  if (filter.key === 'serviceType' || filter.key === 'service') {
    // Ensure the value is one of the valid ServiceTypeFilter values
    const safeValue = filter.value as ServiceTypeFilter;
    
    if (!safeValue) return null;

    return (
      <div className="inline-flex items-center gap-1 bg-secondary/50 rounded-full pl-2 pr-1 text-sm">
        <ServiceTypeBadgeLabel type={safeValue} />
        <button 
          onClick={onRemove}
          className="rounded-full w-5 h-5 flex items-center justify-center hover:bg-secondary text-muted-foreground transition-colors"
          aria-label="Remove filter"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <Badge 
      variant="secondary"
      className="flex gap-1 items-center pl-3 pr-1"
    >
      <span>{filter.label}: <strong>{filter.value || 'Yes'}</strong></span>
      <button 
        onClick={onRemove}
        className="rounded-full w-5 h-5 flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
        aria-label="Remove filter"
      >
        ×
      </button>
    </Badge>
  );
});

FilterBadge.displayName = 'FilterBadge';

export default memo(AppliedFilters);
