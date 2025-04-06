
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FilterValues } from './AdvancedFilters';

interface DisplayFiltersProps {
  filters: FilterValues;
  handleFilterChange: (key: string, value: any) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const DisplayFilters = ({ 
  filters, 
  handleFilterChange, 
  resetFilters,
  hasActiveFilters 
}: DisplayFiltersProps) => {
  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center">
      {filters.location && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Location: {filters.location}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => handleFilterChange('location', '')}
          />
        </Badge>
      )}
      
      {(filters.minAge > 18 || filters.maxAge < 60) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Age: {filters.minAge}-{filters.maxAge}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => {
              handleFilterChange('minAge', 18);
              handleFilterChange('maxAge', 60);
            }}
          />
        </Badge>
      )}
      
      {(filters.minPrice > 0 || filters.maxPrice < 2000) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Price: ${filters.minPrice}-${filters.maxPrice}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => {
              handleFilterChange('minPrice', 0);
              handleFilterChange('maxPrice', 2000);
            }}
          />
        </Badge>
      )}
      
      {filters.tags.map(tag => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
          {tag}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => {
              handleFilterChange('tags', filters.tags.filter(t => t !== tag));
            }}
          />
        </Badge>
      ))}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={resetFilters}
        className="ml-auto"
      >
        Clear all
      </Button>
    </div>
  );
};

export default DisplayFilters;
