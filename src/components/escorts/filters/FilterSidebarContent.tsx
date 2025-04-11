
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Euro } from "lucide-react";
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import ServiceTypeRadioGroup from './ServiceTypeRadioGroup';

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
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
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
  ageRange = [18, 50],
  setAgeRange = () => {},
  ratingMin = 0,
  setRatingMin = () => {},
  availableNow = false,
  setAvailableNow = () => {},
  serviceTypeFilter,
  setServiceTypeFilter
}: FilterSidebarContentProps) => {
  // Common gender options
  const genderOptions = ["female", "male", "transgender", "non-binary"];
  
  // Common orientation options
  const orientationOptions = ["straight", "gay", "lesbian", "bisexual", "pansexual"];
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="City, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Service Type</Label>
        <ServiceTypeRadioGroup 
          serviceTypeFilter={serviceTypeFilter}
          setServiceTypeFilter={setServiceTypeFilter}
          layout="vertical"
          showLabels={true}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="price-range">Price Range</Label>
          <span className="text-sm">
            {priceRange[0]} - {priceRange[1]} LC
          </span>
        </div>
        <Slider
          id="price-range"
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="verified"
          checked={verifiedOnly}
          onCheckedChange={setVerifiedOnly}
        />
        <Label htmlFor="verified">Verified Only</Label>
      </div>
      
      {setAvailableNow && (
        <div className="flex items-center space-x-2">
          <Switch
            id="available-now"
            checked={availableNow}
            onCheckedChange={setAvailableNow}
          />
          <Label htmlFor="available-now">Available Now</Label>
        </div>
      )}
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="gender">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {genderOptions.map((gender) => (
                <Button
                  key={gender}
                  variant={selectedGenders.includes(gender) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleGender(gender)}
                  className="justify-start"
                >
                  <span className="capitalize">{gender}</span>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="orientation">
          <AccordionTrigger>Orientation</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {orientationOptions.map((orientation) => (
                <Button
                  key={orientation}
                  variant={selectedOrientations.includes(orientation) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleOrientation(orientation)}
                  className="justify-start"
                >
                  <span className="capitalize">{orientation}</span>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="age">
          <AccordionTrigger>Age Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {ageRange[0]} - {ageRange[1]} years
                </span>
              </div>
              <Slider
                min={18}
                max={99}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="rating">
          <AccordionTrigger>Minimum Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {ratingMin} stars and above
                </span>
              </div>
              <Slider
                min={0}
                max={5}
                step={0.5}
                value={[ratingMin]}
                onValueChange={([value]) => setRatingMin(value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="services">
          <AccordionTrigger>Services</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Badge
                  key={service}
                  variant={selectedServices.includes(service) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleService(service)}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebarContent;
