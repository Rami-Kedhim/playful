import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AppliedFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  priceRange: number[];
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
}: AppliedFiltersProps) => {
  // Only render if there are any filters applied
  if (!(searchQuery || location || verifiedOnly || selectedServices.length > 0 || 
        priceRange[0] > 0 || priceRange[1] < 500 || 
        selectedGenders.length > 0 || selectedOrientations.length > 0)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {searchQuery}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setSearchQuery("")}
          />
        </Badge>
      )}
      
      {location && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Location: {location}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setLocation("")}
          />
        </Badge>
      )}
      
      {(priceRange[0] > 0 || priceRange[1] < 500) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {priceRange[0]} - {priceRange[1]} LC
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setPriceRange([0, 500])}
          />
        </Badge>
      )}
      
      {verifiedOnly && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Verified only
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setVerifiedOnly(false)}
          />
        </Badge>
      )}
      
      {selectedServices.map(service => (
        <Badge key={service} variant="secondary" className="flex items-center gap-1">
          {service}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => toggleService(service)}
          />
        </Badge>
      ))}
      
      {selectedGenders.map(gender => (
        <Badge key={`gender-${gender}`} variant="secondary" className="flex items-center gap-1 capitalize">
          {gender}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => toggleGender(gender)}
          />
        </Badge>
      ))}
      
      {selectedOrientations.map(orientation => (
        <Badge key={`orientation-${orientation}`} variant="secondary" className="flex items-center gap-1 capitalize">
          {orientation}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => toggleOrientation(orientation)}
          />
        </Badge>
      ))}
      
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
