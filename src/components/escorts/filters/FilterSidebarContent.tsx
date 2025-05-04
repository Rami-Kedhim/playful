
import React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OrientationFilter from "./OrientationFilter";
import { Checkbox } from "@/components/ui/checkbox";

export interface FilterSidebarContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;  // Type corrected
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
  setAgeRange?: (range: [number, number]) => void;  // Type corrected
  ratingMin?: number;
  setRatingMin?: (rating: number) => void;
  availableNow?: boolean;
  setAvailableNow?: (available: boolean) => void;
  serviceTypeFilter: "in-person" | "virtual" | "both" | "any" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "any" | "") => void;
}

const FilterSidebarContent: React.FC<FilterSidebarContentProps> = (props) => {
  const {
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
  } = props;

  // Create a wrapper for the setPriceRange function to adapt it to the expected signature
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]] as [number, number]);
  };

  // Create a wrapper for the setAgeRange function to adapt it to the expected signature
  const handleAgeRangeChange = (value: number[]) => {
    if (setAgeRange) {
      setAgeRange([value[0], value[1]] as [number, number]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Search</h3>
        <Input
          placeholder="Search by name or keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Location filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Location</h3>
        <Input
          placeholder="Enter city or area"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Service type filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Service Type</h3>
        <RadioGroup
          value={serviceTypeFilter}
          onValueChange={(value) => setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "any" | "")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in-person" id="service-in-person" />
            <Label htmlFor="service-in-person">In-Person</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="virtual" id="service-virtual" />
            <Label htmlFor="service-virtual">Virtual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="service-both" />
            <Label htmlFor="service-both">Both</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="service-any" />
            <Label htmlFor="service-any">Any</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Price range filter */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">Price Range</h3>
          <span className="text-xs text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={[priceRange[0], priceRange[1]]}
          min={0}
          max={1000}
          step={10}
          onValueChange={handlePriceRangeChange}
        />
      </div>

      {/* Age range filter */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">Age Range</h3>
          <span className="text-xs text-muted-foreground">
            {ageRange[0]} - {ageRange[1]} years
          </span>
        </div>
        <Slider
          value={[ageRange[0], ageRange[1]]}
          min={18}
          max={60}
          step={1}
          onValueChange={handleAgeRangeChange}
        />
      </div>

      {/* Rating filter */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">Minimum Rating</h3>
          <span className="text-xs text-muted-foreground">{ratingMin} stars</span>
        </div>
        <Slider
          value={[ratingMin || 0]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={(value) => setRatingMin && setRatingMin(value[0])}
        />
      </div>

      {/* Gender filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Gender</h3>
        <div className="flex flex-wrap gap-2">
          {["Female", "Male", "Non-binary", "Trans"].map((gender) => (
            <Badge
              key={gender}
              variant={selectedGenders.includes(gender) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleGender(gender)}
            >
              {gender}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sexual orientation filter */}
      <OrientationFilter
        selectedOrientations={selectedOrientations}
        onChange={toggleOrientation}
      />

      {/* Services filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Services</h3>
        <div className="grid grid-cols-2 gap-2">
          {services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service}`}
                checked={selectedServices.includes(service)}
                onCheckedChange={() => toggleService(service)}
              />
              <Label
                htmlFor={`service-${service}`}
                className="text-sm cursor-pointer"
              >
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Verification filter */}
      <div className="flex items-center space-x-2">
        <Switch
          id="verified-only"
          checked={verifiedOnly}
          onCheckedChange={setVerifiedOnly}
        />
        <Label htmlFor="verified-only">Verified profiles only</Label>
      </div>

      {/* Available now filter */}
      <div className="flex items-center space-x-2">
        <Switch
          id="available-now"
          checked={availableNow}
          onCheckedChange={(value) => setAvailableNow && setAvailableNow(value)}
        />
        <Label htmlFor="available-now">Available now</Label>
      </div>
    </div>
  );
};

export default FilterSidebarContent;
