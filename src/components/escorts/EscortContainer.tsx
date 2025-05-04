
import React, { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import FilterSidebar from './FilterSidebar';
import EscortGrid from './EscortGrid';
import useEscortFilterWithUrl from '@/hooks/useEscortFilterWithUrl';
import { type Escort } from '@/types/Escort';

interface EscortContainerProps {
  escorts: Escort[];
  loading?: boolean;
}

const EscortContainer: React.FC<EscortContainerProps> = ({ escorts, loading = false }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const filterState = useEscortFilterWithUrl({ escorts });
  const filteredEscorts = filterState.filteredEscorts();
  
  // Check for active filters
  const hasActiveFilters = (
    filterState.searchQuery !== '' ||
    filterState.location !== '' ||
    filterState.serviceTypeFilter !== '' ||
    filterState.verifiedOnly ||
    filterState.availableNow ||
    filterState.selectedBodyTypes.length > 0 ||
    filterState.selectedEthnicities.length > 0 ||
    filterState.selectedHairColors.length > 0 ||
    filterState.selectedServices.length > 0 ||
    filterState.ratingMin > 0
  );

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      {/* Mobile Filter Button */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-background py-2 border-b">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between">
                <span className="flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </span>
                {hasActiveFilters && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                    Active
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => filterState.resetFilters()}
                    className="h-8 text-xs flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
              <FilterSidebar 
                {...filterState}
              />
            </SheetContent>
          </Sheet>
        </div>
      )}
      
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Filters</h2>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => filterState.resetFilters()}
                className="h-8 text-xs flex items-center"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          <FilterSidebar 
            {...filterState}
          />
        </div>
      )}
      
      {/* Escort Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {loading ? (
              <span>Loading escorts...</span>
            ) : (
              <span>{filteredEscorts.length} results found</span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <select 
              className="px-3 py-1 border rounded text-sm"
              value={filterState.sortOrder}
              onChange={(e) => filterState.setSortOrder(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
        
        <EscortGrid 
          escorts={filteredEscorts} 
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default EscortContainer;
