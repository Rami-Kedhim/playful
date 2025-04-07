
import React, { useState, useEffect } from "react";
import { Escort } from "@/types/escort";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import FilterLocation from "./filters/FilterLocation";
import FilterServices from "./filters/FilterServices";

interface EscortFiltersProps {
  escorts: Escort[];
  services?: string[];
  onApplyFilters: (filteredEscorts: Escort[]) => void;
  onClearFilters: () => void;
}

const EscortFilters: React.FC<EscortFiltersProps> = ({
  escorts,
  services = [],
  onApplyFilters,
  onClearFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Extract unique locations from escorts
  const uniqueLocations = [...new Set(escorts.map(escort => escort.location || ""))].filter(Boolean);

  // Toggle service selection
  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Apply filters function
  const applyFilters = () => {
    let filtered = [...escorts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        escort => 
          escort.name?.toLowerCase().includes(query) ||
          escort.location?.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (selectedLocation && selectedLocation !== "all") {
      filtered = filtered.filter(escort => escort.location === selectedLocation);
    }

    // Filter by services
    if (selectedServices.length > 0) {
      filtered = filtered.filter(escort => 
        selectedServices.every(service => 
          escort.services?.includes(service)
        )
      );
    }

    // Filter by price range
    filtered = filtered.filter(escort => {
      const price = escort.price || 0;
      return price >= minPrice && price <= maxPrice;
    });

    // Filter by availability
    if (isAvailable) {
      filtered = filtered.filter(escort => escort.availableNow === true);
    }

    // Filter by verification status
    if (isVerified) {
      filtered = filtered.filter(escort => escort.verified === true);
    }

    onApplyFilters(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedServices([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setIsAvailable(false);
    setIsVerified(false);
    onClearFilters();
  };

  // Apply filters when any of the filter values change
  useEffect(() => {
    applyFilters();
  }, [selectedLocation, selectedServices, minPrice, maxPrice, isAvailable, isVerified]);

  return (
    <div className="space-y-4">
      {/* Search filter */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") applyFilters();
          }}
        />
      </div>

      {/* Location filter */}
      <FilterLocation 
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        uniqueLocations={uniqueLocations}
      />

      {/* Services filter */}
      <FilterServices 
        services={services}
        selectedServices={selectedServices}
        toggleService={toggleService}
      />

      {/* Price range filter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="price-range" className="text-sm font-medium">
            Price Range
          </Label>
          <span className="text-xs text-muted-foreground">
            ${minPrice} - ${maxPrice}
          </span>
        </div>
        <div className="pt-4">
          <Slider
            id="price-range"
            defaultValue={[minPrice, maxPrice]}
            max={1000}
            step={10}
            onValueChange={(values) => {
              setMinPrice(values[0]);
              setMaxPrice(values[1]);
            }}
            className="w-full"
          />
        </div>
      </div>

      {/* Availability filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="available"
          checked={isAvailable}
          onCheckedChange={(checked) => setIsAvailable(checked as boolean)}
        />
        <Label htmlFor="available" className="text-sm font-medium cursor-pointer">
          Available Now
        </Label>
      </div>

      {/* Verification filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={isVerified}
          onCheckedChange={(checked) => setIsVerified(checked as boolean)}
        />
        <Label htmlFor="verified" className="text-sm font-medium cursor-pointer">
          Verified Only
        </Label>
      </div>

      {/* Filter actions */}
      <div className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear Filters
        </Button>
        <Button size="sm" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default EscortFilters;
