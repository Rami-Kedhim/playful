
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1]
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Price Range</h4>
            <Slider 
              defaultValue={[filters.minPrice || 0, filters.maxPrice || 1000]} 
              min={0} 
              max={1000} 
              step={50}
              onValueChange={handlePriceChange}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${filters.minPrice || 0}</span>
              <span>${filters.maxPrice || 1000}+</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Service Type</h4>
            <div className="flex items-center space-x-2 mt-1">
              <Switch 
                id="inPersonFilter" 
                checked={filters.inPerson} 
                onCheckedChange={(value) => handleFilterChange('inPerson', value)}
              />
              <Label htmlFor="inPersonFilter">In-person</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="virtualFilter" 
                checked={filters.virtual} 
                onCheckedChange={(value) => handleFilterChange('virtual', value)}
              />
              <Label htmlFor="virtualFilter">Virtual</Label>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Verification</h4>
            <div className="flex items-center space-x-2">
              <Switch 
                id="verifiedFilter" 
                checked={filters.verified} 
                onCheckedChange={(value) => handleFilterChange('verified', value)}
              />
              <Label htmlFor="verifiedFilter">Verified only</Label>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Availability</h4>
            <div className="flex items-center space-x-2">
              <Switch 
                id="availableNowFilter" 
                checked={filters.availableNow} 
                onCheckedChange={(value) => handleFilterChange('availableNow', value)}
              />
              <Label htmlFor="availableNowFilter">Available now</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
