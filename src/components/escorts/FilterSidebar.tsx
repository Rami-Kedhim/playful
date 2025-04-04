
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

import SearchFilter from "./filters/SearchFilter";
import LocationFilter from "./filters/LocationFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import CheckboxGroup from "./filters/CheckboxGroup";
import ServiceTypeFilter from "./filters/ServiceTypeFilter";
import AgeRangeFilter from "./filters/AgeRangeFilter";
import RatingFilter from "./filters/RatingFilter";
import AvailabilityFilter from "./filters/AvailabilityFilter";

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
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
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
  const genders = ["male", "female", "transgender", "non-binary"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];
  
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <Accordion type="multiple" defaultValue={["search", "serviceType", "location", "price", "availability"]}>
        <AccordionItem value="search">
          <AccordionTrigger>Search</AccordionTrigger>
          <AccordionContent>
            <SearchFilter 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="serviceType">
          <AccordionTrigger>Service Type</AccordionTrigger>
          <AccordionContent>
            <ServiceTypeFilter
              serviceTypeFilter={serviceTypeFilter}
              setServiceTypeFilter={setServiceTypeFilter}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <LocationFilter 
              location={location} 
              setLocation={setLocation} 
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <PriceRangeFilter 
              priceRange={priceRange} 
              setPriceRange={setPriceRange} 
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <AvailabilityFilter
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              availableNow={availableNow}
              setAvailableNow={setAvailableNow}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="age">
          <AccordionTrigger>Age</AccordionTrigger>
          <AccordionContent>
            <AgeRangeFilter
              ageRange={ageRange}
              setAgeRange={setAgeRange}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <RatingFilter
              ratingMin={ratingMin}
              setRatingMin={setRatingMin}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="gender">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            <CheckboxGroup 
              title="Gender"
              items={genders}
              selectedItems={selectedGenders}
              toggleItem={toggleGender}
              formatItem={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              idPrefix="gender"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="orientation">
          <AccordionTrigger>Sexual Orientation</AccordionTrigger>
          <AccordionContent>
            <CheckboxGroup 
              title="Sexual Orientation"
              items={orientations}
              selectedItems={selectedOrientations}
              toggleItem={toggleOrientation}
              formatItem={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              idPrefix="orientation"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="services">
          <AccordionTrigger>Services</AccordionTrigger>
          <AccordionContent>
            <CheckboxGroup 
              title="Services"
              items={services}
              selectedItems={selectedServices}
              toggleItem={toggleService}
              idPrefix="service"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
