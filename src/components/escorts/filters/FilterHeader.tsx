
import React from "react";
import { Button } from "@/components/ui/button";

interface FilterHeaderProps {
  clearFilters: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({ clearFilters }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Filters</h3>
      <Button variant="ghost" size="sm" onClick={clearFilters}>
        Reset All
      </Button>
    </div>
  );
};

export default FilterHeader;
