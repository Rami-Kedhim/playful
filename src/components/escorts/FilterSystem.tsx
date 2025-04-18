
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

      {/* Mobile filters placeholder - you would implement this component separately */}
      {showMobileFilters && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-background p-4 rounded-t-xl z-50 max-h-[80vh] overflow-y-auto">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            {/* Mobile filter content would go here */}
            <div className="flex justify-end mt-4">
              <Button onClick={() => setShowMobileFilters(false)}>Apply Filters</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSystem;

// Define the Button component since it's referenced but missing from our imports
const Button = ({ children, onClick, className = "" }) => (
  <button 
    className={`bg-primary text-white px-4 py-2 rounded-md ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
