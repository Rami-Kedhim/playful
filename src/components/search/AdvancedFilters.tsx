
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

export interface FilterValues {
  location: string;
  minAge: number;
  maxAge: number;
  minPrice: number;
  maxPrice: number;
  tags: string[];
}

interface AdvancedFiltersProps {
  filters: FilterValues;
  handleFilterChange: (key: string, value: any) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  visible: boolean;
}

const AdvancedFilters = ({
  filters,
  handleFilterChange,
  resetFilters,
  applyFilters,
  visible
}: AdvancedFiltersProps) => {
  const [activeTab, setActiveTab] = useState("location");

  if (!visible) return null;

  const availableTags = ['GFE', 'Massage', 'Dinner Date', 'Role Play', 'Fetish', 'Couples', 'Travel', 'Overnight', 'Parties'];
  
  return (
    <Card className="mt-4 mb-6">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="age">Age</TabsTrigger>
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="location" className="pt-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input 
                placeholder="Enter city name" 
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="age" className="pt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Min Age: {filters.minAge}</Label>
                  <Label>Max Age: {filters.maxAge}</Label>
                </div>
                <Slider 
                  value={[filters.minAge, filters.maxAge]}
                  max={60}
                  min={18}
                  step={1}
                  onValueChange={(value) => {
                    handleFilterChange('minAge', value[0]);
                    handleFilterChange('maxAge', value[1]);
                  }}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="price" className="pt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Min Price: ${filters.minPrice}</Label>
                  <Label>Max Price: ${filters.maxPrice}</Label>
                </div>
                <Slider 
                  value={[filters.minPrice, filters.maxPrice]}
                  max={2000}
                  min={0}
                  step={50}
                  onValueChange={(value) => {
                    handleFilterChange('minPrice', value[0]);
                    handleFilterChange('maxPrice', value[1]);
                  }}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableTags.map(tag => (
                <Button
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  onClick={() => {
                    const newTags = filters.tags.includes(tag) 
                      ? filters.tags.filter(t => t !== tag)
                      : [...filters.tags, tag];
                    handleFilterChange('tags', newTags);
                  }}
                  className="h-auto py-1.5"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </CardFooter>
    </Card>
  );
};

export default AdvancedFilters;
