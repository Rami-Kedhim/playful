
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface FiltersProps {
  filters: {
    query?: string;
    location?: string;
    types?: string[];
    isVerified?: boolean;
    isOnline?: boolean;
    tags?: string[];
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const UberPersonaFilters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onReset
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    onFilterChange({ ...filters, [name]: checked });
  };

  const handleTypeChange = (type: string) => (checked: boolean) => {
    const currentTypes = filters.types || [];
    const newTypes = checked 
      ? [...currentTypes, type] 
      : currentTypes.filter(t => t !== type);
    
    onFilterChange({ ...filters, types: newTypes });
  };

  return (
    <div className="space-y-6 p-4 bg-gray-900/30 rounded-lg border border-gray-800/50">
      <div className="space-y-4">
        <h3 className="font-medium">Search & Filter</h3>
        
        <div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              name="query"
              placeholder="Search..."
              className="pl-9"
              value={filters.query || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="location" className="text-sm">Location</Label>
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="Any location"
            value={filters.location || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Type</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-escort"
                checked={filters.types?.includes('escort') || false}
                onCheckedChange={handleTypeChange('escort')}
              />
              <Label htmlFor="type-escort" className="text-sm font-normal">Escort</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-creator"
                checked={filters.types?.includes('creator') || false}
                onCheckedChange={handleTypeChange('creator')}
              />
              <Label htmlFor="type-creator" className="text-sm font-normal">Creator</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-livecam"
                checked={filters.types?.includes('livecam') || false}
                onCheckedChange={handleTypeChange('livecam')}
              />
              <Label htmlFor="type-livecam" className="text-sm font-normal">LiveCam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-ai"
                checked={filters.types?.includes('ai') || false}
                onCheckedChange={handleTypeChange('ai')}
              />
              <Label htmlFor="type-ai" className="text-sm font-normal">AI</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified"
                checked={filters.isVerified || false}
                onCheckedChange={handleCheckboxChange('isVerified')}
              />
              <Label htmlFor="verified" className="text-sm font-normal">Verified only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="online"
                checked={filters.isOnline || false}
                onCheckedChange={handleCheckboxChange('isOnline')}
              />
              <Label htmlFor="online" className="text-sm font-normal">Online now</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
        <Button size="sm">
          <Search className="h-4 w-4 mr-1" />
          Apply
        </Button>
      </div>
    </div>
  );
};

export default UberPersonaFilters;
