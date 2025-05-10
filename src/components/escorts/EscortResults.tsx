
import React from 'react';
import { useFilters } from '@/hooks/useFilters';
import { Escort } from '@/types/Escort';
import { Pagination } from '@/components/ui/pagination';
import { Loader2 } from 'lucide-react';

interface EscortResultsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isLoading: boolean;
}

const EscortResults: React.FC<EscortResultsProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default EscortResults;
