
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface HeaderSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  totalCount?: number;
}

const HeaderSection = ({ showFilters, setShowFilters, totalCount = 0 }: HeaderSectionProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Escort Services</h1>
        <p className="text-muted-foreground">
          Find the perfect companion for your needs
          {totalCount > 0 && <span> • {totalCount} escorts available</span>}
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="mt-4 sm:mt-0 lg:hidden"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="mr-2 h-4 w-4" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
    </div>
  );
};

export default HeaderSection;
