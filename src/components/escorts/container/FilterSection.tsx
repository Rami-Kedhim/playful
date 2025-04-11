
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/escorts/FilterSidebar";
import MobileFilterCard from "@/components/escorts/MobileFilterCard";
import { EscortFilterHook } from "@/types/escortFilters";

interface FilterSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterState: EscortFilterHook;
  services: string[];
}

const FilterSection = ({
  showFilters,
  setShowFilters,
  filterState,
  services
}: FilterSectionProps) => {
  const {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    handlePriceRangeChange,
    verifiedOnly,
    setVerifiedOnly,
    selectedServices,
    toggleService,
    selectedGenders,
    toggleGender,
    selectedOrientations,
    toggleOrientation,
    ageRange,
    handleAgeRangeChange,
    ratingMin,
    setRatingMin,
    availableNow,
    setAvailableNow,
    serviceTypeFilter,
    setServiceTypeFilter,
    clearFilters
  } = filterState;

  return (
    <>
      <div className="h-fit sticky top-20 hidden md:block">
        <FilterSidebar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          priceRange={priceRange}
          setPriceRange={handlePriceRangeChange}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}
          selectedServices={selectedServices}
          toggleService={toggleService}
          services={services}
          clearFilters={clearFilters}
          selectedGenders={selectedGenders}
          toggleGender={toggleGender}
          selectedOrientations={selectedOrientations}
          toggleOrientation={toggleOrientation}
          ageRange={ageRange}
          setAgeRange={handleAgeRangeChange}
          ratingMin={ratingMin}
          setRatingMin={setRatingMin}
          availableNow={availableNow}
          setAvailableNow={setAvailableNow}
          serviceTypeFilter={serviceTypeFilter}
          setServiceTypeFilter={setServiceTypeFilter}
        />
      </div>
      
      {showFilters && (
        <div className="md:hidden">
          <MobileFilterCard 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
            setLocation={setLocation}
            priceRange={priceRange}
            setPriceRange={handlePriceRangeChange}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            selectedServices={selectedServices}
            toggleService={toggleService}
            services={services}
            clearFilters={clearFilters}
            setShowFilters={setShowFilters}
            selectedGenders={selectedGenders}
            toggleGender={toggleGender}
            selectedOrientations={selectedOrientations}
            toggleOrientation={toggleOrientation}
            serviceTypeFilter={serviceTypeFilter}
            setServiceTypeFilter={setServiceTypeFilter}
            ageRange={ageRange}
            setAgeRange={handleAgeRangeChange}
            ratingMin={ratingMin}
            setRatingMin={setRatingMin}
            availableNow={availableNow}
            setAvailableNow={setAvailableNow}
          />
        </div>
      )}
    </>
  );
};

export default FilterSection;
