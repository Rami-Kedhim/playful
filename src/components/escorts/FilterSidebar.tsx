import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
  clearFilters: () => void;
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
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
}: FilterSidebarProps) => {
  const genders = ["male", "female", "non-binary", "transgender"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];

  return (
    <Card className="h-fit sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="City or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range (LC)</label>
          <div className="pt-2">
            <Slider
              value={priceRange}
              min={0}
              max={500}
              step={10}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>{priceRange[0]} LC</span>
              <span>{priceRange[1]} LC</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={verifiedOnly}
            onCheckedChange={setVerifiedOnly}
          />
          <label className="text-sm font-medium">Verified only</label>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>
          <div className="grid grid-cols-2 gap-2">
            {genders.map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender}`}
                  checked={selectedGenders.includes(gender)}
                  onCheckedChange={() => toggleGender(gender)}
                />
                <label 
                  htmlFor={`gender-${gender}`}
                  className="text-sm capitalize cursor-pointer"
                >
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Sexual Orientation</label>
          <div className="grid grid-cols-2 gap-2">
            {orientations.map((orientation) => (
              <div key={orientation} className="flex items-center space-x-2">
                <Checkbox
                  id={`orientation-${orientation}`}
                  checked={selectedOrientations.includes(orientation)}
                  onCheckedChange={() => toggleOrientation(orientation)}
                />
                <label 
                  htmlFor={`orientation-${orientation}`}
                  className="text-sm capitalize cursor-pointer"
                >
                  {orientation}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Services</label>
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service}`}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={() => toggleService(service)}
                />
                <label 
                  htmlFor={`service-${service}`}
                  className="text-sm cursor-pointer"
                >
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
