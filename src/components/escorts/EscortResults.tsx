
import React from 'react';
import { Escort } from '@/types/escort';
import EscortCard from '@/components/escorts/EscortCard';
import { Button } from '@/components/ui/button';

export interface EscortResultsProps {
  escorts: Escort[];
  clearFilters?: () => void;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalPages?: number;
  isLoading?: boolean;
}

const EscortResults: React.FC<EscortResultsProps> = ({
  escorts,
  clearFilters,
  currentPage = 1,
  setCurrentPage,
  totalPages = 1,
  isLoading = false
}) => {
  const handlePageChange = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-96 rounded-md bg-muted animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-gray-400">Showing {escorts.length} escorts</p>
      </div>
      
      {escorts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {escorts.map((escort) => {
            // Create a safely normalized escort object with required properties
            const safeEscort = {
              ...escort,
              providesInPersonServices: escort.providesInPersonServices || false,
              providesVirtualContent: escort.providesVirtualContent || false,
              featured: escort.featured || false
            };

            return (
              <EscortCard
                key={escort.id}
                id={escort.id}
                name={escort.name}
                age={escort.age || 0}
                location={escort.location || ''}
                rating={escort.rating || 0}
                reviews={escort.reviewCount || 0}
                tags={escort.tags || []}
                imageUrl={escort.imageUrl || escort.profileImage || (escort.images?.[0] || '')}
                price={escort.price}
                verified={escort.isVerified || escort.verified || false}
                gender={escort.gender}
                sexualOrientation={escort.sexualOrientation}
                availableNow={escort.isAvailable || false}
                responseRate={escort.responseRate}
                featured={safeEscort.featured}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No escorts found matching your criteria.</p>
          {clearFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      )}
      
      {escorts.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="mx-1"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              className="mx-1"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            className="mx-1"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default EscortResults;
