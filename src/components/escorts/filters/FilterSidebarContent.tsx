
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceTypeBadgeLabel from "./ServiceTypeBadgeLabel";
import { Badge } from '@/components/ui/badge';

export interface FilterSidebarContentProps {
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
  clearFilters: () => void; // Make clearFilters required
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

const FilterSidebarContent: React.FC<FilterSidebarContentProps> = ({
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
  setServiceTypeFilter,
}) => {
  // Define fixed options
  const genderOptions = [
    { id: 'female', name: 'Female' },
    { id: 'male', name: 'Male' },
    { id: 'transgender', name: 'Transgender' },
    { id: 'non-binary', name: 'Non-Binary' },
  ];
  
  const orientationOptions = [
    { id: 'straight', name: 'Straight' },
    { id: 'gay', name: 'Gay' },
    { id: 'lesbian', name: 'Lesbian' },
    { id: 'bisexual', name: 'Bisexual' },
    { id: 'pansexual', name: 'Pansexual' },
  ];
  
  const handleServiceTypeChange = (value: string) => {
    setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "any" | "");
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const handleAgeRangeChange = (values: number[]) => {
    if (setAgeRange) {
      setAgeRange([values[0], values[1]]);
    }
  };
  
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search-filter">Search</Label>
        <Input
          id="search-filter"
          placeholder="Search by name, description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location-filter">Location</Label>
        <Input
          id="location-filter"
          placeholder="Enter city or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />
      </div>
      
      {/* Service Type */}
      <div className="space-y-2">
        <Label>Service Type</Label>
        <RadioGroup value={serviceTypeFilter} onValueChange={handleServiceTypeChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="service-type-any" />
            <Label htmlFor="service-type-any">Any</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in-person" id="service-type-in-person" />
            <Label htmlFor="service-type-in-person">In-person</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="virtual" id="service-type-virtual" />
            <Label htmlFor="service-type-virtual">Virtual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="service-type-both" />
            <Label htmlFor="service-type-both">Both</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Price Range */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          min={0}
          max={500}
          step={10}
          onValueChange={handlePriceRangeChange}
          className="w-full"
        />
      </div>
      
      {/* Age Range */}
      {setAgeRange && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Age Range</Label>
            <span className="text-sm text-muted-foreground">
              {ageRange[0]} - {ageRange[1]}
            </span>
          </div>
          <Slider
            value={ageRange}
            min={18}
            max={60}
            step={1}
            onValueChange={handleAgeRangeChange}
            className="w-full"
          />
        </div>
      )}
      
      {/* Gender */}
      <div className="space-y-2">
        <Label>Gender</Label>
        <div className="flex flex-wrap gap-2">
          {genderOptions.map((gender) => (
            <Badge
              key={gender.id}
              variant={selectedGenders.includes(gender.id) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleGender(gender.id)}
            >
              {gender.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Orientation */}
      <div className="space-y-2">
        <Label>Orientation</Label>
        <div className="flex flex-wrap gap-2">
          {orientationOptions.map((orientation) => (
            <Badge
              key={orientation.id}
              variant={selectedOrientations.includes(orientation.id) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOrientation(orientation.id)}
            >
              {orientation.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Services */}
      <div className="space-y-2">
        <Label>Services Offered</Label>
        <div className="grid grid-cols-1 gap-2">
          {services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service}`}
                checked={selectedServices.includes(service)}
                onCheckedChange={() => toggleService(service)}
              />
              <Label htmlFor={`service-${service}`} className="cursor-pointer">
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Rating */}
      {setRatingMin && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Minimum Rating</Label>
            <span className="text-sm text-muted-foreground">{ratingMin} stars</span>
          </div>
          <Slider
            value={[ratingMin]}
            min={0}
            max={5}
            step={0.5}
            onValueChange={(values) => setRatingMin(values[0])}
            className="w-full"
          />
        </div>
      )}
      
      {/* Switches */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="verified-only"
            checked={verifiedOnly}
            onCheckedChange={setVerifiedOnly}
          />
          <Label htmlFor="verified-only">Verified Only</Label>
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
      </div>
    </div>
  );
};

export default FilterSidebarContent;
