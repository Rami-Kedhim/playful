import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { useEscortFilter } from "@/hooks/useEscortFilter";
import { useServiceType } from '@/contexts/ServiceTypeContext';
import ServiceTypeBadgeLabel, { BadgeStyleProps } from './ServiceTypeBadgeLabel';

interface AppliedFiltersProps {
  className?: string;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({ className }) => {
  const {
    filters,
    updateFilters,
    clearFilters,
    resetToDefaults,
    defaultFilters
  } = useEscortFilter();
  
  const {
    selectedSpecializedTypes,
  } = useServiceType();
  
  const [localPriceRange, setLocalPriceRange] = useState<number[]>(filters.priceRange);
  const [localAgeRange, setLocalAgeRange] = useState<number[]>(filters.ageRange);
  const debouncedPriceRange = useDebounce(localPriceRange, 500);
  const debouncedAgeRange = useDebounce(localAgeRange, 500);
  
  useEffect(() => {
    updateFilters({ priceRange: debouncedPriceRange });
  }, [debouncedPriceRange, updateFilters]);
  
  useEffect(() => {
    updateFilters({ ageRange: debouncedAgeRange });
  }, [debouncedAgeRange, updateFilters]);
  
  const handleClearFilter = (filterKey: string, filterValue: any) => {
    let clearedFilters = { ...filters };
    
    if (filterKey === 'gender') {
      clearedFilters.gender = filters.gender.filter((gender: string) => gender !== filterValue);
      if (clearedFilters.gender.length === 0) {
        delete clearedFilters.gender;
      }
    } else if (filterKey === 'service') {
      clearedFilters.service = filters.service.filter((service: string) => service !== filterValue);
      if (clearedFilters.service.length === 0) {
        delete clearedFilters.service;
      }
    } else if (filterKey === 'language') {
      clearedFilters.language = filters.language.filter((language: string) => language !== filterValue);
      if (clearedFilters.language.length === 0) {
        delete clearedFilters.language;
      }
    } else if (filterKey === 'priceRange') {
      setLocalPriceRange(defaultFilters.priceRange);
      clearedFilters.priceRange = defaultFilters.priceRange;
    } else if (filterKey === 'ageRange') {
      setLocalAgeRange(defaultFilters.ageRange);
      clearedFilters.ageRange = defaultFilters.ageRange;
    } else if (filterKey === 'verified') {
      clearedFilters.verified = false;
    }
    
    updateFilters(clearedFilters);
  };
  
  const hasFiltersApplied = Object.keys(filters).length > 0;
  
  const genderBadgeStyle: BadgeStyleProps = {
    label: 'Gender',
    color: 'bg-indigo-100 text-indigo-800',
    colorDark: 'dark:bg-indigo-900 dark:text-indigo-200',
    icon: 'user'
  };
  
  const serviceBadgeStyle: BadgeStyleProps = {
    label: 'Service',
    color: 'bg-orange-100 text-orange-800',
    colorDark: 'dark:bg-orange-900 dark:text-orange-200',
    icon: 'star'
  };
  
  const languageBadgeStyle: BadgeStyleProps = {
    label: 'Language',
    color: 'bg-purple-100 text-purple-800',
    colorDark: 'dark:bg-purple-900 dark:text-purple-200',
    icon: 'message-square'
  };
  
  const priceRangeBadgeStyle: BadgeStyleProps = {
    label: 'Price Range',
    color: 'bg-green-100 text-green-800',
    colorDark: 'dark:bg-green-900 dark:text-green-200',
    icon: 'dollar-sign'
  };
  
  const ageRangeBadgeStyle: BadgeStyleProps = {
    label: 'Age Range',
    color: 'bg-teal-100 text-teal-800',
    colorDark: 'dark:bg-teal-900 dark:text-teal-200',
    icon: 'calendar'
  };
  
  const verifiedBadgeStyle: BadgeStyleProps = {
    label: 'Verified Only',
    color: 'bg-sky-100 text-sky-800',
    colorDark: 'dark:bg-sky-900 dark:text-sky-200',
    icon: 'check-circle'
  };
  
  const specialBadgeStyle: BadgeStyleProps = {
    label: 'Service Type',
    color: 'bg-pink-100 text-pink-800',
    colorDark: 'dark:bg-pink-900 dark:text-pink-200',
    icon: 'heart'
  };
  
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Applied Filters</Label>
          {hasFiltersApplied && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>
        
        {!hasFiltersApplied ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            No filters applied
          </div>
        ) : (
          <ScrollArea className="h-[150px] w-full">
            <div className="flex flex-wrap gap-2">
              {filters.gender &&
                filters.gender.map((gender: string) => (
                  <Badge key={gender} className="relative">
                    <div className="flex items-center">
                      <ServiceTypeBadgeLabel style={genderBadgeStyle} />
                      <span className="ml-1">{gender}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                      onClick={() => handleClearFilter('gender', gender)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              
              {filters.service &&
                filters.service.map((service: string) => (
                  <Badge key={service} className="relative">
                    <div className="flex items-center">
                      <ServiceTypeBadgeLabel style={serviceBadgeStyle} />
                      <span className="ml-1">{service}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                      onClick={() => handleClearFilter('service', service)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              
              {filters.language &&
                filters.language.map((language: string) => (
                  <Badge key={language} className="relative">
                    <div className="flex items-center">
                      <ServiceTypeBadgeLabel style={languageBadgeStyle} />
                      <span className="ml-1">{language}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                      onClick={() => handleClearFilter('language', language)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              
              {filters.priceRange && (
                <Badge className="relative">
                  <div className="flex items-center">
                    <ServiceTypeBadgeLabel style={priceRangeBadgeStyle} />
                    <span className="ml-1">
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                    onClick={() => handleClearFilter('priceRange', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.ageRange && (
                <Badge className="relative">
                  <div className="flex items-center">
                    <ServiceTypeBadgeLabel style={ageRangeBadgeStyle} />
                    <span className="ml-1">
                      {filters.ageRange[0]} - {filters.ageRange[1]} years
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                    onClick={() => handleClearFilter('ageRange', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {filters.verified && (
                <Badge className="relative">
                  <div className="flex items-center">
                    <ServiceTypeBadgeLabel style={verifiedBadgeStyle} />
                    <span className="ml-1">Verified Only</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                    onClick={() => handleClearFilter('verified', null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {selectedSpecializedTypes && selectedSpecializedTypes.length > 0 && (
                <Badge className="relative">
                  <div className="flex items-center">
                    <ServiceTypeBadgeLabel style={specialBadgeStyle} />
                    <span className="ml-1">
                      {selectedSpecializedTypes.join(', ')}
                    </span>
                  </div>
                </Badge>
              )}
            </div>
          </ScrollArea>
        )}
        
        {hasFiltersApplied && (
          <Separator />
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="text-sm text-muted-foreground">
              ${localPriceRange[0]} - ${localPriceRange[1]}
            </div>
          </div>
          <Slider
            defaultValue={defaultFilters.priceRange}
            value={localPriceRange}
            onValueChange={setLocalPriceRange}
            max={1000}
            step={10}
            className="w-1/2"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <Label className="text-sm font-medium">Age Range</Label>
            <div className="text-sm text-muted-foreground">
              {localAgeRange[0]} - {localAgeRange[1]} years
            </div>
          </div>
          <Slider
            defaultValue={defaultFilters.ageRange}
            value={localAgeRange}
            onValueChange={setLocalAgeRange}
            max={100}
            step={1}
            className="w-1/2"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={filters.verified || false}
            onCheckedChange={(checked) => updateFilters({ verified: checked })}
          />
          <Label htmlFor="verified" className="text-sm font-medium">
            Verified Only
          </Label>
        </div>
        
        <Button variant="outline" className="w-full" onClick={resetToDefaults}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppliedFilters;
