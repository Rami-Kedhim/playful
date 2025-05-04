
import { Separator } from "@/components/ui/separator";
import FilterSidebarHeader from "./filters/FilterSidebarHeader";
import FilterSidebarContent from "./filters/FilterSidebarContent";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
  clearFilters: () => void;
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange?: [number, number];
  setAgeRange?: (range: number[]) => void;
  ratingMin?: number;
  setRatingMin?: (rating: number) => void;
  availableNow?: boolean;
  setAvailableNow?: (available: boolean) => void;
  serviceTypeFilter: "in-person" | "virtual" | "both" | "any" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "any" | "") => void;
}

const FilterSidebar = ({
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
  ageRange = [18, 60],
  setAgeRange = () => {},
  ratingMin = 0,
  setRatingMin = () => {},
  availableNow = false,
  setAvailableNow = () => {},
  serviceTypeFilter,
  setServiceTypeFilter
}: FilterSidebarProps) => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow">
      <FilterSidebarHeader clearFilters={clearFilters} />
      
      <Separator className="my-4" />
      
      <FilterSidebarContent 
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
    </div>
  );
};

export default FilterSidebar;
