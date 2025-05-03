
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
    // Base count for simple filters
    let count = 0;
    
    // Count simple filters
    if (filterState.searchQuery) count++;
    if (filterState.location) count++;
    if (filterState.verifiedOnly) count++;
    if (filterState.availableNow) count++;
    if (filterState.serviceTypeFilter) count++;
    
    // Count array-based filters
    count += (filterState.selectedServices?.length || 0);
    count += (filterState.selectedGenders?.length || 0);
    
    // Count filters from properties that might not be directly defined in the type
    const orientations = (filterState as any).selectedOrientations;
    if (orientations && orientations.length) count += orientations.length;
    
    // Count range-based filters
    if (filterState.ratingMin > 0) count++;
    
    // Price range
    const priceRange = (filterState as any).priceRange;
    if (priceRange && (priceRange[0] > 0 || priceRange[1] < 500)) count++;
    
    // Age range
    const ageRange = (filterState as any).ageRange;
    if (ageRange && (ageRange[0] > 21 || ageRange[1] < 50)) count++;
    
    return count;
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
