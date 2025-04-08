
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

interface EscortFiltersProps {
  filters: {
    location: string;
    services: string[];
    gender: string;
    availability: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
  };
  onFilterChange: (filters: Partial<EscortFiltersProps['filters']>) => void;
}

const EscortFilters: React.FC<EscortFiltersProps> = ({ filters, onFilterChange }) => {
  const commonServices = [
    { id: 'gfe', label: 'GFE' },
    { id: 'massage', label: 'Massage' },
    { id: 'overnight', label: 'Overnight' },
    { id: 'dinner-date', label: 'Dinner Date' },
    { id: 'travel', label: 'Travel Companion' }
  ];
  
  const handleServiceToggle = (service: string) => {
    const updatedServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
      
    onFilterChange({ services: updatedServices });
  };
  
  const handleSliderChange = (values: number[]) => {
    onFilterChange({ 
      minPrice: values[0],
      maxPrice: values[1]
    });
  };
  
  const handleClearFilters = () => {
    onFilterChange({
      location: '',
      services: [],
      gender: '',
      availability: '',
      minPrice: 0,
      maxPrice: 1000
    });
  };
  
  const hasActiveFilters = 
    filters.location || 
    filters.services.length > 0 || 
    filters.gender || 
    filters.availability || 
    filters.minPrice > 0 || 
    filters.maxPrice < 1000;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="h-8 text-xs flex items-center"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm">Location</Label>
          <Input
            id="location"
            placeholder="City or area..."
            value={filters.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
            className="h-8"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Price Range (per hour)</Label>
          <div className="pt-2 px-1">
            <Slider
              defaultValue={[filters.minPrice, filters.maxPrice]}
              min={0}
              max={1000}
              step={50}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={handleSliderChange}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>${filters.minPrice}</span>
              <span>${filters.maxPrice}+</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Gender</Label>
          <RadioGroup
            value={filters.gender}
            onValueChange={(value) => onFilterChange({ gender: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-genders" />
              <Label htmlFor="all-genders" className="text-sm font-normal">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="text-sm font-normal">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="text-sm font-normal">Male</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Availability</Label>
          <RadioGroup
            value={filters.availability}
            onValueChange={(value) => onFilterChange({ availability: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-availability" />
              <Label htmlFor="all-availability" className="text-sm font-normal">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="availableNow" id="availableNow" />
              <Label htmlFor="availableNow" className="text-sm font-normal">Available Now</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Services</Label>
          <div className="grid grid-cols-1 gap-2">
            {commonServices.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={filters.services.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <Label htmlFor={service.id} className="text-sm font-normal">
                  {service.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Sort By</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => onFilterChange({ sortBy: value })}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Neural Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortFilters;
