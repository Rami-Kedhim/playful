
import React from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import EscortProfileCard from './EscortProfileCard';
import { Button } from '@/components/ui/button';
import { useFilters } from '@/hooks/useFilters';
import { Escort } from '@/types/Escort';

interface EscortResultsProps {
  serviceType?: string;
  limit?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
  escorts?: Escort[];
  isLoading?: boolean;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalPages?: number;
}

const EscortResults: React.FC<EscortResultsProps> = ({
  serviceType,
  limit = 12,
  showViewAll = true,
  viewAllLink = '/escorts',
  escorts: externalEscorts,
  isLoading: externalLoading,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  const contextValue = useEscortContext();
  const { filters } = useFilters();
  
  // Use either provided escorts or those from context
  const escorts = externalEscorts || contextValue.escorts;
  const loading = externalLoading !== undefined ? externalLoading : contextValue.loading;
  
  // Filter escorts based on serviceType if provided
  const filteredEscorts = React.useMemo(() => {
    if (!escorts) return [];
    
    let result = [...escorts];
    
    if (serviceType) {
      // Filter based on service type (in-person or virtual)
      if (serviceType === 'in-person') {
        result = result.filter(escort => escort.providesInPersonServices);
      } else if (serviceType === 'virtual') {
        result = result.filter(escort => escort.providesVirtualContent);
      }
    }
    
    // Apply availability filter if needed
    if (filters.availableOnly) {
      result = result.filter(escort => escort.availableNow || escort.isAvailable);
    }
    
    // Apply gender filter if needed
    if (filters.gender && filters.gender.length > 0) {
      result = result.filter(escort => 
        filters.gender.some(g => escort.gender.toLowerCase() === g.toLowerCase())
      );
    }
    
    // Apply verification filter if needed
    if (filters.verifiedOnly) {
      result = result.filter(escort => escort.verified || escort.isVerified);
    }
    
    return limit ? result.slice(0, limit) : result;
  }, [escorts, serviceType, limit, filters]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-muted h-64 animate-pulse rounded-md"></div>
        ))}
      </div>
    );
  }

  if (filteredEscorts.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEscorts.map((escort) => (
          <EscortProfileCard key={escort.id} escort={escort} />
        ))}
      </div>
      
      {showViewAll && limit && filteredEscorts.length >= limit && (
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <a href={viewAllLink}>View All</a>
          </Button>
        </div>
      )}
      
      {/* Pagination if available */}
      {currentPage !== undefined && setCurrentPage && totalPages && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            
            <span className="px-4 py-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscortResults;
