
import { useState } from "react";
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

  // Casting setServiceTypeFilter to function with expected signature
  const safeSetServiceTypeFilter = (value: ServiceTypeFilter) => {
    filterState.setServiceTypeFilter(value);
  };

  // Consider both internal and external loading states
  const combinedIsLoading = filterState.isLoading || externalLoading;

  return (
    <>
      <HeaderSection 
        showFilters={showFilters}
        setShowFilters={setShowFilters}
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
          services={services}
        />
        
        <ResultsSection
          filterState={filterState}
          combinedIsLoading={combinedIsLoading}
        />
      </div>
    </>
  );
};

export default EscortContainer;
