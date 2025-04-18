
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useEnhancedEscortFilters } from '@/hooks/useEnhancedEscortFilters';
import { EnhancedEscortFilters as EnhancedEscortFiltersType } from '@/types/escortTypes';

const EnhancedEscortFilters: React.FC = () => {
  const {
    filters,
    updateFilters,
    resetFilters,
    toggleFilterValue
  } = useEnhancedEscortFilters();
  
  const handlePriceChange = (values: number[]) => {
    updateFilters({ price: [values[0], values[1]] });
  };
  
  const handleAgeChange = (values: number[]) => {
    updateFilters({ age: [values[0], values[1]] });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Type */}
        <div>
          <Label>Service Type</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['massage', 'companionship', 'roleplay', 'travel'].map((type) => (
              <Badge
                key={type}
                variant={filters.serviceType.includes(type) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleFilterValue('serviceType', type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div>
          <Label>Price Range: ${filters.price[0]} - ${filters.price[1]}</Label>
          <Slider
            value={[filters.price[0], filters.price[1]]}
            min={0}
            max={1000}
            step={50}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
        </div>
        
        {/* Age Range */}
        <div>
          <Label>Age Range: {filters.age[0]} - {filters.age[1]}</Label>
          <Slider
            value={[filters.age[0], filters.age[1]]}
            min={18}
            max={60}
            step={1}
            onValueChange={handleAgeChange}
            className="mt-2"
          />
        </div>
        
        {/* Verified Only */}
        <div className="flex items-center justify-between">
          <Label>Verified Profiles Only</Label>
          <Switch
            checked={filters.verified}
            onCheckedChange={(checked) => updateFilters({ verified: checked })}
          />
        </div>
        
        {/* Available Now */}
        <div className="flex items-center justify-between">
          <Label>Available Now</Label>
          <Switch
            checked={filters.availableNow}
            onCheckedChange={(checked) => updateFilters({ availableNow: checked })}
          />
        </div>
        
        {/* Reset button */}
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedEscortFilters;
