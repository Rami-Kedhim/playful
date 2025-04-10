
import React from 'react';
import { Escort } from '@/types/escort';
import EscortCard from './EscortCard';
import { Pagination } from '../ui/pagination';
import { Skeleton } from '../ui/skeleton';

interface EscortGridProps {
  escorts: Escort[];
  loading?: boolean;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const EscortGrid: React.FC<EscortGridProps> = ({
  escorts,
  loading = false,
  totalPages = 1,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  // Create loading skeleton array
  const loadingSkeletons = Array(8).fill(0);
  
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {loadingSkeletons.map((_, index) => (
          <div key={index} className="bg-card border rounded-md overflow-hidden h-[440px]">
            <Skeleton className="h-[320px] w-full" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (escorts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">No escorts found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {escorts.map((escort) => (
          <EscortCard 
            key={escort.id} 
            escort={escort} 
            featured={escort.featured} 
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={handlePageChange} 
          />
        </div>
      )}
    </div>
  );
};

export default EscortGrid;
