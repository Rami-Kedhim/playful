
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import EscortResults from "@/components/escorts/EscortResults";
import SearchBar from "@/components/escorts/SearchBar";

interface ResultsSectionProps {
  filterState: any;
  combinedIsLoading: boolean;
  activeFilterCount?: number; // Add this as an optional prop
}

const ResultsSection = ({ filterState, combinedIsLoading, activeFilterCount }: ResultsSectionProps) => {
  // Get the standard services list
  const commonServices = [
    "Dinner Date", 
    "Travel Companion",
    "Event Companion",
    "Massage",
    "In-Person Meeting",
    "Virtual Meeting"
  ];

  // Use provided activeFilterCount or calculate if not provided
  const displayFilterCount = activeFilterCount !== undefined ? activeFilterCount : 
    [
      filterState.searchQuery, 
      filterState.location,
      filterState.verifiedOnly,
      filterState.availableNow,
      filterState.serviceTypeFilter
    ].filter(Boolean).length + 
    (filterState.selectedServices?.length || 0) +
    (filterState.selectedGenders?.length || 0) +
    (filterState.selectedOrientations?.length || 0) +
    (filterState.ratingMin > 0 ? 1 : 0) +
    ((filterState.priceRange?.[0] > 0 || filterState.priceRange?.[1] < 500) ? 1 : 0) +
    ((filterState.ageRange?.[0] > 21 || filterState.ageRange?.[1] < 50) ? 1 : 0);

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
        {displayFilterCount > 0 && (
          <div className="text-sm text-muted-foreground">
            <span>{displayFilterCount} active filters</span> · 
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
};

export default ResultsSection;
