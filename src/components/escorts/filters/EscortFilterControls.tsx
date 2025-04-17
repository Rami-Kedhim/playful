
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define a custom interface for this component's props that extends EscortFilterOptions 
// with the additional properties needed by this component
interface EscortFilterControlProps {
  filters: {
    location?: string;
    priceRange?: [number, number]; 
    ageRange?: [number, number];
    selectedServices?: string[];
    selectedGenders?: string[];
    verifiedOnly?: boolean;
  };
  onUpdateFilter: (key: string, value: any) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const EscortFilterControls: React.FC<EscortFilterControlProps> = ({
  filters,
  onUpdateFilter,
  onClearFilters,
  onApplyFilters
}) => {
  // Common service types for filtering
  const serviceOptions = [
    "GFE", "Massage", "Dinner Date", "Overnight", "Travel Companion", 
    "BDSM", "Couples"
  ];
  
  // Gender options
  const genderOptions = [
    "Female", "Male", "Non-binary", "Transgender"
  ];
  
  // Handle price range changes
  const handlePriceChange = (values: number[]) => {
    onUpdateFilter("priceRange", values as [number, number]);
  };
  
  // Handle age range changes
  const handleAgeChange = (values: number[]) => {
    onUpdateFilter("ageRange", values as [number, number]);
  };
  
  // Toggle a service selection
  const toggleService = (service: string) => {
    const currentServices = filters.selectedServices || [];
    const updated = currentServices.includes(service)
      ? currentServices.filter(s => s !== service)
      : [...currentServices, service];
    
    onUpdateFilter("selectedServices", updated);
  };
  
  // Toggle a gender selection
  const toggleGender = (gender: string) => {
    const currentGenders = filters.selectedGenders || [];
    const updated = currentGenders.includes(gender)
      ? currentGenders.filter(g => g !== gender)
      : [...currentGenders, gender];
    
    onUpdateFilter("selectedGenders", updated);
  };
  
  // Get the count of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.selectedServices && filters.selectedServices.length > 0) count += filters.selectedServices.length;
    if (filters.selectedGenders && filters.selectedGenders.length > 0) count += filters.selectedGenders.length;
    if (filters.verifiedOnly) count++;
    
    // Only count price range if it's not the default
    if (filters.priceRange && 
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 500)) {
      count++;
    }
    
    // Only count age range if it's not the default
    if (filters.ageRange && 
        (filters.ageRange[0] > 18 || filters.ageRange[1] < 60)) {
      count++;
    }
    
    return count;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {getActiveFilterCount() > 0 && (
          <Badge variant="outline">
            {getActiveFilterCount()} active
          </Badge>
        )}
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Search by city or area"
                value={filters.location || ""}
                onChange={(e) => onUpdateFilter("location", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={filters.priceRange || [0, 500]}
                min={0}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between">
                <span>${filters.priceRange?.[0] || 0}</span>
                <span>${filters.priceRange?.[1] || 500}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="age">
          <AccordionTrigger>Age Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={filters.ageRange || [18, 60]}
                min={18}
                max={80}
                step={1}
                onValueChange={handleAgeChange}
              />
              <div className="flex justify-between">
                <span>{filters.ageRange?.[0] || 18}</span>
                <span>{filters.ageRange?.[1] || 60}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="services">
          <AccordionTrigger>Services</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${service}`}
                    checked={(filters.selectedServices || []).includes(service)}
                    onChange={() => toggleService(service)}
                    className="mr-2"
                  />
                  <Label htmlFor={`service-${service}`}>{service}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {genderOptions.map((gender) => (
                <div key={gender} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`gender-${gender}`}
                    checked={(filters.selectedGenders || []).includes(gender)}
                    onChange={() => toggleGender(gender)}
                    className="mr-2"
                  />
                  <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="verification">
          <AccordionTrigger>Verification</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="verified-only">Verified profiles only</Label>
              <Switch
                id="verified-only"
                checked={filters.verifiedOnly || false}
                onCheckedChange={(checked) => onUpdateFilter("verifiedOnly", checked)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onClearFilters} className="flex-1">
          Clear All
        </Button>
        <Button onClick={onApplyFilters} className="flex-1">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default EscortFilterControls;
