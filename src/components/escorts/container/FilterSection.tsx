
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FilterSidebar from "@/components/escorts/FilterSidebar";
import AppliedFilters from "@/components/escorts/AppliedFilters";

interface FilterSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterState: any;
  services: string[];
}

const FilterSection = ({ showFilters, setShowFilters, filterState, services }: FilterSectionProps) => {
  // Generate list of applied filters for the AppliedFilters component
  const getAppliedFilters = () => {
    const filters = [];

    if (filterState.searchQuery) {
      filters.push({ key: "search", label: "Search", value: filterState.searchQuery });
    }
    if (filterState.location) {
      filters.push({ key: "location", label: "Location", value: filterState.location });
    }
    if (filterState.verifiedOnly) {
      filters.push({ key: "verified", label: "Verified", value: "Yes" });
    }
    if (filterState.availableNow) {
      filters.push({ key: "available", label: "Available Now", value: "Yes" });
    }
    if (filterState.serviceTypeFilter) {
      filters.push({ key: "serviceType", label: "Service Type", value: filterState.serviceTypeFilter });
    }
    if (filterState.ratingMin > 0) {
      filters.push({ key: "rating", label: "Min Rating", value: filterState.ratingMin + "+" });
    }
    if (filterState.selectedServices.length > 0) {
      filterState.selectedServices.forEach((service: string) => {
        filters.push({ key: "service", label: "Service", value: service });
      });
    }
    if (filterState.selectedGenders.length > 0) {
      filterState.selectedGenders.forEach((gender: string) => {
        filters.push({ key: "gender", label: "Gender", value: gender });
      });
    }

    return filters;
  };

  // Remove a single filter
  const removeFilter = (filter: { key: string; label: string; value?: string }) => {
    if (filter.key === "search") {
      filterState.setSearchQuery("");
    } else if (filter.key === "location") {
      filterState.setLocation("");
    } else if (filter.key === "verified") {
      filterState.setVerifiedOnly(false);
    } else if (filter.key === "available") {
      filterState.setAvailableNow(false);
    } else if (filter.key === "serviceType") {
      filterState.setServiceTypeFilter("");
    } else if (filter.key === "rating") {
      filterState.setRatingMin(0);
    } else if (filter.key === "service") {
      filterState.toggleService(filter.value || "");
    } else if (filter.key === "gender") {
      filterState.toggleGender(filter.value || "");
    }
  };

  return (
    <>
      {/* Desktop Filters (left sidebar) */}
      <div className="hidden lg:block lg:col-span-1">
        <FilterSidebar
          searchQuery={filterState.searchQuery}
          setSearchQuery={filterState.setSearchQuery}
          location={filterState.location}
          setLocation={filterState.setLocation}
          priceRange={[0, 1000]} // Default price range
          setPriceRange={() => {}} // Not implemented yet
          verifiedOnly={filterState.verifiedOnly}
          setVerifiedOnly={filterState.setVerifiedOnly}
          selectedServices={filterState.selectedServices}
          toggleService={filterState.toggleService}
          services={services}
          clearFilters={filterState.clearFilters}
          selectedGenders={filterState.selectedGenders}
          toggleGender={filterState.toggleGender}
          selectedOrientations={[]} // Not implemented yet
          toggleOrientation={() => {}} // Not implemented yet
          availableNow={filterState.availableNow}
          setAvailableNow={filterState.setAvailableNow}
          ratingMin={filterState.ratingMin}
          setRatingMin={filterState.setRatingMin}
          serviceTypeFilter={filterState.serviceTypeFilter}
          setServiceTypeFilter={filterState.setServiceTypeFilter}
        />
        
        {/* Desktop Applied Filters */}
        {getAppliedFilters().length > 0 && (
          <div className="mt-4">
            <AppliedFilters 
              filters={getAppliedFilters()}
              removeFilter={removeFilter}
              clearFilters={filterState.clearFilters}
            />
          </div>
        )}
      </div>

      {/* Mobile Filters (sheet) */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="left" className="w-full sm:w-[350px] px-4 py-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <FilterSidebar
            searchQuery={filterState.searchQuery}
            setSearchQuery={filterState.setSearchQuery}
            location={filterState.location}
            setLocation={filterState.setLocation}
            priceRange={[0, 1000]} // Default price range
            setPriceRange={() => {}} // Not implemented yet
            verifiedOnly={filterState.verifiedOnly}
            setVerifiedOnly={filterState.setVerifiedOnly}
            selectedServices={filterState.selectedServices}
            toggleService={filterState.toggleService}
            services={services}
            clearFilters={filterState.clearFilters}
            selectedGenders={filterState.selectedGenders}
            toggleGender={filterState.toggleGender}
            selectedOrientations={[]} // Not implemented yet
            toggleOrientation={() => {}} // Not implemented yet
            availableNow={filterState.availableNow}
            setAvailableNow={filterState.setAvailableNow}
            ratingMin={filterState.ratingMin}
            setRatingMin={filterState.setRatingMin}
            serviceTypeFilter={filterState.serviceTypeFilter}
            setServiceTypeFilter={filterState.setServiceTypeFilter}
          />
          
          <div className="mt-8">
            <Button className="w-full" onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterSection;
