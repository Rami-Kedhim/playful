
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SearchFilter from "./SearchFilter";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import CheckboxGroup from "./CheckboxGroup";
import ServiceTypeFilter from "./ServiceTypeFilter";
import AgeRangeFilter from "./AgeRangeFilter";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";

interface FilterSidebarContentProps {
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
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange: [number, number];
  setAgeRange: (range: number[]) => void;
  ratingMin: number;
  setRatingMin: (rating: number) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

const FilterSidebarContent = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  priceRange,
  setPriceRange,
  verifiedOnly,
  setVerifiedOnly,
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
}: FilterSidebarContentProps) => {
  const genders = ["male", "female", "transgender", "non-binary"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];
  
  return (
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
    </Accordion>
  );
};

export default FilterSidebarContent;
