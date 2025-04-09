
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchInput } from "@/components/ui/search-input";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import ServicesFilter from "./ServicesFilter";
import GenderFilter from "./GenderFilter";
import OrientationFilter from "./OrientationFilter";
import AgeRangeFilter from "./AgeRangeFilter";
import VerifiedFilter from "./VerifiedFilter";
import ServiceTypeFilter from "./ServiceTypeFilter";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";

interface EscortFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (values: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange: [number, number];
  setAgeRange: (values: number[]) => void;
  ratingMin: number;
  setRatingMin: (value: number) => void;
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
  serviceTypeFilter: "" | "in-person" | "virtual" | "both";
  setServiceTypeFilter: (value: "" | "in-person" | "virtual" | "both") => void;
  onApply: () => void;
  onClear: () => void;
}

const EscortFilters = ({
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
  ageRange,
  setAgeRange,
  ratingMin,
  setRatingMin,
  availableNow,
  setAvailableNow,
  serviceTypeFilter,
  setServiceTypeFilter,
  onApply,
  onClear,
}: EscortFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filter Escorts</h3>
        <Button variant="ghost" size="sm" onClick={onClear}>Clear All</Button>
      </div>
      
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-6">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search escorts..."
            className="w-full"
          />
          
          <LocationFilter location={location} setLocation={setLocation} />
          
          <Separator />
          
          <AgeRangeFilter ageRange={ageRange} setAgeRange={setAgeRange} />
          
          <Separator />
          
          <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />
          
          <Separator />
          
          <ServiceTypeFilter 
            serviceTypeFilter={serviceTypeFilter} 
            setServiceTypeFilter={setServiceTypeFilter} 
          />
          
          <Separator />
          
          <GenderFilter
            selectedGenders={selectedGenders}
            toggleGender={toggleGender}
          />
          
          <Separator />
          
          <OrientationFilter
            selectedOrientations={selectedOrientations}
            toggleOrientation={toggleOrientation}
          />
          
          <Separator />
          
          <ServicesFilter
            selectedServices={selectedServices}
            toggleService={toggleService}
            services={services}
          />
          
          <Separator />
          
          <RatingFilter ratingMin={ratingMin} setRatingMin={setRatingMin} />
          
          <Separator />
          
          <div className="space-y-4">
            <VerifiedFilter verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} />
            
            <AvailabilityFilter availableNow={availableNow} setAvailableNow={setAvailableNow} />
          </div>
        </div>
      </ScrollArea>
      
      <div className="mt-4 pt-4 border-t">
        <Button onClick={onApply} className="w-full">Apply Filters</Button>
      </div>
    </Card>
  );
};

export default EscortFilters;
