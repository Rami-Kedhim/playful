
import React, { useState, useEffect } from "react";
import { Escort } from "@/types/escort";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

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
  }, [searchTerm, selectedLocation, priceRange, selectedServices, verifiedOnly, selectedGenders, escorts, onApplyFilters]);
  
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
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">Location</label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Price Range</span>
            <span className="text-sm">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            max={1000}
            step={50}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
            className="py-4"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="verified" 
            checked={verifiedOnly} 
            onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)} 
          />
          <Label htmlFor="verified">Verified Only</Label>
        </div>
        
        {services.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Services</span>
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
          </div>
        )}
        
        {uniqueGenders.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Gender</span>
            <div className="flex flex-wrap gap-2">
              {uniqueGenders.map((gender) => (
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
        )}
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
