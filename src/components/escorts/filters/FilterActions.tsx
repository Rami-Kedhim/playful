
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FilterActionsProps {
  clearFilters: () => void;
  applyFilters: () => void;
}

const FilterActions = ({ clearFilters, applyFilters }: FilterActionsProps) => {
  return (
    <div className="flex gap-3 mt-6">
      <Button 
        variant="outline" 
        size="sm"
        onClick={clearFilters}
        className="flex-1"
      >
        <RotateCcw size={16} className="mr-1.5" />
        Reset
      </Button>
      <Button 
        onClick={applyFilters}
        size="sm"
        className="flex-1"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterActions;
