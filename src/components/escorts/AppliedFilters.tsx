
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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
  
  // Only render if there are filters applied
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
  
  const getServiceTypeName = (type: string) => {
    switch(type) {
      case "in-person": return "In-Person Services";
      case "virtual": return "Virtual Content";
      case "both": return "In-Person & Virtual";
      default: return "";
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {searchQuery}
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setSearchQuery("")}
          />
        </Badge>
      )}
      
      {location && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Location: {location}
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setLocation("")}
          />
        </Badge>
      )}
      
      {verifiedOnly && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Verified Only
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setVerifiedOnly(false)}
          />
        </Badge>
      )}
      
      {(priceRange[0] > 0 || priceRange[1] < 1000) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Price: {priceRange[0]}-{priceRange[1]} LC
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setPriceRange([0, 1000])}
          />
        </Badge>
      )}
      
      {selectedServices.map(service => (
        <Badge key={service} variant="secondary" className="flex items-center gap-1">
          {service}
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => toggleService(service)}
          />
        </Badge>
      ))}
      
      {selectedGenders.map(gender => (
        <Badge key={gender} variant="secondary" className="flex items-center gap-1">
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => toggleGender(gender)}
          />
        </Badge>
      ))}
      
      {selectedOrientations.map(orientation => (
        <Badge key={orientation} variant="secondary" className="flex items-center gap-1">
          {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => toggleOrientation(orientation)}
          />
        </Badge>
      ))}
      
      {(ageRange[0] > 18 || ageRange[1] < 60) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Age: {ageRange[0]}-{ageRange[1]}
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setAgeRange([18, 60])}
          />
        </Badge>
      )}
      
      {ratingMin > 0 && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Rating: {ratingMin}+
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setRatingMin(0)}
          />
        </Badge>
      )}
      
      {availableNow && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Available Now
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setAvailableNow(false)}
          />
        </Badge>
      )}
      
      {serviceTypeFilter && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {getServiceTypeName(serviceTypeFilter)}
          <X 
            size={14} 
            className="cursor-pointer ml-1" 
            onClick={() => setServiceTypeFilter("")}
          />
        </Badge>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={clearFilters}
        className="h-full ml-auto"
      >
        Clear all
      </Button>
    </div>
  );
};

export default AppliedFilters;
