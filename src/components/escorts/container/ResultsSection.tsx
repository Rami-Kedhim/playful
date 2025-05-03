
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
}

const ResultsSection = memo<ResultsSectionProps>(({ filterState, combinedIsLoading }) => {
  // Get active filters using our hook
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

      {/* Active Filters display - only show in mobile view */}
      <div className="lg:hidden mb-6">
        <ActiveFiltersDisplay 
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAllFilters={filterState.clearFilters || (() => {})}
          showFilterCount={true}
        />
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
