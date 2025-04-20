
import React, { useState } from 'react';
import { useEscorts } from '@/hooks/useEscorts';
import EscortFilters from '@/components/escorts/filters/EscortFilters';
import EscortGrid from '@/components/escorts/EscortGrid';
import FeaturedEscorts from '@/components/escorts/FeaturedEscorts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SlidersHorizontal } from 'lucide-react';
import EscortsModule from '@/modules/escorts/EscortsModule';

const EscortsContent = () => {
  const { 
    escorts, 
    featuredEscorts, 
    loading, 
    filters = {}, 
    updateFilters,
    applyCurrentFilters,
    clearAllFilters
  } = useEscorts();

  const [showFilters, setShowFilters] = useState(false);

  // Provide a fallback typing for filters as empty object might cause TS errors
  const typedFilters = filters as Partial<{
    serviceTypes: string[];
    location: string;
    priceRange: [number, number];
    gender: string[];
    orientation: string[];
    ageRange: [number, number];
    rating: number;
    availableNow: boolean;
    verified: boolean;
  }>;

  // Fix filter property type errors by setting defaults with type guards and fallbacks
  const serviceTypes: string[] = Array.isArray(typedFilters.serviceTypes) ? typedFilters.serviceTypes : [];
  const serviceType: "" | "in-person" | "virtual" | "both" = 
    serviceTypes.length === 1 && ["in-person", "virtual", "both"].includes(serviceTypes[0]) 
    ? (serviceTypes[0] as "" | "in-person" | "virtual" | "both")
    : "";

  const selectedServices = serviceTypes;
  
  const location: string = typeof typedFilters.location === 'string' ? typedFilters.location : "";
  const priceRange: [number, number] = Array.isArray(typedFilters.priceRange) && typedFilters.priceRange.length === 2 
    ? [typedFilters.priceRange[0], typedFilters.priceRange[1]] 
    : [0, 1000];
  const selectedGenders: string[] = Array.isArray(typedFilters.gender) ? typedFilters.gender : [];
  const selectedOrientations: string[] = Array.isArray(typedFilters.orientation) ? typedFilters.orientation : [];
  const ageRange: [number, number] = Array.isArray(typedFilters.ageRange) && typedFilters.ageRange.length === 2 
    ? [typedFilters.ageRange[0], typedFilters.ageRange[1]] 
    : [18, 99];
  const ratingMin: number = typeof typedFilters.rating === 'number' ? typedFilters.rating : 0;
  const availableNow: boolean = typeof typedFilters.availableNow === 'boolean' ? typedFilters.availableNow : false;
  const verifiedOnly: boolean = typeof typedFilters.verified === 'boolean' ? typedFilters.verified : false;

  return (
    <div className="container mx-auto py-8 px-4">
      <FeaturedEscorts escorts={featuredEscorts} loading={loading} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Find Escorts</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters {Object.keys(filters).length > 0 && (
              <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                {Object.values(filters).flat?.().length || 0}
              </span>
            )}
          </Button>
          
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Escorts</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>
      </Tabs>

      <EscortGrid escorts={escorts} loading={loading} />

      {showFilters && (
        <EscortFilters 
          location={location}
          setLocation={(loc) => updateFilters({ location: loc })}
          priceRange={priceRange}
          setPriceRange={(range) => updateFilters({ priceRange: range })}
          serviceType={serviceType}
          setServiceType={(type) => updateFilters({ serviceTypes: type ? [type] : [] })}
          selectedServices={selectedServices}
          toggleService={(service) => {
            const currentServices = [...selectedServices];
            const index = currentServices.indexOf(service);
            if (index >= 0) {
              currentServices.splice(index, 1);
            } else {
              currentServices.push(service);
            }
            updateFilters({ serviceTypes: currentServices });
          }}
          selectedGenders={selectedGenders}
          toggleGender={(gender) => {
            const currentGenders = [...selectedGenders];
            const index = currentGenders.indexOf(gender);
            if (index >= 0) {
              currentGenders.splice(index, 1);
            } else {
              currentGenders.push(gender);
            }
            updateFilters({ gender: currentGenders });
          }}
          selectedOrientations={selectedOrientations}
          toggleOrientation={(orientation) => {
            const currentOrientations = [...selectedOrientations];
            const index = currentOrientations.indexOf(orientation);
            if (index >= 0) {
              currentOrientations.splice(index, 1);
            } else {
              currentOrientations.push(orientation);
            }
            updateFilters({ orientation: currentOrientations });
          }}
          ageRange={ageRange}
          setAgeRange={(range) => updateFilters({ ageRange: range })}
          ratingMin={ratingMin}
          setRatingMin={(rating) => updateFilters({ rating })}
          availableNow={availableNow}
          setAvailableNow={(available) => updateFilters({ availableNow: available })}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={(verified) => updateFilters({ verified })}
          onApply={() => {
            applyCurrentFilters();
            setShowFilters(false);
          }}
          onClear={() => {
            clearAllFilters();
            setShowFilters(false);
          }}
          onUpdate={updateFilters}
        />
      )}
    </div>
  );
};

const Escorts = () => {
  return (
    <EscortsModule>
      <EscortsContent />
    </EscortsModule>
  );
};

export default Escorts;
