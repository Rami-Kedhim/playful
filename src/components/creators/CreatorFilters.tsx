
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface CreatorFiltersProps {
  filters: {
    categories: string[];
    priceRange: [number, number];
    sortBy: string;
    rating: number;
    showAI: boolean;
  };
  onFilterChange: (filters: Partial<CreatorFiltersProps['filters']>) => void;
}

const CreatorFilters: React.FC<CreatorFiltersProps> = ({ filters, onFilterChange }) => {
  const categories = [
    { id: 'glamour', label: 'Glamour' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'travel', label: 'Travel' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'asmr', label: 'ASMR' },
    { id: 'cooking', label: 'Cooking' }
  ];
  
  const handleCategoryToggle = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
      
    onFilterChange({ categories: updatedCategories });
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    onFilterChange({ 
      priceRange: [values[0], values[1]]
    });
  };
  
  const handleClearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, 100],
      rating: 0,
      showAI: true
    });
  };
  
  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 100 ||
    filters.rating > 0 ||
    !filters.showAI;
  
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
          <Label className="text-sm">Content Categories</Label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label htmlFor={category.id} className="text-sm font-normal">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Subscription Price</Label>
          <div className="pt-2 px-1">
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              min={0}
              max={100}
              step={5}
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
              <SelectItem value="mostSubscribers">Most Subscribers</SelectItem>
              <SelectItem value="mostContent">Most Content</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Minimum Rating</Label>
          <div className="flex items-center pt-2">
            <Select
              value={filters.rating.toString()}
              onValueChange={(value) => onFilterChange({ rating: Number(value) })}
            >
              <SelectTrigger className="h-8 w-28">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center justify-between space-x-2 pt-2">
          <Label htmlFor="show-ai" className="text-sm">
            Show AI Creators
          </Label>
          <Switch
            id="show-ai"
            checked={filters.showAI}
            onCheckedChange={(checked) => onFilterChange({ showAI: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorFilters;
