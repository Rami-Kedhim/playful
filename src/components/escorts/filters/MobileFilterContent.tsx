
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchFilter from "./SearchFilter";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import CheckboxGroup from "./CheckboxGroup";
import ServiceTypeRadioFilter from "./ServiceTypeRadioFilter";
import AgeRangeFilter from "./AgeRangeFilter";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import FilterActions from "./FilterActions";

interface MobileFilterContentProps {
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
  services: string[];
  clearFilters: () => void;
  setShowFilters: (value: boolean) => void;
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

const MobileFilterContent = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  priceRange,
  setPriceRange,
  verifiedOnly,
  setVerifiedOnly,
  clearFilters,
  setShowFilters,
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
}: MobileFilterContentProps) => {
  const genders = ["male", "female", "non-binary", "transgender"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];
  
  const applyFilters = () => setShowFilters(false);

  return (
    <>
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-4">
          <SearchFilter 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <LocationFilter 
            location={location} 
            setLocation={setLocation} 
          />
          
          <PriceRangeFilter 
            priceRange={priceRange} 
            setPriceRange={setPriceRange} 
          />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Service Type</h3>
            <ServiceTypeRadioFilter
              serviceTypeFilter={serviceTypeFilter}
              setServiceTypeFilter={setServiceTypeFilter}
            />
          </div>
          
          <AgeRangeFilter
            ageRange={ageRange}
            setAgeRange={setAgeRange}
          />
          
          <RatingFilter
            ratingMin={ratingMin}
            setRatingMin={setRatingMin}
          />
          
          <AvailabilityFilter
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            availableNow={availableNow}
            setAvailableNow={setAvailableNow}
          />
          
          <CheckboxGroup
            title="Gender"
            items={genders}
            selectedItems={selectedGenders}
            toggleItem={toggleGender}
            formatItem={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
            idPrefix="gender-mobile"
          />
          
          <CheckboxGroup
            title="Sexual Orientation"
            items={orientations}
            selectedItems={selectedOrientations}
            toggleItem={toggleOrientation}
            formatItem={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
            idPrefix="orientation-mobile"
          />
        </div>
      </ScrollArea>
      
      <FilterActions 
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </>
  );
};

export default MobileFilterContent;
