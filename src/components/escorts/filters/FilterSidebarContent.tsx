
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ServiceTypeBadgeLabel, ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import { MultiCheckboxFilter } from './MultiCheckboxFilter';
import { Option } from '@/types/core-systems';

export interface FilterSidebarContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: number[]) => void;
  ageRange: [number, number];
  setAgeRange: (range: number[]) => void;
  gender: string[];
  setGender: (gender: string[]) => void;
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  selectedBodyTypes: string[];
  setSelectedBodyTypes: (types: string[]) => void;
  selectedEthnicities: string[];
  setSelectedEthnicities: (ethnicities: string[]) => void;
  selectedHairColors: string[];
  setSelectedHairColors: (colors: string[]) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  ratingMin?: number;
  setRatingMin?: (rating: number) => void;
}

export const FilterSidebarContent: React.FC<FilterSidebarContentProps> = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  priceRange,
  setPriceRange,
  ageRange,
  setAgeRange,
  gender,
  setGender,
  serviceTypeFilter,
  setServiceTypeFilter,
  selectedBodyTypes,
  setSelectedBodyTypes,
  selectedEthnicities,
  setSelectedEthnicities,
  selectedHairColors,
  setSelectedHairColors,
  selectedServices,
  setSelectedServices,
  verifiedOnly,
  setVerifiedOnly,
  availableNow,
  setAvailableNow,
  ratingMin = 0,
  setRatingMin = () => {}
}) => {
  // Gender options
  const genderOptions: Option[] = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'transgender', label: 'Transgender' },
    { value: 'non-binary', label: 'Non-binary' }
  ];

  // Body type options
  const bodyTypeOptions: Option[] = [
    { value: 'slim', label: 'Slim' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'average', label: 'Average' },
    { value: 'curvy', label: 'Curvy' },
    { value: 'muscular', label: 'Muscular' },
    { value: 'plus-size', label: 'Plus Size' }
  ];

  // Ethnicity options
  const ethnicityOptions: Option[] = [
    { value: 'asian', label: 'Asian' },
    { value: 'black', label: 'Black' },
    { value: 'caucasian', label: 'Caucasian' },
    { value: 'hispanic', label: 'Hispanic' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'mixed', label: 'Mixed' },
    { value: 'other', label: 'Other' }
  ];

  // Hair color options
  const hairColorOptions: Option[] = [
    { value: 'black', label: 'Black' },
    { value: 'blonde', label: 'Blonde' },
    { value: 'brown', label: 'Brown' },
    { value: 'red', label: 'Red' },
    { value: 'grey', label: 'Grey/Silver' },
    { value: 'other', label: 'Other' }
  ];

  // Services options
  const serviceOptions: Option[] = [
    { value: 'massage', label: 'Massage' },
    { value: 'companionship', label: 'Companionship' },
    { value: 'dinner-date', label: 'Dinner Date' },
    { value: 'overnight', label: 'Overnight' },
    { value: 'travel', label: 'Travel Companion' },
    { value: 'roleplay', label: 'Roleplay' },
    { value: 'fetish', label: 'Fetish' }
  ];

  const handleGenderChange = (gender: string) => {
    if (gender === 'any') {
      setGender([]);
    } else {
      setGender(prev => 
        prev.includes(gender) 
          ? prev.filter(g => g !== gender) 
          : [...prev, gender]
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <Input
          type="text"
          placeholder="Search name or keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          type="text"
          placeholder="City, State or Region"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="service-type">
          <AccordionTrigger className="text-sm">Service Type</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              {(['in-person', 'virtual', 'both'] as ServiceTypeFilter[]).map((type) => (
                <Button 
                  key={type}
                  variant={serviceTypeFilter === type ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setServiceTypeFilter(type)}
                >
                  <ServiceTypeBadgeLabel type={type} color={serviceTypeFilter === type ? 'default' : 'outline'} />
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price-range">
          <AccordionTrigger className="text-sm">Price Range ($ per hour)</AccordionTrigger>
          <AccordionContent className="py-4">
            <div className="px-2">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="age-range">
          <AccordionTrigger className="text-sm">Age Range</AccordionTrigger>
          <AccordionContent className="py-4">
            <div className="px-2">
              <Slider
                value={[ageRange[0], ageRange[1]]}
                min={18}
                max={60}
                step={1}
                onValueChange={(value) => setAgeRange([value[0], value[1]])}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>{ageRange[0]}</span>
                <span>{ageRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender">
          <AccordionTrigger className="text-sm">Gender</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2">
              {genderOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`gender-${option.value}`} 
                    checked={gender.includes(option.value)} 
                    onCheckedChange={() => handleGenderChange(option.value)}
                  />
                  <Label htmlFor={`gender-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="verification-availability">
          <AccordionTrigger className="text-sm">Verification & Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="verified-only" 
                  checked={verifiedOnly}
                  onCheckedChange={() => setVerifiedOnly(!verifiedOnly)}
                />
                <Label htmlFor="verified-only">Verified Profiles Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="available-now" 
                  checked={availableNow}
                  onCheckedChange={() => setAvailableNow(!availableNow)}
                />
                <Label htmlFor="available-now">Available Now</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="minimum-rating">
          <AccordionTrigger className="text-sm">Minimum Rating</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 py-2">
              <Slider
                value={[ratingMin]}
                min={0}
                max={5}
                step={1}
                onValueChange={(value) => setRatingMin(value[0])}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>Any</span>
                <span>{ratingMin}+ Stars</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="advanced-filters">
          <AccordionTrigger className="text-sm">Advanced Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 py-2">
              <MultiCheckboxFilter
                title="Body Type"
                options={bodyTypeOptions}
                selectedValues={selectedBodyTypes}
                onChange={setSelectedBodyTypes}
              />
              
              <MultiCheckboxFilter
                title="Ethnicity"
                options={ethnicityOptions}
                selectedValues={selectedEthnicities}
                onChange={setSelectedEthnicities}
              />
              
              <MultiCheckboxFilter
                title="Hair Color"
                options={hairColorOptions}
                selectedValues={selectedHairColors}
                onChange={setSelectedHairColors}
              />
              
              <MultiCheckboxFilter
                title="Services Offered"
                options={serviceOptions}
                selectedValues={selectedServices}
                onChange={setSelectedServices}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebarContent;
