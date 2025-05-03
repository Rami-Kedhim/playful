
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FilterSidebar from "@/components/escorts/FilterSidebar";

interface FilterSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterState: any;
  services: string[];
}

const FilterSection = ({
  showFilters,
  setShowFilters,
  filterState,
  services
}: FilterSectionProps) => {
  // For mobile view - dialog
  const mobileFilters = (
    <Dialog open={showFilters} onOpenChange={setShowFilters}>
      <DialogContent className="sm:max-w-[425px] p-0 h-[80vh] max-h-[800px] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <FilterSidebar
            searchQuery={filterState.searchQuery || ""}
            setSearchQuery={filterState.setSearchQuery || (() => {})}
            location={filterState.location || ""}
            setLocation={filterState.setLocation || (() => {})}
            priceRange={filterState.priceRange || [0, 500]}
            setPriceRange={filterState.handlePriceRangeChange || (() => {})}
            verifiedOnly={filterState.verifiedOnly || false}
            setVerifiedOnly={filterState.setVerifiedOnly || (() => {})}
            selectedServices={filterState.selectedServices || []}
            toggleService={filterState.toggleService || (() => {})}
            services={services}
            clearFilters={filterState.clearFilters || (() => {})}
            selectedGenders={filterState.selectedGenders || []}
            toggleGender={filterState.toggleGender || (() => {})}
            selectedOrientations={(filterState as any).selectedOrientations || []}
            toggleOrientation={(filterState as any).toggleOrientation || (() => {})}
            ageRange={(filterState as any).ageRange || [21, 50]}
            setAgeRange={(filterState as any).handleAgeRangeChange || (() => {})}
            ratingMin={filterState.ratingMin || 0}
            setRatingMin={filterState.setRatingMin || (() => {})}
            availableNow={filterState.availableNow || false}
            setAvailableNow={filterState.setAvailableNow || (() => {})}
            serviceTypeFilter={filterState.serviceTypeFilter || ""}
            setServiceTypeFilter={filterState.setServiceTypeFilter || (() => {})}
          />
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <Button variant="outline" onClick={filterState.clearFilters || (() => {})}>
            Clear all
          </Button>
          <Button onClick={() => setShowFilters(false)}>
            Apply filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
  
  // For desktop view - sidebar
  const desktopFilters = (
    <div className="hidden lg:block">
      <FilterSidebar
        searchQuery={filterState.searchQuery || ""}
        setSearchQuery={filterState.setSearchQuery || (() => {})}
        location={filterState.location || ""}
        setLocation={filterState.setLocation || (() => {})}
        priceRange={(filterState as any).priceRange || [0, 500]}
        setPriceRange={(filterState as any).handlePriceRangeChange || (() => {})}
        verifiedOnly={filterState.verifiedOnly || false}
        setVerifiedOnly={filterState.setVerifiedOnly || (() => {})}
        selectedServices={filterState.selectedServices || []}
        toggleService={filterState.toggleService || (() => {})}
        services={services}
        clearFilters={filterState.clearFilters || (() => {})}
        selectedGenders={filterState.selectedGenders || []}
        toggleGender={filterState.toggleGender || (() => {})}
        selectedOrientations={(filterState as any).selectedOrientations || []}
        toggleOrientation={(filterState as any).toggleOrientation || (() => {})}
        ageRange={(filterState as any).ageRange || [21, 50]}
        setAgeRange={(filterState as any).handleAgeRangeChange || (() => {})}
        ratingMin={filterState.ratingMin || 0}
        setRatingMin={filterState.setRatingMin || (() => {})}
        availableNow={filterState.availableNow || false}
        setAvailableNow={filterState.setAvailableNow || (() => {})}
        serviceTypeFilter={filterState.serviceTypeFilter || ""}
        setServiceTypeFilter={filterState.setServiceTypeFilter || (() => {})}
      />
    </div>
  );
  
  return (
    <>
      {/* Mobile Filters */}
      <AnimatePresence>
        {mobileFilters}
      </AnimatePresence>
      
      {/* Desktop Filters */}
      {desktopFilters}
    </>
  );
};

export default FilterSection;
