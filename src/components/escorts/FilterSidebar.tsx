
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SearchFilter from "./filters/SearchFilter";
import LocationFilter from "./filters/LocationFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import VerifiedFilter from "./filters/VerifiedFilter";
import CheckboxGroup from "./filters/CheckboxGroup";

interface FilterSidebarProps {
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
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
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
}: FilterSidebarProps) => {
  const genders = ["male", "female", "non-binary", "transgender"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];

  return (
    <Card className="h-fit sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        
        <VerifiedFilter 
          verifiedOnly={verifiedOnly} 
          setVerifiedOnly={setVerifiedOnly} 
        />
        
        <CheckboxGroup
          title="Gender"
          items={genders}
          selectedItems={selectedGenders}
          toggleItem={toggleGender}
          idPrefix="gender"
        />
        
        <CheckboxGroup
          title="Sexual Orientation"
          items={orientations}
          selectedItems={selectedOrientations}
          toggleItem={toggleOrientation}
          idPrefix="orientation"
        />
        
        <CheckboxGroup
          title="Services"
          items={services}
          selectedItems={selectedServices}
          toggleItem={toggleService}
          idPrefix="service"
        />
        
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
