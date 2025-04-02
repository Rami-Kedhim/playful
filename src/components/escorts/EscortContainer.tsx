
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/escorts/FilterSidebar";
import MobileFilterCard from "@/components/escorts/MobileFilterCard";
import SearchBar from "@/components/escorts/SearchBar";
import AppliedFilters from "@/components/escorts/AppliedFilters";
import EscortResults from "@/components/escorts/EscortResults";
import { useEscortFilter } from "@/hooks/useEscortFilter";
import { Escort } from "@/data/escortData";

interface EscortContainerProps {
  escorts: Escort[];
  services: string[];
}

const EscortContainer = ({ escorts, services }: EscortContainerProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    setPriceRange,
    verifiedOnly,
    setVerifiedOnly,
    selectedServices,
    toggleService,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    clearFilters,
    paginatedEscorts,
    totalPages,
    // Add new filter states and functions
    selectedGenders,
    toggleGender,
    selectedOrientations,
    toggleOrientation
  } = useEscortFilter(escorts);

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
            location={location}
            setLocation={setLocation}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            selectedServices={selectedServices}
            toggleService={toggleService}
            services={services}
            clearFilters={clearFilters}
            // Pass new filter props
            selectedGenders={selectedGenders}
            toggleGender={toggleGender}
            selectedOrientations={selectedOrientations}
            toggleOrientation={toggleOrientation}
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
              setPriceRange={setPriceRange}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              selectedServices={selectedServices}
              toggleService={toggleService}
              services={services}
              clearFilters={clearFilters}
              setShowFilters={setShowFilters}
              // Pass new filter props
              selectedGenders={selectedGenders}
              toggleGender={toggleGender}
              selectedOrientations={selectedOrientations}
              toggleOrientation={toggleOrientation}
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
            setPriceRange={setPriceRange}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            selectedServices={selectedServices}
            toggleService={toggleService}
            clearFilters={clearFilters}
            // Pass new filter props
            selectedGenders={selectedGenders}
            toggleGender={toggleGender}
            selectedOrientations={selectedOrientations}
            toggleOrientation={toggleOrientation}
          />
          
          <EscortResults 
            escorts={paginatedEscorts}
            clearFilters={clearFilters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default EscortContainer;
