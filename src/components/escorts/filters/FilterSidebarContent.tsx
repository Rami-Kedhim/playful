
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SearchFilter from "./SearchFilter";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import AgeRangeFilter from "./AgeRangeFilter";
import RatingFilter from "./RatingFilter";
import CheckboxGroup from "./CheckboxGroup";
import ServiceTypeRadioFilter from "./ServiceTypeRadioFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import HeightRangeFilter from "./HeightRangeFilter";
import WeightRangeFilter from "./WeightRangeFilter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  ageRange?: [number, number];
  setAgeRange?: (range: number[]) => void;
  ratingMin?: number;
  setRatingMin?: (rating: number) => void;
  availableNow?: boolean;
  setAvailableNow?: (available: boolean) => void;
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
  
  // Added new filter props
  heightRange?: [number, number];
  setHeightRange?: (range: number[]) => void;
  weightRange?: [number, number];
  setWeightRange?: (range: number[]) => void;
  selectedLanguages?: string[];
  toggleLanguage?: (language: string) => void;
  selectedHairColors?: string[];
  toggleHairColor?: (hairColor: string) => void;
  selectedEyeColors?: string[];
  toggleEyeColor?: (eyeColor: string) => void;
  selectedEthnicities?: string[];
  toggleEthnicity?: (ethnicity: string) => void;
  selectedBodyTypes?: string[];
  toggleBodyType?: (bodyType: string) => void;
  selectedDays?: string[];
  toggleDay?: (day: string) => void;
  selectedHours?: string[];
  toggleHour?: (hour: string) => void;
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
  selectedServices,
  toggleService,
  services,
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
  setServiceTypeFilter,
  
  // New filter props with defaults
  heightRange = [140, 200],
  setHeightRange = () => {},
  weightRange = [40, 120],
  setWeightRange = () => {},
  selectedLanguages = [],
  toggleLanguage = () => {},
  selectedHairColors = [],
  toggleHairColor = () => {},
  selectedEyeColors = [],
  toggleEyeColor = () => {},
  selectedEthnicities = [],
  toggleEthnicity = () => {},
  selectedBodyTypes = [],
  toggleBodyType = () => {},
  selectedDays = [],
  toggleDay = () => {},
  selectedHours = [],
  toggleHour = () => {}
}: FilterSidebarContentProps) => {
  const genders = ["male", "female", "non-binary", "transgender"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];
  
  return (
    <ScrollArea className="h-[calc(100vh-180px)] pr-4">
      <div className="space-y-6">
        <SearchFilter 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <LocationFilter 
          location={location} 
          setLocation={setLocation} 
        />
        
        <Separator />
        
        <AvailabilityFilter
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}
          availableNow={availableNow}
          setAvailableNow={setAvailableNow}
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          selectedHours={selectedHours}
          toggleHour={toggleHour}
        />
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Service Types</h3>
          <ServiceTypeRadioFilter
            serviceTypeFilter={serviceTypeFilter}
            setServiceTypeFilter={setServiceTypeFilter}
          />
        </div>
        
        <Separator />
        
        <PriceRangeFilter 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
        />
        
        <Separator />
        
        <AgeRangeFilter
          ageRange={ageRange}
          setAgeRange={setAgeRange}
        />
        
        <RatingFilter
          ratingMin={ratingMin}
          setRatingMin={setRatingMin}
        />
        
        <Separator />
        
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="attributes">
            <AccordionTrigger className="text-sm font-medium py-2">
              Physical Attributes
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                <HeightRangeFilter
                  heightRange={heightRange}
                  setHeightRange={setHeightRange}
                />
                
                <WeightRangeFilter
                  weightRange={weightRange}
                  setWeightRange={setWeightRange}
                />
                
                {/* Display service types with CheckboxGroup */}
                <CheckboxGroup
                  title="Services"
                  items={services}
                  selectedItems={selectedServices}
                  toggleItem={toggleService}
                  formatItem={(option) => option}
                  idPrefix="service"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="gender-orientation">
            <AccordionTrigger className="text-sm font-medium py-2">
              Gender & Orientation
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                <CheckboxGroup
                  title="Gender"
                  items={genders}
                  selectedItems={selectedGenders}
                  toggleItem={toggleGender}
                  formatItem={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
                  idPrefix="gender"
                />
                
                <CheckboxGroup
                  title="Sexual Orientation"
                  items={orientations}
                  selectedItems={selectedOrientations}
                  toggleItem={toggleOrientation}
                  formatItem={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
                  idPrefix="orientation"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default FilterSidebarContent;
