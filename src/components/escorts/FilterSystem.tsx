
import React, { useState } from 'react';
import QuickFilterBar from './QuickFilterBar';
import FilterSidebar from './FilterSidebar';
import MobileFilterCard from './MobileFilterCard';
import { ServiceTypeFilter } from './filters/ServiceTypeBadgeLabel';

interface FilterSystemProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
  clearFilters: () => void;
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange: [number, number];
  setAgeRange: (value: number[]) => void;
  ratingMin: number;
  setRatingMin: (value: number) => void;
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
}

const FilterSystem: React.FC<FilterSystemProps> = (props) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    setPriceRange,
    verifiedOnly,
    setVerifiedOnly,
    selectedServices,
    toggleService,
    services,
    clearFilters,
    selectedGenders,
    toggleGender,
    selectedOrientations,
    toggleOrientation,
    ageRange,
    setAgeRange,
    ratingMin,
    setRatingMin,
    availableNow,
    setAvailableNow,
    serviceTypeFilter,
    setServiceTypeFilter
  } = props;

  return (
    <div className="space-y-4">
      {/* Quick filter bar for desktop and mobile */}
      <QuickFilterBar
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        availableNow={availableNow}
        setAvailableNow={setAvailableNow}
        location={location}
        onLocationClick={() => setShowFilters(!showFilters)}
        onShowMoreFilters={() => setShowMobileFilters(true)}
        ratingMin={ratingMin}
        setRatingMin={setRatingMin}
      />

      {/* Mobile filters that show/hide based on state */}
      {showMobileFilters && (
        <MobileFilterCard
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}
          selectedServices={selectedServices}
          toggleService={toggleService}
          services={services}
          clearFilters={clearFilters}
          setShowFilters={setShowMobileFilters}
          selectedGenders={selectedGenders}
          toggleGender={toggleGender}
          selectedOrientations={selectedOrientations}
          toggleOrientation={toggleOrientation}
          ageRange={ageRange}
          setAgeRange={setAgeRange}
          ratingMin={ratingMin}
          setRatingMin={setRatingMin}
          availableNow={availableNow}
          setAvailableNow={setAvailableNow}
          serviceTypeFilter={serviceTypeFilter}
          setServiceTypeFilter={setServiceTypeFilter}
        />
      )}
    </div>
  );
};

export default FilterSystem;
