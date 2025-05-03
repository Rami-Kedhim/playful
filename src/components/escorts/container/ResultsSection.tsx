
import { memo } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import EscortResults from "@/components/escorts/EscortResults";
import SearchBar from "@/components/escorts/SearchBar";

interface ResultsSectionProps {
  filterState: any;
  combinedIsLoading: boolean;
  activeFilterCount?: number; // Optional prop for filter count
}

const ResultsSection = memo<ResultsSectionProps>(({ filterState, combinedIsLoading, activeFilterCount }) => {
  // Get the standard services list
  const commonServices = [
    "Dinner Date", 
    "Travel Companion",
    "Event Companion",
    "Massage",
    "In-Person Meeting",
    "Virtual Meeting"
  ];

  return (
    <div className="lg:col-span-3">
      <SearchBar
        searchQuery={filterState.searchQuery || ""}
        setSearchQuery={filterState.setSearchQuery || (() => {})}
        sortBy={filterState.sortBy || "newest"}
        setSortBy={filterState.setSortBy || (() => {})}
      />

      {/* Mobile Applied Filters display */}
      <div className="lg:hidden mb-6">
        {typeof activeFilterCount === 'number' && activeFilterCount > 0 && (
          <div className="text-sm text-muted-foreground">
            <span>{activeFilterCount} active filters</span> · 
            <button 
              onClick={filterState.clearFilters} 
              className="ml-2 text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* No results alert */}
      {!combinedIsLoading && filterState.filteredEscorts && filterState.filteredEscorts.length === 0 && (
        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No results found</AlertTitle>
          <AlertDescription>
            No escorts match your current filters. Try adjusting your criteria or clearing some filters.
          </AlertDescription>
        </Alert>
      )}

      <EscortResults
        escorts={filterState.filteredEscorts || []}
        clearFilters={filterState.clearFilters}
        currentPage={filterState.currentPage || 1}
        setCurrentPage={filterState.setCurrentPage || (() => {})}
        totalPages={filterState.totalPages || 1}
        isLoading={combinedIsLoading}
      />
    </div>
  );
});

ResultsSection.displayName = 'ResultsSection';

export default ResultsSection;
