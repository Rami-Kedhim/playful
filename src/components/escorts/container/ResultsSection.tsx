
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import EscortGrid from '@/components/escorts/EscortGrid';
import AppliedFilters from '@/components/filters/AppliedFilters';

interface ResultsSectionProps {
  filterState: any;
  combinedIsLoading: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  filterState,
  combinedIsLoading
}) => {
  // Convert filter state to applied filters format
  const getAppliedFilters = () => {
    const filters = [];

    if (filterState.location) {
      filters.push({
        label: "Location",
        key: "location",
        value: filterState.location
      });
    }

    if (filterState.searchQuery) {
      filters.push({
        label: "Search",
        key: "searchQuery", 
        value: filterState.searchQuery
      });
    }

    if (filterState.serviceTypeFilter) {
      filters.push({
        label: "Service Type",
        key: "serviceType",
        value: filterState.serviceTypeFilter
      });
    }

    if (filterState.verifiedOnly) {
      filters.push({
        label: "Verified",
        key: "verifiedOnly"
      });
    }

    if (filterState.availableNow) {
      filters.push({
        label: "Available Now",
        key: "availableNow"
      });
    }

    return filters;
  };

  const handleRemoveFilter = (filter: { key: string, value?: string }) => {
    switch (filter.key) {
      case 'location':
        filterState.setLocation('');
        break;
      case 'searchQuery':
        filterState.setSearchQuery('');
        break;
      case 'serviceType':
        filterState.setServiceTypeFilter('');
        break;
      case 'verifiedOnly':
        filterState.setVerifiedOnly(false);
        break;
      case 'availableNow':
        filterState.setAvailableNow(false);
        break;
      default:
        break;
    }
  };

  const appliedFilters = getAppliedFilters();

  return (
    <div className="lg:col-span-3">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Escorts</h2>
          <div className="text-muted-foreground">
            {combinedIsLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading results...
              </div>
            ) : (
              <>
                Showing {filterState.paginatedEscorts.length} of {filterState.totalResults} escorts
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="bg-background border rounded-md px-3 py-1 text-sm"
            value={filterState.sortBy}
            onChange={(e) => filterState.setSortBy(e.target.value)}
            disabled={combinedIsLoading}
          >
            <option value="newest">Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      
      {appliedFilters.length > 0 && (
        <div className="mb-6">
          <AppliedFilters 
            filters={appliedFilters} 
            removeFilter={handleRemoveFilter} 
            clearFilters={filterState.clearFilters} 
          />
        </div>
      )}
      
      <EscortGrid 
        escorts={filterState.paginatedEscorts}
        loading={combinedIsLoading}
        totalPages={filterState.totalPages}
        currentPage={filterState.currentPage}
        onPageChange={filterState.setCurrentPage}
      />
    </div>
  );
};

export default ResultsSection;
