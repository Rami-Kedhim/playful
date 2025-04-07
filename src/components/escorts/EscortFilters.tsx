
import React, { useState, useEffect } from "react";
import { Escort } from "@/types/escort";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FilterHeader from "./filters/FilterHeader";
import FilterSearch from "./filters/FilterSearch";
import FilterLocation from "./filters/FilterLocation";
import FilterPrice from "./filters/FilterPrice";
import FilterVerified from "./filters/FilterVerified";
import FilterBadges from "./filters/FilterBadges";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  
  // Get unique locations from escorts data
  const uniqueLocations = [...new Set(escorts.map((escort) => escort.location))];
  
  // Get unique genders from escorts data
  const uniqueGenders = [...new Set(escorts.map((escort) => escort.gender).filter(Boolean))];
  
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...escorts];
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter((escort) =>
          escort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          escort.bio?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          escort.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by location
      if (selectedLocation) {
        filtered = filtered.filter((escort) =>
          escort.location === selectedLocation
        );
      }
      
      // Filter by price range
      filtered = filtered.filter(
        (escort) => escort.price >= priceRange[0] && escort.price <= priceRange[1]
      );
      
      // Filter by services
      if (selectedServices.length > 0) {
        filtered = filtered.filter((escort) =>
          escort.services?.some((service) => selectedServices.includes(service))
        );
      }
      
      // Filter by verification status
      if (verifiedOnly) {
        filtered = filtered.filter((escort) => escort.verified);
      }
      
      // Filter by gender
      if (selectedGenders.length > 0) {
        filtered = filtered.filter((escort) =>
          escort.gender && selectedGenders.includes(escort.gender)
        );
      }
      
      onApplyFilters(filtered);
    };
    
    applyFilters();
  }, [
    searchTerm, 
    selectedLocation, 
    priceRange, 
    selectedServices, 
    verifiedOnly, 
    selectedGenders, 
    escorts, 
    onApplyFilters
  ]);
  
  const handleClear = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setPriceRange([0, 1000]);
    setSelectedServices([]);
    setVerifiedOnly(false);
    setSelectedGenders([]);
    onClearFilters();
  };
  
  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };
  
  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FilterHeader clearFilters={handleClear} />
        
        <Separator className="my-4" />
        
        <FilterSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <FilterLocation 
          selectedLocation={selectedLocation} 
          setSelectedLocation={setSelectedLocation} 
          uniqueLocations={uniqueLocations} 
        />
        
        <FilterPrice priceRange={priceRange} setPriceRange={setPriceRange} />
        
        <FilterVerified verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} />
        
        <FilterServices
          services={services}
          selectedServices={selectedServices}
          toggleService={toggleService}
        />
        
        <FilterBadges
          title="Gender"
          items={uniqueGenders}
          selectedItems={selectedGenders}
          toggleItem={toggleGender}
        />
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleClear} className="mr-2">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default EscortFilters;
