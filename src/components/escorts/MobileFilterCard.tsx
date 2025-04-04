
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import SearchFilter from "./filters/SearchFilter";
import LocationFilter from "./filters/LocationFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import CheckboxGroup from "./filters/CheckboxGroup";
import ServiceTypeFilter from "./filters/ServiceTypeFilter";
import AgeRangeFilter from "./filters/AgeRangeFilter";
import RatingFilter from "./filters/RatingFilter";
import AvailabilityFilter from "./filters/AvailabilityFilter";

interface MobileFilterCardProps {
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
  ageRange?: number[];
  setAgeRange?: (value: number[]) => void;
  ratingMin?: number;
  setRatingMin?: (value: number) => void;
  availableNow?: boolean;
  setAvailableNow?: (value: boolean) => void;
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

const MobileFilterCard = ({
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
  setShowFilters,
  selectedGenders,
  toggleGender,
  selectedOrientations,
  toggleOrientation,
  ageRange = [18, 50],
  setAgeRange = () => {},
  ratingMin = 0,
  setRatingMin = () => {},
  availableNow = false,
  setAvailableNow = () => {},
  serviceTypeFilter,
  setServiceTypeFilter
}: MobileFilterCardProps) => {
  const genders = ["male", "female", "non-binary", "transgender"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Filters</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowFilters(false)}
        >
          <X size={18} />
        </Button>
      </CardHeader>
      <CardContent>
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
              <ServiceTypeFilter
                serviceTypeFilter={serviceTypeFilter}
                setServiceTypeFilter={setServiceTypeFilter}
              />
            </div>
            
            <AgeRangeFilter
              ageRange={ageRange as [number, number]}
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
            
            <CheckboxGroup
              title="Services"
              items={services}
              selectedItems={selectedServices}
              toggleItem={toggleService}
              idPrefix="service-mobile"
            />
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={clearFilters}
          >
            Clear
          </Button>
          <Button 
            className="flex-1"
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileFilterCard;
