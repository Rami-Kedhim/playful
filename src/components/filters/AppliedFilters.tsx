
import React from 'react';
import { Badge } from '@/components/ui/badge';
import FilterBadge from './FilterBadge';

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
          key={index}
          label={filter.label}
          value={filter.value || filter.key}
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

export default AppliedFilters;
