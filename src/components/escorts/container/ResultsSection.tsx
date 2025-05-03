
import { memo, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import EscortResults from "@/components/escorts/EscortResults";
import SearchBar from "@/components/escorts/SearchBar";
import ActiveFiltersDisplay from "./ActiveFiltersDisplay";
import useActiveFilters from "@/hooks/escort-filters/useActiveFilters";

interface ResultsSectionProps {
  filterState: any;
  combinedIsLoading: boolean;
  activeFilterCount?: number; // Optional prop for filter count
}

const ResultsSection = memo<ResultsSectionProps>(({ filterState, combinedIsLoading }) => {
  // Get active filters using our new hook
  const { activeFilters, activeFilterCount } = useActiveFilters(filterState);
  
  // Memoize handlers for filter removal
  const handleRemoveFilter = useCallback((filter: { key: string; label: string; value?: string | number }) => {
    switch (filter.key) {
      case 'searchQuery':
        filterState.setSearchQuery?.('');
        break;
      case 'location':
        filterState.setLocation?.('');
        break;
      case 'serviceTypeFilter':
        filterState.setServiceTypeFilter?.('');
        break;
      case 'verifiedOnly':
        filterState.setVerifiedOnly?.(false);
        break;
      case 'availableNow':
        filterState.setAvailableNow?.(false);
        break;
      case 'ratingMin':
        filterState.setRatingMin?.(0);
        break;
      case 'priceRange':
        filterState.setPriceRange?.([0, 500]);
        break;
      case 'ageRange':
        filterState.setAgeRange?.([21, 50]);
        break;
      case 'selectedGenders':
        filterState.setSelectedGenders?.([]);
        break;
      case 'selectedOrientations':
        filterState.setSelectedOrientations?.([]);
        break;
      case 'selectedServices':
        filterState.setSelectedServices?.([]);
        break;
      default:
        break;
    }
  }, [filterState]);

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
          <div className="text-sm text-muted-foreground mb-3">
            <span>{activeFilterCount} active filters</span> · 
            <button 
              onClick={filterState.clearFilters} 
              className="ml-2 text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
        
        {activeFilters.length > 0 && (
          <ActiveFiltersDisplay 
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={filterState.clearFilters || (() => {})}
          />
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
