
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LivecamFiltersProps {
  filters: {
    status: 'all' | 'live' | 'offline';
    categories: string[];
    gender: string;
    region: string;
    minViewers: number;
    sortBy: string;
  };
  onFilterChange: (filters: Partial<LivecamFiltersProps['filters']>) => void;
  onResetFilters: () => void;
}

const LivecamFilters: React.FC<LivecamFiltersProps> = ({ 
  filters,
  onFilterChange,
  onResetFilters
}) => {
  const categories = [
    { id: 'chat', label: 'Chat' },
    { id: 'dance', label: 'Dance' },
    { id: 'games', label: 'Games' },
    { id: 'music', label: 'Music' },
    { id: 'couples', label: 'Couples' },
    { id: 'roleplay', label: 'Roleplay' }
  ];
  
  const regions = [
    { value: 'US', label: 'United States' },
    { value: 'EU', label: 'Europe' },
    { value: 'LA', label: 'Latin America' },
    { value: 'AS', label: 'Asia' }
  ];
  
  const handleCategoryToggle = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
      
    onFilterChange({ categories: updatedCategories });
  };
  
  const handleMinViewersChange = (value: number) => {
    onFilterChange({ minViewers: value });
  };
  
  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.categories.length > 0 || 
    filters.gender || 
    filters.region ||
    filters.minViewers > 0;
  
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
              onClick={onResetFilters}
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
          <Label className="text-sm">Status</Label>
          <RadioGroup
            value={filters.status}
            onValueChange={(value) => onFilterChange({ status: value as 'all' | 'live' | 'offline' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-status" />
              <Label htmlFor="all-status" className="text-sm font-normal">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="live" id="live" />
              <Label htmlFor="live" className="text-sm font-normal">Live Now</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offline" id="offline" />
              <Label htmlFor="offline" className="text-sm font-normal">Offline</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Categories</Label>
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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="couple" id="couple" />
              <Label htmlFor="couple" className="text-sm font-normal">Couples</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Region</Label>
          <Select
            value={filters.region}
            onValueChange={(value) => onFilterChange({ region: value })}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Any region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any region</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Minimum Viewers</Label>
          <div className="flex items-center gap-3">
            <Slider
              min={0}
              max={1000}
              step={50}
              value={[filters.minViewers]}
              onValueChange={(values) => handleMinViewersChange(values[0])}
              className="flex-1"
            />
            <Input
              type="number"
              min={0}
              max={1000}
              step={50}
              value={filters.minViewers}
              onChange={(e) => handleMinViewersChange(Number(e.target.value))}
              className="w-16 h-8 text-center"
            />
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
              <SelectItem value="viewers">Most Viewers</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivecamFilters;
