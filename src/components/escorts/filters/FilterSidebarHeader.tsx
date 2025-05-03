
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterSidebarHeaderProps {
  clearFilters: () => void;
}

const FilterSidebarHeader = ({ clearFilters }: FilterSidebarHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-semibold text-lg">Filters</h2>
      <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-muted-foreground">
        <X className="h-4 w-4 mr-1" />
        Clear all
      </Button>
    </div>
  );
};

export default FilterSidebarHeader;
