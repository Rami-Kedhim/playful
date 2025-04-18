import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useEscortEnhancedFilters } from '@/hooks/useEscortEnhancedFilters';
import { ESCORT_SERVICE_TYPES } from '@/types/escortTypes';

const EnhancedEscortFilters: React.FC = () => {
  const {
    filters,
    updateFilters,
    resetFilters,
  } = useEscortEnhancedFilters();
  
  const handlePriceChange = (values: number[]) => {
    updateFilters({ price: [values[0], values[1]] as [number, number] });
  };
  
  const handleAgeChange = (values: number[]) => {
    updateFilters({ age: [values[0], values[1]] as [number, number] });
  };
  
  const toggleFilterValue = (key: keyof typeof filters, value: string) => {
    if (!Array.isArray(filters[key])) {
      return;
    }
    
    const currentValues = filters[key] as string[];
    const exists = currentValues.includes(value);
    
    updateFilters({
      [key]: exists 
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
    });
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
            {ESCORT_SERVICE_TYPES.map((type) => (
              <Badge
                key={type.value}
                variant={filters.serviceType?.includes(type.value) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleFilterValue('serviceType', type.value)}
              >
                {type.label}
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
            checked={!!filters.verified}
            onCheckedChange={(checked) => updateFilters({ verified: checked })}
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
