import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/escorts/FilterSidebar";
import MobileFilterCard from "@/components/escorts/MobileFilterCard";
import SearchBar from "@/components/escorts/SearchBar";
import AppliedFilters from "@/components/escorts/AppliedFilters";
import EscortResults from "@/components/escorts/EscortResults";
import { useEscortFilterWithUrl } from "@/hooks/useEscortFilterWithUrl";
import { Escort } from "@/types/escort";
import QuickFilterBar from "./QuickFilterBar";

interface EscortContainerProps {
  escorts: Escort[];
  services: string[];
  isLoading?: boolean;
}

const EscortContainer = ({ escorts, services, isLoading: externalLoading = false }: EscortContainerProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    location,
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
    isLoading,
    setIsLoading,
    clearFilters,
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages,
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
  } = useEscortFilterWithUrl({ escorts });

  // Consider both internal and external loading states
  const combinedIsLoading = isLoading || externalLoading;

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
      
      {/* Quick filter bar for mobile and desktop */}
      <QuickFilterBar
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        availableNow={availableNow}
        setAvailableNow={setAvailableNow}
        location={location}
        onLocationClick={() => setShowFilters(true)}
        onShowMoreFilters={() => setShowFilters(true)}
        className="mb-6 md:mb-8"
        ratingMin={ratingMin}
        setRatingMin={setRatingMin}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="h-fit sticky top-20 hidden md:block">
          <FilterSidebar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
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
              location={location}
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
            location={location}
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
            isLoading={combinedIsLoading}
          />
        </div>
      </div>
    </>
  );
};

export default EscortContainer;
