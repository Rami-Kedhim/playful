
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchInput } from "@/components/ui/search-input";
import { RangeSlider } from "@/components/ui/range-slider";
import { Label } from "@/components/ui/label";
import ServiceTypeFilter from "./ServiceTypeFilter";
import ServicesFilter from "./ServicesFilter";
import GenderFilter from "./GenderFilter";
import OrientationFilter from "./OrientationFilter";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";

interface EscortFiltersProps {
  onApply: () => void;
  onClear: () => void;
  onUpdate: (filters: any) => void;
  
  // Filter state props
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  serviceType: "" | "in-person" | "virtual" | "both";
  setServiceType: (type: "" | "in-person" | "virtual" | "both") => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange: [number, number];
  setAgeRange: (range: [number, number]) => void;
  ratingMin: number;
  setRatingMin: (rating: number) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
}

const EscortFilters = ({
  onApply,
  onClear,
  onUpdate,
  searchQuery = "",
  setSearchQuery = () => {},
  location,
  setLocation,
  priceRange,
  setPriceRange,
  serviceType,
  setServiceType,
  selectedServices,
  toggleService,
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
  verifiedOnly,
  setVerifiedOnly,
}: EscortFiltersProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  
  return (
    <Card>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>
        
        <CardContent className="pt-6">
          <TabsContent value="basic" className="space-y-4">
            {setSearchQuery && (
              <div className="space-y-2">
                <Label>Search</Label>
                <SearchInput
                  placeholder="Search escorts..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <SearchInput
                placeholder="City, Country"
                value={location}
                onChange={setLocation}
              />
            </div>
            
            <ServiceTypeFilter 
              serviceTypeFilter={serviceType} 
              setServiceTypeFilter={setServiceType} 
            />
            
            <div className="space-y-2">
              <Label>Price Range (Lucoin)</Label>
              <RangeSlider
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{priceRange[0]} LC</span>
                <span>{priceRange[1]} LC</span>
              </div>
            </div>
            
            <AvailabilityFilter 
              availableNow={availableNow} 
              setAvailableNow={setAvailableNow}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
            />
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-2">
              <Label>Age Range</Label>
              <RangeSlider 
                min={18}
                max={99}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{ageRange[0]} years</span>
                <span>{ageRange[1]} years</span>
              </div>
            </div>
            
            <GenderFilter 
              selectedGenders={selectedGenders} 
              onChange={toggleGender} 
            />
            
            <OrientationFilter 
              selectedOrientations={selectedOrientations} 
              onChange={toggleOrientation} 
            />
            
            <RatingFilter 
              ratingMin={ratingMin} 
              setRatingMin={setRatingMin} 
            />
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <ServicesFilter 
              selectedServices={selectedServices} 
              onChange={toggleService} 
            />
          </TabsContent>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClear}>Clear All</Button>
          <Button onClick={onApply}>Apply Filters</Button>
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default EscortFilters;
