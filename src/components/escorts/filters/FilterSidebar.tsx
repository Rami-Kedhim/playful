
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterSidebarProps {
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
  filters: {
    availableOnly: boolean;
    verifiedOnly: boolean;
    priceRange: [number, number];
    gender: string[];
  };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, onReset, filters }) => {
  return (
    <Card className="sticky top-4">
      <CardContent className="p-4 space-y-6">
        <div>
          <h3 className="font-medium mb-3">Filters</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="available" 
                checked={filters.availableOnly} 
                onCheckedChange={(checked) => onFilterChange('availableOnly', !!checked)} 
              />
              <Label htmlFor="available">Available now</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified" 
                checked={filters.verifiedOnly}
                onCheckedChange={(checked) => onFilterChange('verifiedOnly', !!checked)}
              />
              <Label htmlFor="verified">Verified only</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Price Range</h4>
          <div>
            <Slider 
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]} 
              max={1000}
              step={50}
              onValueCommit={(value) => onFilterChange('priceRange', value)}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs">${filters.priceRange[0]}</span>
              <span className="text-xs">${filters.priceRange[1]}+</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Gender</h4>
          <div className="space-y-2">
            {['Female', 'Male', 'Non-binary', 'Trans'].map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox 
                  id={`gender-${gender.toLowerCase()}`} 
                  checked={filters.gender.includes(gender.toLowerCase())}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFilterChange('gender', [...filters.gender, gender.toLowerCase()]);
                    } else {
                      onFilterChange('gender', filters.gender.filter(g => g !== gender.toLowerCase()));
                    }
                  }}
                />
                <Label htmlFor={`gender-${gender.toLowerCase()}`}>{gender}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
