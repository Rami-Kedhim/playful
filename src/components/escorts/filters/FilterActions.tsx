
import { Button } from "@/components/ui/button";

interface FilterActionsProps {
  clearFilters: () => void;
  applyFilters: () => void;
}

const FilterActions = ({ clearFilters, applyFilters }: FilterActionsProps) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button 
        variant="outline" 
        className="flex-1"
        onClick={clearFilters}
      >
        Clear
      </Button>
      <Button 
        className="flex-1"
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterActions;
