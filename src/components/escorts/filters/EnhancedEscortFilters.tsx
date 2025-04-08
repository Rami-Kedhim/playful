
import { useState } from "react";
import { useEnhancedEscortFilters } from "@/hooks/useEnhancedEscortFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import FilterSidebarHeader from "./FilterSidebarHeader";
import FilterSidebarContent from "./FilterSidebarContent";
import FilterBadge from "./FilterBadge";

interface EnhancedEscortFiltersProps {
  onApplyFilters?: (filters: any) => void;
  className?: string;
}

const EnhancedEscortFilters = ({ onApplyFilters, className = "" }: EnhancedEscortFiltersProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const {
    filters,
    isFiltering,
    updateFilters,
    resetFilters,
    applyFilters,
    toggleFilterValue,
    toggleAvailability
  } = useEnhancedEscortFilters();
  
  const handleApplyFilters = async () => {
    await applyFilters();
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
    setShowMobileFilters(false); // Close mobile filters after applying
  };
  
  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    
    if (filters.location) count++;
    if (filters.serviceTypes.length) count += 1;
    if (filters.gender.length) count += 1;
    if (filters.orientation.length) count += 1;
    if (filters.verified) count++;
    if (filters.availableNow) count++;
    if (filters.rating > 0) count++;
    if (filters.language.length) count += 1;
    if (filters.hairColor.length) count += 1;
    if (filters.eyeColor.length) count += 1;
    if (filters.ethnicity.length) count += 1;
    if (filters.bodyType.length) count += 1;
    if (filters.availability.days.length || filters.availability.hours.length) count++;
    
    // Check if price range is not default
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    
    // Check if age range is not default
    if (filters.ageRange[0] > 21 || filters.ageRange[1] < 50) count++;
    
    // Check if height range is not default
    if (filters.height[0] > 140 || filters.height[1] < 200) count++;
    
    // Check if weight range is not default
    if (filters.weight[0] > 40 || filters.weight[1] < 120) count++;
    
    return count;
  };
  
  const activeFilterCount = getActiveFilterCount();
  
  // Render applied filters
  const renderAppliedFilters = () => {
    if (activeFilterCount === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.location && (
          <FilterBadge 
            label={`Location: ${filters.location}`}
            onRemove={() => updateFilters({ location: '' })}
          />
        )}
        
        {filters.serviceTypes.length > 0 && (
          <FilterBadge 
            label={`Services: ${filters.serviceTypes.length}`}
            onRemove={() => updateFilters({ serviceTypes: [] })}
          />
        )}
        
        {filters.gender.length > 0 && (
          <FilterBadge 
            label={`Gender: ${filters.gender.length}`}
            onRemove={() => updateFilters({ gender: [] })}
          />
        )}
        
        {filters.orientation.length > 0 && (
          <FilterBadge 
            label={`Orientation: ${filters.orientation.length}`}
            onRemove={() => updateFilters({ orientation: [] })}
          />
        )}
        
        {filters.verified && (
          <FilterBadge 
            label="Verified only"
            onRemove={() => updateFilters({ verified: false })}
          />
        )}
        
        {filters.availableNow && (
          <FilterBadge 
            label="Available now"
            onRemove={() => updateFilters({ availableNow: false })}
          />
        )}
        
        {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
          <FilterBadge 
            label={`Price: ${filters.priceRange[0]}-${filters.priceRange[1]} LC`}
            onRemove={() => updateFilters({ priceRange: [0, 1000] })}
          />
        )}
        
        {filters.rating > 0 && (
          <FilterBadge 
            label={`Rating: ${filters.rating}+`}
            onRemove={() => updateFilters({ rating: 0 })}
          />
        )}
        
        {activeFilterCount > 3 && (
          <Badge variant="outline" className="cursor-pointer" onClick={() => setShowMobileFilters(true)}>
            +{activeFilterCount - 3} more filters
          </Badge>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="ml-auto"
        >
          Clear all
        </Button>
      </div>
    );
  };
  
  return (
    <div className={className}>
      {/* Desktop filters */}
      <div className="hidden md:block">
        <Card className="w-full">
          <CardContent className="p-4">
            <FilterSidebarHeader clearFilters={resetFilters} />
            <FilterSidebarContent 
              searchQuery={filters.location}
              setSearchQuery={(value) => updateFilters({ location: value })}
              location={filters.location}
              setLocation={(value) => updateFilters({ location: value })}
              priceRange={filters.priceRange}
              setPriceRange={(value) => updateFilters({ priceRange: [value[0], value[1]] })}
              verifiedOnly={filters.verified}
              setVerifiedOnly={(value) => updateFilters({ verified: value })}
              selectedServices={filters.serviceTypes}
              toggleService={(service) => toggleFilterValue('serviceTypes', service)}
              services={[]}
              selectedGenders={filters.gender}
              toggleGender={(gender) => toggleFilterValue('gender', gender)}
              selectedOrientations={filters.orientation}
              toggleOrientation={(orientation) => toggleFilterValue('orientation', orientation)}
              ageRange={filters.ageRange}
              setAgeRange={(value) => updateFilters({ ageRange: [value[0], value[1]] })}
              ratingMin={filters.rating}
              setRatingMin={(value) => updateFilters({ rating: value })}
              availableNow={filters.availableNow}
              setAvailableNow={(value) => updateFilters({ availableNow: value })}
              serviceTypeFilter=""
              setServiceTypeFilter={() => {}}
              heightRange={filters.height}
              setHeightRange={(value) => updateFilters({ height: [value[0], value[1]] })}
              weightRange={filters.weight}
              setWeightRange={(value) => updateFilters({ weight: [value[0], value[1]] })}
              selectedLanguages={filters.language}
              toggleLanguage={(language) => toggleFilterValue('language', language)}
              selectedHairColors={filters.hairColor}
              toggleHairColor={(hairColor) => toggleFilterValue('hairColor', hairColor)}
              selectedEyeColors={filters.eyeColor}
              toggleEyeColor={(eyeColor) => toggleFilterValue('eyeColor', eyeColor)}
              selectedEthnicities={filters.ethnicity}
              toggleEthnicity={(ethnicity) => toggleFilterValue('ethnicity', ethnicity)}
              selectedBodyTypes={filters.bodyType}
              toggleBodyType={(bodyType) => toggleFilterValue('bodyType', bodyType)}
              selectedDays={filters.availability.days}
              toggleDay={(day) => toggleAvailability('days', day)}
              selectedHours={filters.availability.hours}
              toggleHour={(hour) => toggleAvailability('hours', hour)}
            />
            <div className="mt-4">
              <Button 
                className="w-full" 
                onClick={handleApplyFilters} 
                disabled={isFiltering}
              >
                {isFiltering ? "Applying..." : "Apply Filters"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Mobile filter button */}
      <div className="md:hidden">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between" 
          onClick={() => setShowMobileFilters(true)}
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter Escorts
          </span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </Button>
        
        {/* Applied filters */}
        {renderAppliedFilters()}
      </div>
      
      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-background z-50 md:hidden">
          <Card className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-medium text-lg">Filter Escorts</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMobileFilters(false)}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              <FilterSidebarContent 
                searchQuery={filters.location}
                setSearchQuery={(value) => updateFilters({ location: value })}
                location={filters.location}
                setLocation={(value) => updateFilters({ location: value })}
                priceRange={filters.priceRange}
                setPriceRange={(value) => updateFilters({ priceRange: [value[0], value[1]] })}
                verifiedOnly={filters.verified}
                setVerifiedOnly={(value) => updateFilters({ verified: value })}
                selectedServices={filters.serviceTypes}
                toggleService={(service) => toggleFilterValue('serviceTypes', service)}
                services={[]}
                selectedGenders={filters.gender}
                toggleGender={(gender) => toggleFilterValue('gender', gender)}
                selectedOrientations={filters.orientation}
                toggleOrientation={(orientation) => toggleFilterValue('orientation', orientation)}
                ageRange={filters.ageRange}
                setAgeRange={(value) => updateFilters({ ageRange: [value[0], value[1]] })}
                ratingMin={filters.rating}
                setRatingMin={(value) => updateFilters({ rating: value })}
                availableNow={filters.availableNow}
                setAvailableNow={(value) => updateFilters({ availableNow: value })}
                serviceTypeFilter=""
                setServiceTypeFilter={() => {}}
                heightRange={filters.height}
                setHeightRange={(value) => updateFilters({ height: [value[0], value[1]] })}
                weightRange={filters.weight}
                setWeightRange={(value) => updateFilters({ weight: [value[0], value[1]] })}
                selectedLanguages={filters.language}
                toggleLanguage={(language) => toggleFilterValue('language', language)}
                selectedHairColors={filters.hairColor}
                toggleHairColor={(hairColor) => toggleFilterValue('hairColor', hairColor)}
                selectedEyeColors={filters.eyeColor}
                toggleEyeColor={(eyeColor) => toggleFilterValue('eyeColor', eyeColor)}
                selectedEthnicities={filters.ethnicity}
                toggleEthnicity={(ethnicity) => toggleFilterValue('ethnicity', ethnicity)}
                selectedBodyTypes={filters.bodyType}
                toggleBodyType={(bodyType) => toggleFilterValue('bodyType', bodyType)}
                selectedDays={filters.availability.days}
                toggleDay={(day) => toggleAvailability('days', day)}
                selectedHours={filters.availability.hours}
                toggleHour={(hour) => toggleAvailability('hours', hour)}
              />
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={resetFilters}
                >
                  Clear All
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleApplyFilters}
                  disabled={isFiltering}
                >
                  {isFiltering ? "Applying..." : "Apply Filters"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedEscortFilters;
