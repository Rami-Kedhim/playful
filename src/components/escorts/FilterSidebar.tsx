
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { VideoIcon, UserIcon } from "lucide-react";
import SearchFilter from "./filters/SearchFilter";
import LocationFilter from "./filters/LocationFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import VerifiedFilter from "./filters/VerifiedFilter";
import CheckboxGroup from "./filters/CheckboxGroup";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
            <RadioGroup 
              value={serviceTypeFilter} 
              onValueChange={(value) => setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-services" />
                <Label htmlFor="all-services" className="flex items-center gap-2">
                  All Services
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  In-Person
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="virtual" id="virtual" />
                <Label htmlFor="virtual" className="flex items-center gap-2">
                  <VideoIcon className="h-4 w-4" />
                  Virtual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="flex items-center gap-2">
                  Both
                </Label>
              </div>
            </RadioGroup>
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
          <AccordionContent className="space-y-4">
            <VerifiedFilter 
              verifiedOnly={verifiedOnly} 
              setVerifiedOnly={setVerifiedOnly} 
            />
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="available-now" 
                checked={availableNow}
                onCheckedChange={setAvailableNow}
              />
              <Label htmlFor="available-now">Available Now</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="gender">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            <CheckboxGroup 
              title="Gender"
              options={genders}
              selectedOptions={selectedGenders}
              toggleOption={toggleGender}
              formatOption={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              idPrefix="gender"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="orientation">
          <AccordionTrigger>Sexual Orientation</AccordionTrigger>
          <AccordionContent>
            <CheckboxGroup 
              title="Sexual Orientation"
              options={orientations}
              selectedOptions={selectedOrientations}
              toggleOption={toggleOrientation}
              formatOption={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              idPrefix="orientation"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="services">
          <AccordionTrigger>Services</AccordionTrigger>
          <AccordionContent>
            <CheckboxGroup 
              title="Services"
              options={services}
              selectedOptions={selectedServices}
              toggleOption={toggleService}
              idPrefix="service"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
