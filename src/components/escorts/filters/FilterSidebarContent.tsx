
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import ServiceTypeSelect from './ServiceTypeSelect';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Rating } from '@/components/ui/rating';
import { X } from 'lucide-react';

interface FilterSidebarContentProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (value: ServiceTypeFilter) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  location: string;
  setLocation: (location: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  ratingMin: number;
  setRatingMin: (rating: number) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onClose: () => void;
  onResetFilters: () => void;
}

const FilterSidebarContent: React.FC<FilterSidebarContentProps> = ({
  serviceTypeFilter,
  setServiceTypeFilter,
  verifiedOnly,
  setVerifiedOnly,
  availableNow,
  setAvailableNow,
  location,
  setLocation,
  searchQuery,
  setSearchQuery,
  ratingMin,
  setRatingMin,
  priceRange,
  setPriceRange,
  onClose,
  onResetFilters
}) => {
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="py-4 flex-1 overflow-y-auto">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name or keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-1"
            />
          </div>
          
          {/* Service Type */}
          <div>
            <ServiceTypeSelect
              value={serviceTypeFilter}
              onChange={setServiceTypeFilter}
              label="Service Type"
            />
          </div>
          
          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1"
            />
          </div>
          
          {/* Rating */}
          <div>
            <Label className="mb-2 block">Minimum Rating</Label>
            <div className="flex items-center gap-2">
              <Rating 
                value={ratingMin} 
                onChange={setRatingMin} 
                max={5} 
              />
              <span className="text-sm text-muted-foreground">{ratingMin}+ stars</span>
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between">
              <Label>Price Range</Label>
              <span className="text-sm text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[priceRange[0], priceRange[1]]}
              value={[priceRange[0], priceRange[1]]}
              min={0}
              max={1000}
              step={10}
              onValueChange={handlePriceRangeChange}
              className="mt-2"
            />
          </div>
          
          {/* Verification and Availability */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified" 
                checked={verifiedOnly}
                onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
              />
              <Label htmlFor="verified">Verified Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="available" 
                checked={availableNow}
                onCheckedChange={(checked) => setAvailableNow(!!checked)}
              />
              <Label htmlFor="available">Available Now</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t flex justify-between">
        <Button variant="outline" onClick={onResetFilters}>
          Reset Filters
        </Button>
        <Button onClick={onClose}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebarContent;
