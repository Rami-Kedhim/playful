import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, X, Sliders, Users, User, Languages, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';

interface EnhancedEscortFiltersProps {
  filters: {
    location: string;
    serviceTypes: string[];
    priceRange: [number, number];
    gender: string[];
    orientation: string[];
    ageRange: [number, number];
    rating: number;
    verified: boolean;
    availableNow: boolean;
    escortType: "verified" | "ai" | "provisional" | "all";
    language: string[];
    height: [number, number];
    weight: [number, number];
    hairColor: string[];
    eyeColor: string[];
    ethnicity: string[];
    bodyType: string[];
    availability: {
      days: string[];
      hours: string[];
    };
  };
  onUpdate: (filters: Partial<EnhancedEscortFiltersProps['filters']>) => void;
  onApply: () => void;
  onClear: () => void;
}

const EnhancedEscortFilters: React.FC<EnhancedEscortFiltersProps> = ({ 
  filters, 
  onUpdate, 
  onApply, 
  onClear 
}) => {
  const [activeTab, setActiveTab] = useState('basic');

  const commonServices = [
    { id: 'gfe', label: 'GFE' },
    { id: 'massage', label: 'Massage' },
    { id: 'overnight', label: 'Overnight' },
    { id: 'dinner-date', label: 'Dinner Date' },
    { id: 'travel', label: 'Travel Companion' },
    { id: 'fetish', label: 'Fetish' },
    { id: 'bdsm', label: 'BDSM' },
    { id: 'roleplay', label: 'Role Play' }
  ];

  const genderOptions = [
    { id: 'female', label: 'Female' },
    { id: 'male', label: 'Male' },
    { id: 'transgender', label: 'Transgender' },
    { id: 'non-binary', label: 'Non-binary' }
  ];

  const orientationOptions = [
    { id: 'straight', label: 'Straight' },
    { id: 'lesbian', label: 'Lesbian' },
    { id: 'gay', label: 'Gay' },
    { id: 'bisexual', label: 'Bisexual' },
    { id: 'pansexual', label: 'Pansexual' }
  ];

  const ethnicityOptions = [
    { id: 'asian', label: 'Asian' },
    { id: 'black', label: 'Black' },
    { id: 'hispanic', label: 'Hispanic/Latin' },
    { id: 'middle-eastern', label: 'Middle Eastern' },
    { id: 'white', label: 'White/Caucasian' },
    { id: 'mixed', label: 'Mixed' },
    { id: 'other', label: 'Other' }
  ];

  const hairColorOptions = [
    { id: 'black', label: 'Black' },
    { id: 'blonde', label: 'Blonde' },
    { id: 'brown', label: 'Brown' },
    { id: 'red', label: 'Red' },
    { id: 'grey', label: 'Grey' },
    { id: 'colorful', label: 'Colorful' }
  ];

  const eyeColorOptions = [
    { id: 'blue', label: 'Blue' },
    { id: 'brown', label: 'Brown' },
    { id: 'green', label: 'Green' },
    { id: 'hazel', label: 'Hazel' },
    { id: 'grey', label: 'Grey' }
  ];

  const bodyTypeOptions = [
    { id: 'slim', label: 'Slim' },
    { id: 'athletic', label: 'Athletic' },
    { id: 'average', label: 'Average' },
    { id: 'curvy', label: 'Curvy' },
    { id: 'plus-size', label: 'Plus Size' }
  ];

  const languageOptions = [
    { id: 'english', label: 'English' },
    { id: 'spanish', label: 'Spanish' },
    { id: 'french', label: 'French' },
    { id: 'german', label: 'German' },
    { id: 'italian', label: 'Italian' },
    { id: 'russian', label: 'Russian' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'japanese', label: 'Japanese' },
    { id: 'portuguese', label: 'Portuguese' },
    { id: 'arabic', label: 'Arabic' }
  ];

  const dayOptions = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  const hourOptions = [
    { id: 'morning', label: 'Morning (6AM-12PM)' },
    { id: 'afternoon', label: 'Afternoon (12PM-6PM)' },
    { id: 'evening', label: 'Evening (6PM-12AM)' },
    { id: 'night', label: 'Night (12AM-6AM)' }
  ];

  const handleServiceToggle = (service: string) => {
    const updatedServices = filters.serviceTypes.includes(service)
      ? filters.serviceTypes.filter(s => s !== service)
      : [...filters.serviceTypes, service];
      
    onUpdate({ serviceTypes: updatedServices });
  };
  
  const handleFilterToggle = <T extends keyof EnhancedEscortFiltersProps['filters']>(
    filterType: T,
    value: string
  ) => {
    const currentValues = filters[filterType] as string[];
    const updated = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onUpdate({ [filterType]: updated } as Partial<EnhancedEscortFiltersProps['filters']>);
  };

  const handlePriceRangeChange = (values: number[]) => {
    onUpdate({ priceRange: [values[0], values[1]] as [number, number] });
  };

  const handleHeightRangeChange = (values: number[]) => {
    onUpdate({ height: [values[0], values[1]] as [number, number] });
  };

  const handleWeightRangeChange = (values: number[]) => {
    onUpdate({ weight: [values[0], values[1]] as [number, number] });
  };

  const handleAgeRangeChange = (values: number[]) => {
    onUpdate({ ageRange: [values[0], values[1]] as [number, number] });
  };

  const handleAvailabilityToggle = (type: 'days' | 'hours', value: string) => {
    const current = filters.availability[type];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onUpdate({ 
      availability: {
        ...filters.availability,
        [type]: updated
      }
    });
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          className="h-8 text-xs flex items-center"
        >
          <X className="h-3 w-3 mr-1" />
          Clear All
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          {/* Basic Filters Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="location" className="text-sm">Location</Label>
              </div>
              <Input
                id="location"
                placeholder="City or area..."
                value={filters.location}
                onChange={(e) => onUpdate({ location: e.target.value })}
                className="h-8"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Price Range (per hour)</Label>
              </div>
              <div className="pt-2 px-1">
                <Slider
                  defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                  min={0}
                  max={1000}
                  step={50}
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
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Age Range</Label>
              </div>
              <div className="pt-2 px-1">
                <Slider
                  defaultValue={[filters.ageRange[0], filters.ageRange[1]]}
                  min={18}
                  max={60}
                  step={1}
                  value={[filters.ageRange[0], filters.ageRange[1]]}
                  onValueChange={handleAgeRangeChange}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{filters.ageRange[0]} years</span>
                  <span>{filters.ageRange[1]} years</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="verified"
                  checked={filters.verified}
                  onCheckedChange={(checked) => onUpdate({ verified: !!checked })}
                />
                <Label htmlFor="verified" className="text-sm font-normal">
                  Verified Only
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="availableNow"
                  checked={filters.availableNow}
                  onCheckedChange={(checked) => onUpdate({ availableNow: !!checked })}
                />
                <Label htmlFor="availableNow" className="text-sm font-normal">
                  Available Now
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Gender</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {genderOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gender-${option.id}`}
                      checked={filters.gender.includes(option.id)}
                      onCheckedChange={() => handleFilterToggle('gender', option.id)}
                    />
                    <Label htmlFor={`gender-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Sexual Orientation</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {orientationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`orientation-${option.id}`}
                      checked={filters.orientation.includes(option.id)}
                      onCheckedChange={() => handleFilterToggle('orientation', option.id)}
                    />
                    <Label htmlFor={`orientation-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Physical Attributes Tab */}
          <TabsContent value="physical" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Height Range (cm)</Label>
              </div>
              <div className="pt-2 px-1">
                <Slider
                  defaultValue={[filters.height[0], filters.height[1]]}
                  min={140}
                  max={210}
                  step={1}
                  value={[filters.height[0], filters.height[1]]}
                  onValueChange={handleHeightRangeChange}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{filters.height[0]} cm</span>
                  <span>{filters.height[1]} cm</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Weight Range (kg)</Label>
              </div>
              <div className="pt-2 px-1">
                <Slider
                  defaultValue={[filters.weight[0], filters.weight[1]]}
                  min={40}
                  max={140}
                  step={1}
                  value={[filters.weight[0], filters.weight[1]]}
                  onValueChange={handleWeightRangeChange}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{filters.weight[0]} kg</span>
                  <span>{filters.weight[1]} kg</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Hair Color</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {hairColorOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`hair-${option.id}`}
                      checked={filters.hairColor.includes(option.id)}
                      onCheckedChange={() => handleFilterToggle('hairColor', option.id)}
                    />
                    <Label htmlFor={`hair-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Eye Color</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {eyeColorOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`eye-${option.id}`}
                      checked={filters.eyeColor.includes(option.id)}
                      onCheckedChange={() => handleFilterToggle('eyeColor', option.id)}
                    />
                    <Label htmlFor={`eye-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Ethnicity</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ethnicityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ethnicity-${option.id}`}
                      checked={filters.ethnicity.includes(option.id)}
                      onCheckedChange={() => handleFilterToggle('ethnicity', option.id)}
                    />
                    <Label htmlFor={`ethnicity-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Body Type</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {bodyTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`body-${option.id}`}
                      checked={filters.bodyType.includes(option.id)}
                      onCheckedChange={() => handleFilterToggle('bodyType', option.id)}
                    />
                    <Label htmlFor={`body-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Service Type</Label>
              </div>
              <RadioGroup
                value={filters.escortType}
                onValueChange={(value) => onUpdate({ escortType: value as EnhancedEscortFiltersProps['filters']['escortType'] })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-types" />
                  <Label htmlFor="all-types" className="text-sm font-normal">All Types</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="verified" id="verified-escorts" />
                  <Label htmlFor="verified-escorts" className="text-sm font-normal">Verified Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ai" id="ai-escorts" />
                  <Label htmlFor="ai-escorts" className="text-sm font-normal">AI Models</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Services</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {commonServices.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={filters.serviceTypes.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                    />
                    <Label htmlFor={service.id} className="text-sm font-normal">
                      {service.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Languages</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lang-${language.id}`}
                      checked={filters.language.includes(language.id)}
                      onCheckedChange={() => handleFilterToggle('language', language.id)}
                    />
                    <Label htmlFor={`lang-${language.id}`} className="text-sm font-normal">
                      {language.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Available Days</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {dayOptions.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${day.id}`}
                      checked={filters.availability.days.includes(day.id)}
                      onCheckedChange={() => handleAvailabilityToggle('days', day.id)}
                    />
                    <Label htmlFor={`day-${day.id}`} className="text-sm font-normal">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Available Hours</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {hourOptions.map((hour) => (
                  <div key={hour.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`hour-${hour.id}`}
                      checked={filters.availability.hours.includes(hour.id)}
                      onCheckedChange={() => handleAvailabilityToggle('hours', hour.id)}
                    />
                    <Label htmlFor={`hour-${hour.id}`} className="text-sm font-normal">
                      {hour.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-4 flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onClear}
          >
            Reset
          </Button>
          <Button 
            onClick={onApply}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedEscortFilters;
