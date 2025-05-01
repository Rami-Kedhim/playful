
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface FilterOption {
  id: string;
  name: string;
}

interface LivecamFiltersProps {
  filters: {
    categories: string[];
    tags: string[];
    priceRange: number[];
    onlineOnly: boolean;
  };
  onChange: (filters: any) => void;
}

const LivecamFilters: React.FC<LivecamFiltersProps> = ({ filters, onChange }) => {
  const categories: FilterOption[] = [
    { id: 'games', name: 'Games' },
    { id: 'music', name: 'Music' },
    { id: 'chat', name: 'Just Chatting' },
    { id: 'dance', name: 'Dance' },
    { id: 'creative', name: 'Creative' },
  ];
  
  const tags: FilterOption[] = [
    { id: 'trending', name: 'Trending' },
    { id: 'new', name: 'New' },
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'interactive', name: 'Interactive' },
  ];
  
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
      
    onChange({ categories: newCategories });
  };
  
  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
      
    onChange({ tags: newTags });
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    onChange({ priceRange: values });
  };
  
  const handleOnlineOnlyToggle = (checked: boolean) => {
    onChange({ onlineOnly: checked });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <Label className="text-base">Tags</Label>
        <div className="space-y-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag.id}`}
                checked={filters.tags.includes(tag.id)}
                onCheckedChange={() => handleTagToggle(tag.id)}
              />
              <Label htmlFor={`tag-${tag.id}`} className="cursor-pointer">
                {tag.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="text-base">Price Range</Label>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0]} UBX</span>
            <span>{filters.priceRange[1]} UBX</span>
          </div>
          <Slider
            className="mt-2"
            min={0}
            max={500}
            step={10}
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="online-only"
          checked={filters.onlineOnly}
          onCheckedChange={handleOnlineOnlyToggle}
        />
        <Label htmlFor="online-only">Online only</Label>
      </div>
    </div>
  );
};

export default LivecamFilters;
