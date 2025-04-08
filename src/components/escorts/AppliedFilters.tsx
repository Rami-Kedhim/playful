import { Button } from "@/components/ui/button";
import FilterBadge from "./filters/FilterBadge";
import getServiceTypeName from "./filters/ServiceTypeBadgeLabel";
import { Users, Video, FilterX } from "lucide-react";

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
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
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
  
  const getServiceTypeIcon = () => {
    if (serviceTypeFilter === "in-person") return <Users className="h-3 w-3" />;
    if (serviceTypeFilter === "virtual") return <Video className="h-3 w-3" />;
    if (serviceTypeFilter === "both") {
      return (
        <div className="flex items-center space-x-0.5">
          <Users className="h-3 w-3" />
          <Video className="h-3 w-3" />
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {searchQuery && (
        <FilterBadge 
          label={`Search: ${searchQuery}`}
          onRemove={() => setSearchQuery("")}
        />
      )}
      
      {location && (
        <FilterBadge 
          label={`Location: ${location}`}
          onRemove={() => setLocation("")}
        />
      )}
      
      {verifiedOnly && (
        <FilterBadge 
          label="Verified Only"
          onRemove={() => setVerifiedOnly(false)}
        />
      )}
      
      {(priceRange[0] > 0 || priceRange[1] < 1000) && (
        <FilterBadge 
          label={`Price: ${priceRange[0]}-${priceRange[1]} LC`}
          onRemove={() => setPriceRange([0, 1000])}
        />
      )}
      
      {selectedServices.map(service => (
        <FilterBadge 
          key={service}
          label={service}
          onRemove={() => toggleService(service)}
        />
      ))}
      
      {selectedGenders.map(gender => (
        <FilterBadge 
          key={gender}
          label={gender.charAt(0).toUpperCase() + gender.slice(1)}
          onRemove={() => toggleGender(gender)}
        />
      ))}
      
      {selectedOrientations.map(orientation => (
        <FilterBadge 
          key={orientation}
          label={orientation.charAt(0).toUpperCase() + orientation.slice(1)}
          onRemove={() => toggleOrientation(orientation)}
        />
      ))}
      
      {(ageRange[0] > 18 || ageRange[1] < 60) && (
        <FilterBadge 
          label={`Age: ${ageRange[0]}-${ageRange[1]}`}
          onRemove={() => setAgeRange([18, 60])}
        />
      )}
      
      {ratingMin > 0 && (
        <FilterBadge 
          label={`Rating: ${ratingMin}+`}
          onRemove={() => setRatingMin(0)}
        />
      )}
      
      {availableNow && (
        <FilterBadge 
          label="Available Now"
          onRemove={() => setAvailableNow(false)}
        />
      )}
      
      {serviceTypeFilter && (
        <FilterBadge 
          label={getServiceTypeName(serviceTypeFilter)}
          onRemove={() => setServiceTypeFilter("")}
          icon={getServiceTypeIcon()}
        />
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={clearFilters}
        className="h-7 ml-auto flex items-center gap-1"
      >
        <FilterX className="h-3.5 w-3.5" />
        Clear all
      </Button>
    </div>
  );
};

export default AppliedFilters;
