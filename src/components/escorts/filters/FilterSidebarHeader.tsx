
import { Button } from "@/components/ui/button";

interface FilterSidebarHeaderProps {
  clearFilters: () => void;
}

const FilterSidebarHeader = ({ clearFilters }: FilterSidebarHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Filters</h2>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={clearFilters}
        className="text-xs"
      >
        Clear All
      </Button>
    </div>
  );
};

export default FilterSidebarHeader;
