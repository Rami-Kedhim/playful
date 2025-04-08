
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';

interface EscortFiltersProps {
  filters: {
    location: string;
    serviceTypes: string[];
    priceRange: [number, number];
    gender: string[];
    orientation: string[];
    ageRange: [number, number];
    rating: number;
    verified: boolean;
    availableNow: boolean;
    escortType: "verified" | "ai" | "provisional" | "all";
    language: string[];
  };
  onUpdate: (filters: Partial<EscortFiltersProps['filters']>) => void;
  onApply: () => void;
  onClear: () => void;
}

const EscortFilters: React.FC<EscortFiltersProps> = ({ 
  filters, 
  onUpdate, 
  onApply, 
  onClear 
}) => {
  const commonServices = [
    { id: 'gfe', label: 'GFE' },
    { id: 'massage', label: 'Massage' },
    { id: 'overnight', label: 'Overnight' },
    { id: 'dinner-date', label: 'Dinner Date' },
    { id: 'travel', label: 'Travel Companion' }
  ];
  
  const handleServiceToggle = (service: string) => {
    const updatedServices = filters.serviceTypes.includes(service)
      ? filters.serviceTypes.filter(s => s !== service)
      : [...filters.serviceTypes, service];
      
    onUpdate({ serviceTypes: updatedServices });
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    onUpdate({ priceRange: [values[0], values[1]] as [number, number] });
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          className="h-8 text-xs flex items-center"
        >
          <X className="h-3 w-3 mr-1" />
          Clear All
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm">Location</Label>
          <Input
            id="location"
            placeholder="City or area..."
            value={filters.location}
            onChange={(e) => onUpdate({ location: e.target.value })}
            className="h-8"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Price Range (per hour)</Label>
          <div className="pt-2 px-1">
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              min={0}
              max={1000}
              step={50}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceRangeChange}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}+</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Verification</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={filters.verified}
              onCheckedChange={(checked) => onUpdate({ verified: !!checked })}
            />
            <label htmlFor="verified" className="text-sm font-normal">
              Verified Only
            </label>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Availability</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="availableNow"
              checked={filters.availableNow}
              onCheckedChange={(checked) => onUpdate({ availableNow: !!checked })}
            />
            <label htmlFor="availableNow" className="text-sm font-normal">
              Available Now
            </label>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Service Type</Label>
          <RadioGroup
            value={filters.escortType}
            onValueChange={(value) => onUpdate({ escortType: value as EscortFiltersProps['filters']['escortType'] })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-types" />
              <Label htmlFor="all-types" className="text-sm font-normal">All Types</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="verified" id="verified-escorts" />
              <Label htmlFor="verified-escorts" className="text-sm font-normal">Verified Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ai" id="ai-escorts" />
              <Label htmlFor="ai-escorts" className="text-sm font-normal">AI Models</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Services</Label>
          <div className="grid grid-cols-2 gap-2">
            {commonServices.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={filters.serviceTypes.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <Label htmlFor={service.id} className="text-sm font-normal">
                  {service.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => onClear()}
          >
            Reset
          </Button>
          <Button 
            onClick={() => onApply()}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortFilters;
