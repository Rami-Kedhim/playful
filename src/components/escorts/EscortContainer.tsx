
import { useState, useMemo } from "react";
import { useEscortFilterWithUrl } from "@/hooks/useEscortFilterWithUrl";
import { Escort } from "@/types/Escort";
import QuickFilterBar from "./QuickFilterBar";
import HeaderSection from "./container/HeaderSection";
import FilterSection from "./container/FilterSection";
import ResultsSection from "./container/ResultsSection";
import { ServiceTypeFilter } from "@/components/escorts/filters/ServiceTypeBadgeLabel";

interface EscortContainerProps {
  escorts: Escort[];
  services: string[];
  isLoading?: boolean;
}

const EscortContainer = ({ escorts, services, isLoading: externalLoading = false }: EscortContainerProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Use the filtered hook that syncs with URL
  const filterState = useEscortFilterWithUrl({ escorts });

  // Restrict to allowed values only for serviceTypeFilter when setting
  const safeSetServiceTypeFilter = (value: ServiceTypeFilter) => {
    if (value === "" || value === "in-person" || value === "virtual" || value === "both") {
      filterState.setServiceTypeFilter(value);
    } else {
      // Ignore or reset to empty if invalid
      filterState.setServiceTypeFilter("");
    }
  };

  // Consider both internal and external loading states
  const combinedIsLoading = filterState.isLoading || externalLoading;
  
  // Calculate active filter count with safe access to properties using optional chaining
  const activeFilterCount = useMemo(() => {
    return [
      filterState.searchQuery, 
      filterState.location,
      filterState.verifiedOnly,
      filterState.availableNow,
      filterState.serviceTypeFilter
    ].filter(Boolean).length + 
    (filterState.selectedServices?.length || 0) +
    (filterState.selectedGenders?.length || 0) +
    ((filterState as any).selectedOrientations?.length || 0) +
    (filterState.ratingMin > 0 ? 1 : 0) +
    (((filterState as any).priceRange?.[0] > 0 || (filterState as any).priceRange?.[1] < 500) ? 1 : 0) +
    (((filterState as any).ageRange?.[0] > 21 || (filterState as any).ageRange?.[1] < 50) ? 1 : 0);
  }, [
    filterState.searchQuery,
    filterState.location,
    filterState.verifiedOnly,
    filterState.availableNow,
    filterState.serviceTypeFilter,
    filterState.selectedServices,
    filterState.selectedGenders,
    (filterState as any).selectedOrientations,
    filterState.ratingMin,
    (filterState as any).priceRange,
    (filterState as any).ageRange
  ]);

  return (
    <>
      <HeaderSection 
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        totalCount={escorts?.length || 0}
      />
      
      {/* Quick filter bar for mobile and desktop */}
      <QuickFilterBar
        serviceTypeFilter={filterState.serviceTypeFilter}
        setServiceTypeFilter={safeSetServiceTypeFilter}
        verifiedOnly={filterState.verifiedOnly}
        setVerifiedOnly={filterState.setVerifiedOnly}
        availableNow={filterState.availableNow}
        setAvailableNow={filterState.setAvailableNow}
        location={filterState.location}
        onLocationClick={() => setShowFilters(true)}
        onShowMoreFilters={() => setShowFilters(true)}
        className="mb-6 md:mb-8"
        ratingMin={filterState.ratingMin}
        setRatingMin={filterState.setRatingMin}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <FilterSection
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filterState={filterState}
          services={services || []}
        />
        
        <ResultsSection
          filterState={filterState}
          combinedIsLoading={combinedIsLoading}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </>
  );
};

export default EscortContainer;
