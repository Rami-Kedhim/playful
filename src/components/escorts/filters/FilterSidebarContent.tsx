
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ServiceTypeFilter from "@/components/escorts/filters/ServiceTypeFilter";
import MultiCheckboxFilter from "./MultiCheckboxFilter";
import { ServiceTypeFilter as ServiceTypeFilterType } from './ServiceTypeBadgeLabel';

export interface FilterSidebarContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  selectedServices?: string[];
  toggleService?: (service: string) => void;
  services?: string[];
  selectedGenders?: string[];
  toggleGender?: (gender: string) => void;
  selectedOrientations?: string[];
  toggleOrientation?: (orientation: string) => void;
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
  selectedServices = [],
  toggleService = () => {},
  services = [],
  selectedGenders = [],
  toggleGender = () => {},
  selectedOrientations = [],
  toggleOrientation = () => {},
  ageRange = [18, 60],
  setAgeRange = () => {},
  ratingMin = 0,
  setRatingMin = () => {},
  availableNow = false,
  setAvailableNow = () => {},
  serviceTypeFilter,
  setServiceTypeFilter
}) => {
  return (
    <div className="space-y-6">
      {/* Search Filter */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">Search</Label>
        <Input 
          id="search"
          placeholder="Search by name or keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Separator />
      
      {/* Location Filter */}
      <div>
        <Label htmlFor="location" className="text-sm font-medium mb-2 block">Location</Label>
        <Input 
          id="location"
          placeholder="Enter city, area, or postcode"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Separator />
      
      {/* Service Type Filter */}
      <ServiceTypeFilter 
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
      />
      
      <Separator />
      
      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>$0</span>
          <span>$500</span>
          <span>$1000+</span>
        </div>
      </div>
      
      <Separator />
      
      {/* Verified Only */}
      <div className="flex items-center justify-between">
        <Label htmlFor="verified-only" className="text-sm font-medium">
          Verified Only
        </Label>
        <Switch
          id="verified-only"
          checked={verifiedOnly}
          onCheckedChange={setVerifiedOnly}
        />
      </div>
      
      {/* Available Now */}
      <div className="flex items-center justify-between">
        <Label htmlFor="available-now" className="text-sm font-medium">
          Available Now
        </Label>
        <Switch
          id="available-now"
          checked={availableNow}
          onCheckedChange={setAvailableNow}
        />
      </div>
      
      <Separator />
      
      {/* Rating Filter */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          Minimum Rating: {ratingMin} Stars
        </Label>
        <Slider
          min={0}
          max={5}
          step={0.5}
          value={[ratingMin]}
          onValueChange={(value) => setRatingMin(value[0])}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Any</span>
          <span>⭐⭐⭐</span>
          <span>⭐⭐⭐⭐⭐</span>
        </div>
      </div>
      
      <Separator />
      
      {/* Services */}
      {services && services.length > 0 && (
        <>
          <MultiCheckboxFilter
            title="Services"
            options={services}
            selectedOptions={selectedServices}
            onToggleOption={toggleService}
          />
          <Separator />
        </>
      )}
      
      {/* Selected Services */}
      {selectedServices && selectedServices.length > 0 && (
        <div>
          <Label className="text-sm font-medium mb-2 block">Selected Services</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedServices.map(service => (
              <Badge 
                key={service} 
                variant="outline"
                className="cursor-pointer"
                onClick={() => toggleService(service)}
              >
                {service} <span className="ml-1">×</span>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebarContent;
