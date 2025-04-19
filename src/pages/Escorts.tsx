
import React, { useEffect, useState } from 'react';
import { useEscorts } from '@/hooks/useEscorts';
import EscortFilters from '@/components/escorts/filters/EscortFilters';
import EscortGrid from '@/components/escorts/EscortGrid';
import FeaturedEscorts from '@/components/escorts/FeaturedEscorts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  
  useEffect(() => {
    applyCurrentFilters();
  }, [applyCurrentFilters]);

  // Use type guard and default values to safely access filters
  const serviceType = (Array.isArray(filters.serviceTypes) && filters.serviceTypes.length === 1) 
    ? (filters.serviceTypes[0] as "" | "in-person" | "virtual" | "both")
    : "";

  const selectedServices = Array.isArray(filters.serviceTypes) ? filters.serviceTypes : [];

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
            Filters {Object.keys(filters).length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {Object.values(filters).flat().length}
            </span>}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Escorts</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <EscortGrid escorts={escorts} loading={loading} />
        </TabsContent>
        
        <TabsContent value="verified">
          <EscortGrid 
            escorts={escorts.filter(escort => escort.verified)} 
            loading={loading} 
          />
        </TabsContent>
        
        <TabsContent value="available">
          <EscortGrid 
            escorts={escorts.filter(escort => escort.availableNow)} 
            loading={loading} 
          />
        </TabsContent>
        
        <TabsContent value="featured">
          <EscortGrid 
            escorts={escorts.filter(escort => escort.featured)} 
            loading={loading} 
          />
        </TabsContent>
      </Tabs>
      
      {showFilters && (
        <EscortFilters 
          location={typeof filters.location === "string" ? filters.location : ""}
          setLocation={(location) => updateFilters({ location })}
          priceRange={Array.isArray(filters.priceRange) ? filters.priceRange as [number, number] : [0, 1000]}
          setPriceRange={(range) => updateFilters({ priceRange: range as [number, number] })}
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
          selectedGenders={Array.isArray(filters.gender) ? filters.gender : []}
          toggleGender={(gender) => {
            const currentGenders = [...(Array.isArray(filters.gender) ? filters.gender : [])];
            const index = currentGenders.indexOf(gender);
            if (index >= 0) {
              currentGenders.splice(index, 1);
            } else {
              currentGenders.push(gender);
            }
            updateFilters({ gender: currentGenders });
          }}
          selectedOrientations={Array.isArray(filters.orientation) ? filters.orientation : []}
          toggleOrientation={(orientation) => {
            const currentOrientations = [...(Array.isArray(filters.orientation) ? filters.orientation : [])];
            const index = currentOrientations.indexOf(orientation);
            if (index >= 0) {
              currentOrientations.splice(index, 1);
            } else {
              currentOrientations.push(orientation);
            }
            updateFilters({ orientation: currentOrientations });
          }}
          ageRange={Array.isArray(filters.ageRange) ? filters.ageRange as [number, number] : [18, 99]}
          setAgeRange={(range) => updateFilters({ ageRange: range as [number, number] })}
          ratingMin={typeof filters.rating === 'number' ? filters.rating : 0}
          setRatingMin={(rating) => updateFilters({ rating })}
          availableNow={typeof filters.availableNow === 'boolean' ? filters.availableNow : false}
          setAvailableNow={(available) => updateFilters({ availableNow: available })}
          verifiedOnly={typeof filters.verified === 'boolean' ? filters.verified : false}
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

