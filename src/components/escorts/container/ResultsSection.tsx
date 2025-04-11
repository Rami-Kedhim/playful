
import React from "react";
import SearchBar from "@/components/escorts/SearchBar";
import AppliedFilters from "@/components/escorts/AppliedFilters";
import EscortResults from "@/components/escorts/EscortResults";
import { EscortFilterHook } from "@/types/escortFilters";

interface ResultsSectionProps {
  filterState: EscortFilterHook;
  combinedIsLoading: boolean;
}

const ResultsSection = ({
  filterState,
  combinedIsLoading
}: ResultsSectionProps) => {
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
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
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
    clearFilters,
    paginatedEscorts,
    totalPages
  } = filterState;

  return (
    <div className="lg:col-span-3">
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <AppliedFilters 
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
      
      <EscortResults 
        escorts={paginatedEscorts}
        clearFilters={clearFilters}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        isLoading={combinedIsLoading}
      />
    </div>
  );
};

export default ResultsSection;
