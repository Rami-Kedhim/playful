import React from 'react';
import { Button } from '@/components/ui/button';
import { ServiceTypeFilter } from './filters/ServiceTypeBadgeLabel';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Star } from 'lucide-react';

export interface FilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedServiceType: ServiceTypeFilter;
  onServiceTypeChange: (type: ServiceTypeFilter) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  priceRange?: [number, number];
  setPriceRange?: (value: [number, number]) => void;
  verifiedOnly?: boolean;
  setVerifiedOnly?: (value: boolean) => void;
  availableNow?: boolean;
  setAvailableNow?: (value: boolean) => void;
  ratingMin?: number;
  setRatingMin?: (value: number) => void;
  ageRange?: [number, number];
  setAgeRange?: (value: [number, number]) => void;
  selectedGenders?: string[];
  toggleGender?: (gender: string) => void;
  selectedOrientations?: string[];
  toggleOrientation?: (orientation: string) => void;
  selectedServices?: string[];
  toggleService?: (service: string) => void;
  services?: string[];
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  location?: string;
  setLocation?: (location: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open,
  onOpenChange,
  selectedServiceType,
  onServiceTypeChange,
  onApplyFilters,
  onResetFilters,
  priceRange = [0, 500],
  setPriceRange,
  verifiedOnly = false,
  setVerifiedOnly,
  availableNow = false,
  setAvailableNow,
  ratingMin = 0,
  setRatingMin,
  ageRange = [21, 50],
  setAgeRange,
  selectedGenders = [],
  toggleGender,
  selectedOrientations = [],
  toggleOrientation,
  selectedServices = [],
  toggleService,
  services = [],
  searchQuery = '',
  setSearchQuery,
  location = '',
  setLocation
}) => {
  // Gender options
  const genderOptions = [
    { id: 'female', label: 'Female' },
    { id: 'male', label: 'Male' },
    { id: 'transgender', label: 'Transgender' },
    { id: 'non-binary', label: 'Non-binary' }
  ];

  // Orientation options
  const orientationOptions = [
    { id: 'straight', label: 'Straight' },
    { id: 'gay', label: 'Gay' },
    { id: 'lesbian', label: 'Lesbian' },
    { id: 'bisexual', label: 'Bisexual' },
    { id: 'pansexual', label: 'Pansexual' }
  ];

  // Format price for display
  const formatPrice = (price: number) => `$${price}`;

  return (
    <div className="bg-card rounded-lg shadow-sm p-4 border border-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onResetFilters}>
          Reset
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Search and Location */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search escorts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery?.(e.target.value)}
              className="pl-8"
            />
          </div>
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation?.(e.target.value)}
          />
        </div>
        
        {/* Service type filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Service Type</h4>
          <div className="flex flex-wrap gap-2">
            {(['any', 'in-person', 'virtual', 'both', 'massage', 'dinner'] as ServiceTypeFilter[]).map(type => (
              <Button 
                key={type}
                size="sm"
                variant={selectedServiceType === type ? "default" : "outline"}
                onClick={() => onServiceTypeChange(type)}
              >
                {type === 'any' ? 'All Types' : 
                 type === 'in-person' ? 'In Person' :
                 type === 'virtual' ? 'Virtual' :
                 type === 'both' ? 'Both' :
                 type === 'massage' ? 'Massage' : 'Dinner Date'}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium">Price Range</h4>
            <span className="text-sm text-muted-foreground">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          </div>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={(value) => setPriceRange?.(value as [number, number])}
          />
        </div>
        
        {/* Age Range */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium">Age Range</h4>
            <span className="text-sm text-muted-foreground">
              {ageRange[0]} - {ageRange[1]} years
            </span>
          </div>
          <Slider
            defaultValue={ageRange}
            min={18}
            max={65}
            step={1}
            value={ageRange}
            onValueChange={(value) => setAgeRange?.(value as [number, number])}
          />
        </div>
        
        {/* Rating */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium">Minimum Rating</h4>
            <span className="text-sm text-muted-foreground flex items-center">
              {ratingMin} <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
            </span>
          </div>
          <Slider
            defaultValue={[ratingMin]}
            min={0}
            max={5}
            step={0.5}
            value={[ratingMin]}
            onValueChange={(value) => setRatingMin?.(value[0])}
          />
        </div>
        
        {/* Toggle Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="verified-only" className="cursor-pointer">Verified Only</Label>
            <Switch
              id="verified-only"
              checked={verifiedOnly}
              onCheckedChange={setVerifiedOnly}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="available-now" className="cursor-pointer">Available Now</Label>
            <Switch
              id="available-now"
              checked={availableNow}
              onCheckedChange={setAvailableNow}
            />
          </div>
        </div>
        
        {/* Gender Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Gender</h4>
          <div className="grid grid-cols-2 gap-2">
            {genderOptions.map((gender) => (
              <div key={gender.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender.id}`}
                  checked={selectedGenders.includes(gender.id)}
                  onCheckedChange={() => toggleGender?.(gender.id)}
                />
                <Label htmlFor={`gender-${gender.id}`} className="cursor-pointer">
                  {gender.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Orientation Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Orientation</h4>
          <div className="grid grid-cols-2 gap-2">
            {orientationOptions.map((orientation) => (
              <div key={orientation.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`orientation-${orientation.id}`}
                  checked={selectedOrientations.includes(orientation.id)}
                  onCheckedChange={() => toggleOrientation?.(orientation.id)}
                />
                <Label htmlFor={`orientation-${orientation.id}`} className="cursor-pointer">
                  {orientation.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Services Filter */}
        {services.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Services</h4>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <Badge
                    key={service}
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleService?.(service)}
                  >
                    {service}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <Button onClick={onApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
