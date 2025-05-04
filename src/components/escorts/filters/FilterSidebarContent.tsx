
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ServiceTypeFilter from './ServiceTypeFilter';
import type { ServiceTypeFilter as ServiceTypeFilterType } from './ServiceTypeBadgeLabel';
import { MultiCheckboxFilter } from '@/components/escorts/filters/MultiCheckboxFilter';
import { Option } from '@/types/core-systems';

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
  serviceTypeFilter: ServiceTypeFilterType;
  setServiceTypeFilter: (type: ServiceTypeFilterType) => void;
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
}) => {
  const genderOptions: Option[] = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'trans', label: 'Transgender' },
    { value: 'non-binary', label: 'Non-binary' }
  ];

  const orientationOptions: Option[] = [
    { value: 'straight', label: 'Straight' },
    { value: 'gay', label: 'Gay' },
    { value: 'lesbian', label: 'Lesbian' },
    { value: 'bisexual', label: 'Bisexual' },
    { value: 'pansexual', label: 'Pansexual' }
  ];

  const serviceOptions: Option[] = services.map(service => ({
    value: service,
    label: service
  }));

  // Convert arrays to proper format for MultiCheckboxFilter
  const handleGenderToggle = (value: string) => {
    toggleGender(value);
  };

  const handleOrientationToggle = (value: string) => {
    toggleOrientation(value);
  };

  const handleServiceToggle = (value: string) => {
    toggleService(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input 
          id="search"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search escorts..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location"
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or country"
        />
      </div>

      <Separator />

      <ServiceTypeFilter
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        className="mb-4"
      />

      <Separator />

      <div className="space-y-2">
        <Label>Price Range (per hour)</Label>
        <div className="pt-4">
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            min={0}
            max={1000}
            step={50}
            onValueChange={(values) => setPriceRange(values as [number, number])}
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <Toggle 
          pressed={verifiedOnly} 
          onPressedChange={setVerifiedOnly}
          className="w-full justify-start gap-2"
        >
          <Check className={`h-4 w-4 ${verifiedOnly ? "opacity-100" : "opacity-0"}`} />
          Verified Only
        </Toggle>
      </div>

      <div>
        <Toggle 
          pressed={availableNow} 
          onPressedChange={setAvailableNow}
          className="w-full justify-start gap-2"
        >
          <Check className={`h-4 w-4 ${availableNow ? "opacity-100" : "opacity-0"}`} />
          Available Now
        </Toggle>
      </div>

      <Separator />

      <MultiCheckboxFilter
        title="Gender"
        options={genderOptions}
        selectedValues={selectedGenders}
        onChange={handleGenderToggle}
      />

      <MultiCheckboxFilter
        title="Sexual Orientation"
        options={orientationOptions}
        selectedValues={selectedOrientations}
        onChange={handleOrientationToggle}
      />

      <MultiCheckboxFilter
        title="Services"
        options={serviceOptions}
        selectedValues={selectedServices}
        onChange={handleServiceToggle}
      />

      <Separator />

      <div className="space-y-2">
        <Label>Age Range</Label>
        <div className="pt-4">
          <Slider
            defaultValue={[ageRange[0], ageRange[1]]}
            min={18}
            max={65}
            step={1}
            onValueChange={(values) => setAgeRange(values as [number, number])}
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm">{ageRange[0]} years</span>
            <span className="text-sm">{ageRange[1]} years</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Minimum Rating</Label>
        <div className="pt-4">
          <Slider
            defaultValue={[ratingMin]}
            min={0}
            max={5}
            step={0.5}
            onValueChange={(values) => setRatingMin(values[0])}
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm">Any</span>
            <span className="text-sm">{ratingMin} stars+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebarContent;
