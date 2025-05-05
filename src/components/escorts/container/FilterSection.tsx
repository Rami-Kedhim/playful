
import React, { useState } from 'react';
import FilterSidebar from '../FilterSidebar';
import QuickFilterBar from '../QuickFilterBar';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';

interface FilterSectionProps {
  // Filters state
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange: [number, number];
  setAgeRange: (value: [number, number]) => void;
  ratingMin: number;
  setRatingMin: (value: number) => void;
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  clearFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
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
  setServiceTypeFilter,
  clearFilters
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleApplyFilters = () => {
    // Apply filters logic here
    setSidebarOpen(false);
  };
  
  const handleResetFilters = () => {
    clearFilters();
  };
  
  return (
    <div className="space-y-4">
      <QuickFilterBar
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        availableNow={availableNow}
        setAvailableNow={setAvailableNow}
        location={location}
        onLocationClick={() => setSidebarOpen(true)}
        onShowMoreFilters={() => setSidebarOpen(true)}
        ratingMin={ratingMin}
        setRatingMin={setRatingMin}
      />
      
      <FilterSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};

export default FilterSection;
