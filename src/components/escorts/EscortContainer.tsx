
import { useState, useMemo, useCallback, memo } from "react";
import { useEscortFilterWithUrl } from "@/hooks/useEscortFilterWithUrl";
import { Escort } from "@/types/Escort";
import QuickFilterBar from "./QuickFilterBar";
import HeaderSection from "./container/HeaderSection";
import FilterSection from "./container/FilterSection";
import ResultsSection from "./container/ResultsSection";
import { ServiceTypeFilter } from "@/components/escorts/filters/ServiceTypeBadgeLabel";
import useActiveFilters from "@/hooks/escort-filters/useActiveFilters";

interface EscortContainerProps {
  escorts: Escort[];
  services: string[];
  isLoading?: boolean;
}

const EscortContainer = memo<EscortContainerProps>(({ escorts, services, isLoading: externalLoading = false }) => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Use the filtered hook that syncs with URL
  const filterState = useEscortFilterWithUrl({ escorts });
  
  // Get active filter count using our hook
  const { activeFilterCount } = useActiveFilters(filterState);

  // Memoize handlers to prevent unnecessary re-renders
  const safeSetServiceTypeFilter = useCallback((value: ServiceTypeFilter) => {
    if (value === "" || value === "in-person" || value === "virtual" || value === "both") {
      filterState.setServiceTypeFilter(value);
    } else {
      filterState.setServiceTypeFilter("");
    }
  }, [filterState]);

  // Consider both internal and external loading states
  const combinedIsLoading = useMemo(() => 
    filterState.isLoading || externalLoading
  , [filterState.isLoading, externalLoading]);

  // Memoize event handlers for stable references
  const toggleShowFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);
  
  const handleSetShowFilters = useCallback((value: boolean) => {
    setShowFilters(value);
  }, []);

  const handleLocationClick = useCallback(() => {
    setShowFilters(true);
  }, []);

  const handleSetVerifiedOnly = useCallback((value: boolean) => {
    filterState.setVerifiedOnly(value);
  }, [filterState]);

  const handleSetAvailableNow = useCallback((value: boolean) => {
    filterState.setAvailableNow(value);
  }, [filterState]);

  const handleSetRatingMin = useCallback((value: number) => {
    filterState.setRatingMin(value);
  }, [filterState]);

  return (
    <>
      <HeaderSection 
        showFilters={showFilters}
        setShowFilters={handleSetShowFilters}
        totalCount={escorts?.length || 0}
        activeFilterCount={activeFilterCount}
      />
      
      {/* Quick filter bar for mobile and desktop */}
      <QuickFilterBar
        serviceTypeFilter={filterState.serviceTypeFilter}
        setServiceTypeFilter={safeSetServiceTypeFilter}
        verifiedOnly={filterState.verifiedOnly}
        setVerifiedOnly={handleSetVerifiedOnly}
        availableNow={filterState.availableNow}
        setAvailableNow={handleSetAvailableNow}
        location={filterState.location}
        onLocationClick={handleLocationClick}
        onShowMoreFilters={toggleShowFilters}
        className="mb-6 md:mb-8"
        ratingMin={filterState.ratingMin}
        setRatingMin={handleSetRatingMin}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <FilterSection
          showFilters={showFilters}
          setShowFilters={handleSetShowFilters}
          filterState={filterState}
          services={services || []}
        />
        
        <ResultsSection
          filterState={filterState}
          combinedIsLoading={combinedIsLoading}
        />
      </div>
    </>
  );
});

EscortContainer.displayName = 'EscortContainer';

export default EscortContainer;
