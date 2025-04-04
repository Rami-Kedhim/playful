
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/escorts/FilterSidebar";
import MobileFilterCard from "@/components/escorts/MobileFilterCard";
import SearchBar from "@/components/escorts/SearchBar";
import AppliedFilters from "@/components/escorts/AppliedFilters";
import EscortResults from "@/components/escorts/EscortResults";
import { useEscortFilter } from "@/hooks/useEscortFilter";
import { Escort } from "@/types/escort";

interface EscortContainerProps {
  escorts: Escort[];
  services: string[];
}

const EscortContainer = ({ escorts, services }: EscortContainerProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const location = useLocation();
  
  const {
    searchQuery,
    setSearchQuery,
    location: locationFilter,
    setLocation,
    priceRange,
    handlePriceRangeChange,
    verifiedOnly,
    setVerifiedOnly,
    selectedServices,
    toggleService,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    clearFilters,
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages,
    // Add new filter states and functions
    selectedGenders,
    toggleGender,
    selectedOrientations,
    toggleOrientation,
    ageRange,
    handleAgeRangeChange,
    ratingMin,
    setRatingMin,
    availableNow,
    setAvailableNow,
    serviceTypeFilter,
    setServiceTypeFilter
  } = useEscortFilter(escorts);

  // Parse URL query parameters when the component loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    
    if (typeParam && ['in-person', 'virtual', 'both'].includes(typeParam)) {
      setServiceTypeFilter(typeParam as "in-person" | "virtual" | "both");
    }
  }, [location.search, setServiceTypeFilter]);

  // Show loading state briefly when filters change
  useEffect(() => {
    const filtersChanged = searchQuery || locationFilter || 
                          priceRange[0] > 0 || priceRange[1] < 500 ||
                          verifiedOnly || selectedServices.length > 0 ||
                          selectedGenders.length > 0 || selectedOrientations.length > 0 ||
                          ageRange[0] > 18 || ageRange[1] < 50 ||
                          ratingMin > 0 || availableNow ||
                          serviceTypeFilter !== "";
    
    if (filtersChanged) {
      setIsFiltering(true);
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [
    searchQuery, locationFilter, priceRange, verifiedOnly, selectedServices,
    selectedGenders, selectedOrientations, ageRange, ratingMin, availableNow,
    serviceTypeFilter
  ]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Escorts Directory</h1>
        <Button 
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="h-fit sticky top-20 hidden md:block">
          <FilterSidebar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={locationFilter}
            setLocation={setLocation}
            priceRange={priceRange}
            setPriceRange={handlePriceRangeChange}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            selectedServices={selectedServices}
            toggleService={toggleService}
            services={services}
            clearFilters={clearFilters}
            selectedGenders={selectedGenders}
            toggleGender={toggleGender}
            selectedOrientations={selectedOrientations}
            toggleOrientation={toggleOrientation}
            ageRange={ageRange}
            setAgeRange={handleAgeRangeChange}
            ratingMin={ratingMin}
            setRatingMin={setRatingMin}
            availableNow={availableNow}
            setAvailableNow={setAvailableNow}
            serviceTypeFilter={serviceTypeFilter}
            setServiceTypeFilter={setServiceTypeFilter}
          />
        </div>
        
        {showFilters && (
          <div className="md:hidden">
            <MobileFilterCard 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              location={locationFilter}
              setLocation={setLocation}
              priceRange={priceRange}
              setPriceRange={handlePriceRangeChange}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              selectedServices={selectedServices}
              toggleService={toggleService}
              services={services}
              clearFilters={clearFilters}
              setShowFilters={setShowFilters}
              selectedGenders={selectedGenders}
              toggleGender={toggleGender}
              selectedOrientations={selectedOrientations}
              toggleOrientation={toggleOrientation}
              serviceTypeFilter={serviceTypeFilter}
              setServiceTypeFilter={setServiceTypeFilter}
              ageRange={ageRange}
              setAgeRange={handleAgeRangeChange}
              ratingMin={ratingMin}
              setRatingMin={setRatingMin}
              availableNow={availableNow}
              setAvailableNow={setAvailableNow}
            />
          </div>
        )}
        
        <div className="lg:col-span-3">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <AppliedFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={locationFilter}
            setLocation={setLocation}
            priceRange={priceRange}
            setPriceRange={handlePriceRangeChange}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            selectedServices={selectedServices}
            toggleService={toggleService}
            clearFilters={clearFilters}
            selectedGenders={selectedGenders}
            toggleGender={toggleGender}
            selectedOrientations={selectedOrientations}
            toggleOrientation={toggleOrientation}
            ageRange={ageRange}
            setAgeRange={handleAgeRangeChange}
            ratingMin={ratingMin}
            setRatingMin={setRatingMin}
            availableNow={availableNow}
            setAvailableNow={setAvailableNow}
            serviceTypeFilter={serviceTypeFilter}
            setServiceTypeFilter={setServiceTypeFilter}
          />
          
          <EscortResults 
            escorts={paginatedEscorts}
            clearFilters={clearFilters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            isLoading={isFiltering}
          />
        </div>
      </div>
    </>
  );
};

export default EscortContainer;
