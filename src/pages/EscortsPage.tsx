
import React, { useState, useEffect } from 'react';
import { Layout } from '@/layouts';
import EscortGrid from '@/components/escorts/EscortGrid';
import EscortFilters from '@/components/escorts/filters/EscortFilters';
import { Escort } from '@/types/Escort';
import { useEscorts } from '@/hooks/useEscorts';
import { Loader2 } from 'lucide-react';

const EscortsPage = () => {
  // Fetch escorts data
  const {
    escorts,
    featuredEscorts,
    loading,
    filters,
    updateFilters,
    applyCurrentFilters,
    clearAllFilters,
  } = useEscorts();

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [serviceType, setServiceType] = useState<"" | "in-person" | "virtual" | "both">("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [ratingMin, setRatingMin] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  
  // Handle service selection
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };
  
  // Handle gender selection
  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender)
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    );
  };
  
  // Handle orientation selection
  const toggleOrientation = (orientation: string) => {
    setSelectedOrientations(prev => 
      prev.includes(orientation)
        ? prev.filter(o => o !== orientation)
        : [...prev, orientation]
    );
  };
  
  // Apply filters
  const handleApplyFilters = () => {
    updateFilters({
      searchQuery,
      location,
      priceRange,
      serviceType,
      services: selectedServices,
      genders: selectedGenders,
      orientations: selectedOrientations,
      ageRange,
      ratingMin,
      availableNow,
      verifiedOnly,
    });
    applyCurrentFilters();
  };
  
  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setPriceRange([0, 1000]);
    setServiceType("");
    setSelectedServices([]);
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setAgeRange([18, 65]);
    setRatingMin(0);
    setAvailableNow(false);
    setVerifiedOnly(false);
    clearAllFilters();
  };
  
  return (
    <Layout 
      title="Find Escorts" 
      description="Discover verified escorts in your area"
      showBreadcrumbs
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <EscortFilters 
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            onUpdate={updateFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
            setLocation={setLocation}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            serviceType={serviceType}
            setServiceType={setServiceType}
            selectedServices={selectedServices}
            toggleService={toggleService}
            selectedGenders={selectedGenders}
            toggleGender={toggleGender}
            selectedOrientations={selectedOrientations}
            toggleOrientation={toggleOrientation}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            ratingMin={ratingMin}
            setRatingMin={setRatingMin}
            availableNow={availableNow}
            setAvailableNow={setAvailableNow}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
          />
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Featured Escorts */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Escorts</h2>
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : featuredEscorts.length > 0 ? (
              <EscortGrid 
                escorts={featuredEscorts} 
                loading={loading}
                emptyMessage="No featured escorts available."
              />
            ) : (
              <p className="text-muted-foreground">No featured escorts available at the moment.</p>
            )}
          </section>
          
          {/* All Escorts */}
          <section>
            <h2 className="text-2xl font-bold mb-4">All Escorts</h2>
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <EscortGrid 
                escorts={escorts} 
                loading={loading}
                emptyMessage="No escorts found matching your criteria."
              />
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default EscortsPage;
