
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UberPersonaFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  types: Record<string, boolean>;
  features: Record<string, boolean>;
  availability: 'all' | 'online' | 'offline';
  verification: boolean;
  searchQuery: string;
}

const UberPersonaFilters: React.FC<UberPersonaFiltersProps> = ({ 
  onFilterChange,
  className 
}) => {
  const [filters, setFilters] = useState<FilterState>({
    types: {
      escort: false,
      creator: false,
      livecam: false,
      ai: false
    },
    features: {
      hasBooking: false,
      hasChat: false,
      hasPhotos: false,
      hasVideos: false,
      hasLiveStream: false
    },
    availability: 'all',
    verification: false,
    searchQuery: ''
  });
  
  const handleTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        types: {
          ...prev.types,
          [type]: checked
        }
      };
      
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };
  
  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        features: {
          ...prev.features,
          [feature]: checked
        }
      };
      
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        searchQuery: e.target.value
      };
      
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };
  
  const handleVerificationChange = (checked: boolean) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        verification: checked
      };
      
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };
  
  const handleReset = () => {
    const resetFilters: FilterState = {
      types: {
        escort: false,
        creator: false,
        livecam: false,
        ai: false
      },
      features: {
        hasBooking: false,
        hasChat: false,
        hasPhotos: false,
        hasVideos: false,
        hasLiveStream: false
      },
      availability: 'all',
      verification: false,
      searchQuery: ''
    };
    
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };
  
  // Count active filters for badge display
  const activeFilterCount = 
    Object.values(filters.types).filter(Boolean).length +
    Object.values(filters.features).filter(Boolean).length +
    (filters.verification ? 1 : 0) +
    (filters.availability !== 'all' ? 1 : 0);
  
  return (
    <div className={`${className} space-y-4`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by name or location..."
          value={filters.searchQuery}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs flex items-center gap-1 px-2"
            onClick={handleReset}
          >
            <X className="h-3 w-3" />
            Reset
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" className="space-y-2">
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm py-2">Persona Type</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {Object.entries({
              escort: "Escorts",
              creator: "Content Creators",
              livecam: "Live Performers",
              ai: "AI Companions"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox 
                  id={`type-${key}`} 
                  checked={filters.types[key]}
                  onCheckedChange={(checked) => 
                    handleTypeChange(key, checked === true)
                  }
                />
                <Label htmlFor={`type-${key}`} className="text-sm">{label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="features">
          <AccordionTrigger className="text-sm py-2">Features</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {Object.entries({
              hasBooking: "Booking Available",
              hasChat: "Chat Enabled",
              hasPhotos: "Photo Gallery",
              hasVideos: "Video Content",
              hasLiveStream: "Live Streaming"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox 
                  id={`feature-${key}`} 
                  checked={filters.features[key]}
                  onCheckedChange={(checked) => 
                    handleFeatureChange(key, checked === true)
                  }
                />
                <Label htmlFor={`feature-${key}`} className="text-sm">{label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="verification">
          <AccordionTrigger className="text-sm py-2">Verification</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verification" 
                checked={filters.verification}
                onCheckedChange={(checked) => 
                  handleVerificationChange(checked === true)
                }
              />
              <Label htmlFor="verification" className="text-sm">
                Verified Profiles Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UberPersonaFilters;
