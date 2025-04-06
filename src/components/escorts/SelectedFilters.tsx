
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SelectedFiltersProps {
  filters: {
    category: string;
    value: string;
  }[];
  onRemove: (category: string, value: string) => void;
  onClearAll: () => void;
}

const SelectedFilters = ({ filters, onRemove, onClearAll }: SelectedFiltersProps) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm font-medium">Selected Filters:</span>
      {filters.map((filter) => (
        <Badge 
          key={`${filter.category}-${filter.value}`} 
          variant="secondary"
          className="flex items-center gap-1 py-1.5"
        >
          <span className="text-xs font-medium">{filter.category}:</span> {filter.value}
          <X 
            size={14} 
            className="ml-1 cursor-pointer" 
            onClick={() => onRemove(filter.category, filter.value)}
          />
        </Badge>
      ))}
      {filters.length > 0 && (
        <button 
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground ml-2"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default SelectedFilters;
