
import { memo, useState } from "react";
import FilterSidebar from "@/components/escorts/FilterSidebar";
import MobileFilterCard from "@/components/escorts/MobileFilterCard";
import ActiveFiltersDisplay from "./ActiveFiltersDisplay";
import useActiveFilters from "@/hooks/escort-filters/useActiveFilters";
import { ServiceTypeFilter } from "@/components/escorts/filters/ServiceTypeBadgeLabel";

interface FilterSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterState: any;
  services: string[];
}

const FilterSection = memo<FilterSectionProps>(({ 
  showFilters, 
  setShowFilters, 
  filterState,
  services
}) => {
  // Get active filters using our hook
  const { activeFilters, activeFilterCount } = useActiveFilters(filterState);
  
  // State for managing the sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Handler for filter removal
  const handleRemoveFilter = (filter: { key: string; label: string; value?: string | number }) => {
    switch (filter.key) {
      case 'searchQuery':
        filterState.setSearchQuery?.('');
        break;
      case 'location':
        filterState.setLocation?.('');
        break;
      case 'serviceTypeFilter':
        filterState.setServiceTypeFilter?.('any');
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
  };

  // Handlers for the FilterSidebar component
  const handleServiceTypeChange = (type: ServiceTypeFilter) => {
    filterState.setServiceTypeFilter?.(type);
  };

  const handleApplyFilters = () => {
    // Additional logic when applying filters can go here
    console.log("Filters applied");
  };

  const handleResetFilters = () => {
    filterState.clearFilters?.();
  };

  return (
    <>
      {/* Desktop filter sidebar - only show on large screens */}
      <div className="hidden lg:block lg:col-span-1">
        <FilterSidebar 
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          selectedServiceType={filterState.serviceTypeFilter || "any"}
          onServiceTypeChange={handleServiceTypeChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
        
        {/* Desktop active filters display */}
        <div className="mt-6">
          <ActiveFiltersDisplay 
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={filterState.clearFilters || (() => {})}
          />
        </div>
      </div>
      
      {/* Mobile filter card - only show when filters are toggled */}
      {showFilters && (
        <div className="lg:hidden col-span-1 mb-6">
          <MobileFilterCard
            searchQuery={filterState.searchQuery || ""}
            setSearchQuery={filterState.setSearchQuery || (() => {})}
            location={filterState.location || ""}
            setLocation={filterState.setLocation || (() => {})}
            priceRange={filterState.priceRange || [0, 500]}
            setPriceRange={filterState.setPriceRange || (() => {})}
            verifiedOnly={filterState.verifiedOnly || false}
            setVerifiedOnly={filterState.setVerifiedOnly || (() => {})}
            selectedServices={filterState.selectedServices || []}
            toggleService={filterState.toggleService || (() => {})}
            services={services || []}
            clearFilters={filterState.clearFilters || (() => {})}
            setShowFilters={setShowFilters}
            selectedGenders={filterState.selectedGenders || []}
            toggleGender={filterState.toggleGender || (() => {})}
            selectedOrientations={filterState.selectedOrientations || []}
            toggleOrientation={filterState.toggleOrientation || (() => {})}
            ageRange={filterState.ageRange || [21, 50]}
            setAgeRange={filterState.setAgeRange || (() => {})}
            ratingMin={filterState.ratingMin || 0}
            setRatingMin={filterState.setRatingMin || (() => {})}
            availableNow={filterState.availableNow || false}
            setAvailableNow={filterState.setAvailableNow || (() => {})}
            serviceTypeFilter={filterState.serviceTypeFilter || "any"}
            setServiceTypeFilter={filterState.setServiceTypeFilter || (() => {})}
          />
        </div>
      )}
    </>
  );
});

FilterSection.displayName = 'FilterSection';

export default FilterSection;
