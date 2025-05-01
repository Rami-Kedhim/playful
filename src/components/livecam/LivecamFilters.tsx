
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface LivecamFilters {
  status: 'all' | 'live' | 'offline';
  categories: string[];
  gender: string;
  region: string;
  minViewers: number;
  sortBy: string;
}

interface LivecamFiltersProps {
  filters: LivecamFilters;
  onFiltersChange: (filters: Partial<LivecamFilters>) => void;
  onReset: () => void;
}

const LivecamFilters: React.FC<LivecamFiltersProps> = ({ 
  filters, 
  onFiltersChange,
  onReset
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.categories);
  
  const categories = [
    'Roleplay', 'Gaming', 'Dance', 'Music', 'Fitness', 'Cooking',
    'Beauty', 'ASMR', 'Education', 'Adult', 'Chatting', 'Travel'
  ];

  const handleCategoryToggle = (category: string) => {
    let newCategories: string[];
    
    if (selectedCategories.includes(category)) {
      newCategories = selectedCategories.filter(c => c !== category);
    } else {
      newCategories = [...selectedCategories, category];
    }
    
    setSelectedCategories(newCategories);
    onFiltersChange({ categories: newCategories });
  };

  const handleRemoveCategory = (category: string) => {
    const newCategories = selectedCategories.filter(c => c !== category);
    setSelectedCategories(newCategories);
    onFiltersChange({ categories: newCategories });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div>Filters</div>
          <button 
            onClick={onReset}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Reset All
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <ToggleGroup 
            type="single" 
            value={filters.status}
            onValueChange={(val) => val && onFiltersChange({ status: val as 'all' | 'live' | 'offline' })}
            className="justify-start"
          >
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="live">Live</ToggleGroupItem>
            <ToggleGroupItem value="offline">Offline</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>
          <Select 
            value={filters.gender} 
            onValueChange={(val) => onFiltersChange({ gender: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="couple">Couple</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Region</label>
          <Select 
            value={filters.region} 
            onValueChange={(val) => onFiltersChange({ region: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select 
            value={filters.sortBy} 
            onValueChange={(val) => onFiltersChange({ sortBy: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="new">Newest</SelectItem>
              <SelectItem value="viewers-high">Most Viewers</SelectItem>
              <SelectItem value="viewers-low">Fewest Viewers</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {selectedCategories.length > 0 && (
            <div className="pt-2">
              <label className="text-sm text-muted-foreground">Selected:</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleRemoveCategory(category)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivecamFilters;
