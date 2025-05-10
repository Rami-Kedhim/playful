
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Escort } from '@/types/Escort';
import EscortResults from '../EscortResults';
import EscortList from '../EscortList';
import FilterSidebar from '../filters/FilterSidebar';
import { useFilters } from '@/hooks/useFilters';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface ResultsSectionProps {
  escorts: Escort[];
  isLoading: boolean;
  title?: string;
  showFilters?: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  escorts,
  isLoading,
  title = 'Escorts',
  showFilters = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { filters, setFilters, applyFilters, clearFilters } = useFilters();
  
  const itemsPerPage = 9;
  const totalPages = Math.ceil(escorts.length / itemsPerPage);
  const paginatedEscorts = escorts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        
        {showFilters && (
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  applyFilters={() => {
                    applyFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  clearFilters={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              applyFilters={applyFilters}
              clearFilters={clearFilters}
            />
          </div>
        )}
        
        <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <EscortList 
                escorts={paginatedEscorts}
                isLoading={isLoading}
              />
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center px-4 border rounded">
                      <span className="text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
