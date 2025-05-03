
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterSidebarHeaderProps {
  clearFilters: () => void;
  activeFilterCount?: number;
}

const FilterSidebarHeader = ({ clearFilters, activeFilterCount = 0 }: FilterSidebarHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-lg">Filters</h2>
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="text-xs font-normal">
            {activeFilterCount} active
          </Badge>
        )}
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={clearFilters} 
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
        disabled={activeFilterCount === 0}
      >
        <X className="h-4 w-4 mr-1" />
        Clear all
      </Button>
    </div>
  );
};

export default FilterSidebarHeader;
