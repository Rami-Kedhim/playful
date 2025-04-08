
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  CheckSquare, 
  Star, 
  Clock, 
  Users, 
  Heart,
  Filter,
  Sliders,
  X,
  ChevronDown,
  ChevronUp,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEscortEnhancedFilters } from '@/hooks/useEscortEnhancedFilters';

const EnhancedEscortFilters = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');
  
  const {
    filters,
    isFiltering,
    updateFilters,
    resetFilters,
    applyFilters,
    toggleFilterValue,
    toggleAvailability,
    escorts
  } = useEscortEnhancedFilters();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handlePriceRangeChange = (values: number[]) => {
    updateFilters({ priceRange: [values[0], values[1]] });
  };
  
  const handleAgeRangeChange = (values: number[]) => {
    updateFilters({ ageRange: [values[0], values[1]] });
  };
  
  const handleHeightRangeChange = (values: number[]) => {
    updateFilters({ height: [values[0], values[1]] });
  };
  
  const handleWeightRangeChange = (values: number[]) => {
    updateFilters({ weight: [values[0], values[1]] });
  };
  
  const toggleVerified = () => {
    updateFilters({ verified: !filters.verified });
  };
  
  const toggleAvailableNow = () => {
    updateFilters({ availableNow: !filters.availableNow });
  };
  
  const toggleBoostSorting = () => {
    updateFilters({ useBoostSorting: !filters.useBoostSorting });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ location: e.target.value });
  };
  
  const handleSortByChange = (value: string) => {
    updateFilters({ sortBy: value });
  };
  
  const handleEscortTypeChange = (value: "verified" | "ai" | "provisional" | "all") => {
    updateFilters({ escortType: value });
  };
  
  const serviceOptions = [
    'GFE', 'Massage', 'Dinner Date', 'Overnight', 'Travel', 
    'BDSM', 'Role Play', 'Fetish', 'Couples'
  ];
  
  const genderOptions = ['female', 'male', 'transgender', 'non-binary'];
  const orientationOptions = ['straight', 'gay', 'lesbian', 'bisexual', 'pansexual'];
  const hairColors = ['blonde', 'brunette', 'black', 'red', 'other'];
  const eyeColors = ['blue', 'green', 'brown', 'hazel', 'other'];
  const ethnicities = ['caucasian', 'asian', 'black', 'hispanic', 'mixed', 'other'];
  const bodyTypes = ['slim', 'athletic', 'curvy', 'plus-size'];
  const availabilityDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const renderFilterCount = () => {
    let count = 0;
    
    if (filters.location) count++;
    if (filters.serviceTypes.length > 0) count += filters.serviceTypes.length;
    if (filters.gender.length > 0) count += filters.gender.length;
    if (filters.orientation.length > 0) count += filters.orientation.length;
    if (filters.verified) count++;
    if (filters.availableNow) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.ageRange[0] > 21 || filters.ageRange[1] < 50) count++;
    if (filters.rating > 0) count++;
    if (filters.escortType !== "all") count++;
    if (filters.language.length > 0) count += filters.language.length;
    if (filters.height[0] > 140 || filters.height[1] < 200) count++;
    if (filters.weight[0] > 40 || filters.weight[1] < 120) count++;
    if (filters.hairColor.length > 0) count += filters.hairColor.length;
    if (filters.eyeColor.length > 0) count += filters.eyeColor.length;
    if (filters.ethnicity.length > 0) count += filters.ethnicity.length;
    if (filters.bodyType.length > 0) count += filters.bodyType.length;
    if (filters.availability.days.length > 0) count++;
    
    return count;
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          <span>Filters</span>
          {renderFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {renderFilterCount()}
            </Badge>
          )}
        </Button>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="boost-toggle" className="text-sm cursor-pointer">
            Boosted first
          </Label>
          <Switch
            id="boost-toggle"
            checked={filters.useBoostSorting}
            onCheckedChange={toggleBoostSorting}
          />
        </div>
      </div>
      
      {filtersOpen && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Enhanced Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setFiltersOpen(false)}>
                <X size={18} />
              </Button>
            </div>
            
            {/* Basic Filters Section */}
            <div className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('basic')}
              >
                <h4 className="font-medium">Basic Filters</h4>
                {expandedSection === 'basic' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSection === 'basic' && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="location"
                        placeholder="Enter location" 
                        className="pl-10"
                        value={filters.location}
                        onChange={handleLocationChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={[filters.priceRange[0], filters.priceRange[1]]}
                      onValueChange={handlePriceRangeChange}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}</Label>
                    <Slider
                      min={21}
                      max={60}
                      step={1}
                      value={[filters.ageRange[0], filters.ageRange[1]]}
                      onValueChange={handleAgeRangeChange}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verified">Verified Only</Label>
                      <Switch 
                        id="verified" 
                        checked={filters.verified}
                        onCheckedChange={toggleVerified}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available">Available Now</Label>
                      <Switch 
                        id="available" 
                        checked={filters.availableNow}
                        onCheckedChange={toggleAvailableNow}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Profile Type</Label>
                    <ToggleGroup 
                      type="single" 
                      className="justify-between"
                      value={filters.escortType}
                      onValueChange={(value) => {
                        if (value) handleEscortTypeChange(value as any);
                      }}
                    >
                      <ToggleGroupItem value="all" className="flex-1">All</ToggleGroupItem>
                      <ToggleGroupItem value="verified" className="flex-1">Verified</ToggleGroupItem>
                      <ToggleGroupItem value="ai" className="flex-1">AI</ToggleGroupItem>
                      <ToggleGroupItem value="provisional" className="flex-1">New</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            {/* Physical Attributes Section */}
            <div className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('physical')}
              >
                <h4 className="font-medium">Physical Attributes</h4>
                {expandedSection === 'physical' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSection === 'physical' && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {genderOptions.map(gender => (
                        <Badge
                          key={gender}
                          variant={filters.gender.includes(gender) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilterValue('gender', gender)}
                        >
                          {gender}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Orientation</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {orientationOptions.map(orientation => (
                        <Badge
                          key={orientation}
                          variant={filters.orientation.includes(orientation) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilterValue('orientation', orientation)}
                        >
                          {orientation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Height (cm): {filters.height[0]} - {filters.height[1]} cm</Label>
                    <Slider
                      min={140}
                      max={200}
                      step={1}
                      value={[filters.height[0], filters.height[1]]}
                      onValueChange={handleHeightRangeChange}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Weight (kg): {filters.weight[0]} - {filters.weight[1]} kg</Label>
                    <Slider
                      min={40}
                      max={120}
                      step={1}
                      value={[filters.weight[0], filters.weight[1]]}
                      onValueChange={handleWeightRangeChange}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Hair Color</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {hairColors.map(color => (
                        <Badge
                          key={color}
                          variant={filters.hairColor.includes(color) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilterValue('hairColor', color)}
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Eye Color</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {eyeColors.map(color => (
                        <Badge
                          key={color}
                          variant={filters.eyeColor.includes(color) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilterValue('eyeColor', color)}
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Ethnicity</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {ethnicities.map(ethnicity => (
                        <Badge
                          key={ethnicity}
                          variant={filters.ethnicity.includes(ethnicity) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilterValue('ethnicity', ethnicity)}
                        >
                          {ethnicity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Body Type</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {bodyTypes.map(bodyType => (
                        <Badge
                          key={bodyType}
                          variant={filters.bodyType.includes(bodyType) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilterValue('bodyType', bodyType)}
                        >
                          {bodyType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            {/* Services Section */}
            <div className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('services')}
              >
                <h4 className="font-medium">Services</h4>
                {expandedSection === 'services' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSection === 'services' && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map(service => (
                      <Badge
                        key={service}
                        variant={filters.serviceTypes.includes(service) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilterValue('serviceTypes', service)}
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            {/* Availability Section */}
            <div className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('availability')}
              >
                <h4 className="font-medium">Availability</h4>
                {expandedSection === 'availability' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSection === 'availability' && (
                <div className="mt-4">
                  <Label className="mb-2 block">Days Available</Label>
                  <div className="flex flex-wrap gap-2">
                    {availabilityDays.map(day => (
                      <Badge
                        key={day}
                        variant={filters.availability.days.includes(day) ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => toggleAvailability('days', day)}
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <Button variant="outline" onClick={resetFilters}>
                Clear All
              </Button>
              
              <Button 
                onClick={applyFilters} 
                disabled={isFiltering}
                className="min-w-28"
              >
                {isFiltering ? 'Applying...' : 'Apply Filters'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedEscortFilters;
