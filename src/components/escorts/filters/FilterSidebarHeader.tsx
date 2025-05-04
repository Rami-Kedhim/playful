
import React from "react";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";

interface FilterSidebarHeaderProps {
  clearFilters: () => void;
}

const FilterSidebarHeader: React.FC<FilterSidebarHeaderProps> = ({ clearFilters }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Filters</h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        className="text-muted-foreground hover:text-foreground flex items-center gap-1"
      >
        <FilterX size={16} />
        <span>Clear</span>
      </Button>
    </div>
  );
};

export default FilterSidebarHeader;
