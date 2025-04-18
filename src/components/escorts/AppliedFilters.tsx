
import React from 'react';
import { Button } from "@/components/ui/button";
import FilterBadge from "./filters/FilterBadge";
import { ServiceTypeFilter } from "./filters/ServiceTypeBadgeLabel";
import { getServiceTypeBadgeLabel } from "./filters/ServiceTypeBadgeLabel";
import { FilterX } from "lucide-react";
import { cn } from "@/lib/utils";
import ServiceTypeIcon from "./filters/ServiceTypeIcon";

export interface AppliedFiltersProps {
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

const AppliedFilters = ({
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
}: AppliedFiltersProps) => {
  
  const hasActiveFilters = 
    searchQuery || 
    location || 
    verifiedOnly || 
    selectedServices.length > 0 || 
    selectedGenders.length > 0 || 
    selectedOrientations.length > 0 || 
    ageRange[0] > 18 || 
    ageRange[1] < 60 || 
    ratingMin > 0 || 
    availableNow || 
    !!serviceTypeFilter;
    
  if (!hasActiveFilters) {
    return null;
  }

  const filtersCount = [
    searchQuery ? 1 : 0,
    location ? 1 : 0,
    verifiedOnly ? 1 : 0,
    selectedServices.length,
    selectedGenders.length,
    selectedOrientations.length,
    (ageRange[0] > 18 || ageRange[1] < 60) ? 1 : 0,
    ratingMin > 0 ? 1 : 0,
    availableNow ? 1 : 0,
    serviceTypeFilter ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  
  return (
    <div className={cn(
      "flex flex-wrap gap-2 mb-6",
      "transition-all duration-200 ease-in-out",
      filtersCount > 0 ? "opacity-100" : "opacity-0"
    )}>
      {searchQuery && (
        <FilterBadge 
          label={`Search: ${searchQuery}`}
          onRemove={() => setSearchQuery("")}
          variant="secondary"
        />
      )}
      
      {location && (
        <FilterBadge 
          label={`Location: ${location}`}
          onRemove={() => setLocation("")}
          variant="secondary"
        />
      )}
      
      {verifiedOnly && (
        <FilterBadge 
          label="Verified Only"
          onRemove={() => setVerifiedOnly(false)}
          variant="secondary"
        />
      )}
      
      {(priceRange[0] > 0 || priceRange[1] < 1000) && (
        <FilterBadge 
          label={`Price: ${priceRange[0]}-${priceRange[1]} LC`}
          onRemove={() => setPriceRange([0, 1000])}
          variant="secondary"
        />
      )}
      
      {selectedServices.map(service => (
        <FilterBadge 
          key={service}
          label={service}
          onRemove={() => toggleService(service)}
          variant="secondary"
        />
      ))}
      
      {selectedGenders.map(gender => (
        <FilterBadge 
          key={gender}
          label={gender.charAt(0).toUpperCase() + gender.slice(1)}
          onRemove={() => toggleGender(gender)}
          variant="secondary"
        />
      ))}
      
      {selectedOrientations.map(orientation => (
        <FilterBadge 
          key={orientation}
          label={orientation.charAt(0).toUpperCase() + orientation.slice(1)}
          onRemove={() => toggleOrientation(orientation)}
          variant="secondary"
        />
      ))}
      
      {(ageRange[0] > 18 || ageRange[1] < 60) && (
        <FilterBadge 
          label={`Age: ${ageRange[0]}-${ageRange[1]}`}
          onRemove={() => setAgeRange([18, 60])}
          variant="secondary"
        />
      )}
      
      {ratingMin > 0 && (
        <FilterBadge 
          label={`Rating: ${ratingMin}+`}
          onRemove={() => setRatingMin(0)}
          variant="secondary"
        />
      )}
      
      {availableNow && (
        <FilterBadge 
          label="Available Now"
          onRemove={() => setAvailableNow(false)}
          variant="secondary"
        />
      )}
      
      {serviceTypeFilter && (
        <FilterBadge 
          label={getServiceTypeBadgeLabel(serviceTypeFilter)}
          onRemove={() => setServiceTypeFilter("")}
          icon={serviceTypeFilter ? <ServiceTypeIcon type={serviceTypeFilter} size={14} variant="colored" /> : undefined}
          variant="secondary"
        />
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={clearFilters}
        className="h-7 ml-auto flex items-center gap-1 bg-background hover:bg-muted/80"
      >
        <FilterX className="h-3.5 w-3.5" />
        Clear all
      </Button>
    </div>
  );
};

export default AppliedFilters;
