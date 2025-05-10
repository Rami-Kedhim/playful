
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  applyFilters,
  clearFilters
}) => {
  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: value
    });
  };
  
  const handleCheckboxChange = (id: string, checked: boolean, filterType: string) => {
    setFilters({
      ...filters,
      [filterType]: {
        ...filters[filterType],
        [id]: checked
      }
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}+</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Services</h3>
          <div className="space-y-2">
            {Object.keys(filters.services || {}).map((service) => (
              <div className="flex items-center space-x-2" key={service}>
                <Checkbox 
                  id={`service-${service}`} 
                  checked={filters.services[service]}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(service, checked as boolean, 'services')
                  }
                />
                <Label htmlFor={`service-${service}`}>{service}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Gender</h3>
          <div className="space-y-2">
            {Object.keys(filters.gender || {}).map((gender) => (
              <div className="flex items-center space-x-2" key={gender}>
                <Checkbox 
                  id={`gender-${gender}`} 
                  checked={filters.gender[gender]}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(gender, checked as boolean, 'gender')
                  }
                />
                <Label htmlFor={`gender-${gender}`}>{gender}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={clearFilters} className="flex-1">
            Clear
          </Button>
          <Button size="sm" onClick={applyFilters} className="flex-1">
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
