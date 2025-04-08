
import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterActionsProps {
  clearFilters: () => void;
  applyFilters: () => void;
}

const FilterActions = ({ 
  clearFilters, 
  applyFilters 
}: FilterActionsProps) => {
  return (
    <div className="flex justify-between mt-6 border-t pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={clearFilters}
        className="text-muted-foreground"
      >
        Clear filters
      </Button>
      
      <Button 
        size="sm"
        onClick={applyFilters}
      >
        Apply filters
      </Button>
    </div>
  );
};

export default FilterActions;
