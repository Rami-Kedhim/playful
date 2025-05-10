
import React from "react";
import { Escort } from "@/types/Escort";
import { EscortContext } from "@/contexts/EscortContext";
import EscortGrid from "@/components/escorts/EscortGrid";
import EscortList from "@/components/escorts/EscortList";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSidebar from "../filters/FilterSidebar";
import EscortResults from "../EscortResults";

interface ResultsSectionProps {
  escorts: Escort[];
  isLoading: boolean;
  viewType?: "grid" | "list";
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  showFilters?: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  escorts,
  isLoading,
  viewType = "grid",
  currentPage,
  totalPages,
  setCurrentPage,
  showFilters = true,
}) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Render loading skeletons
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="mb-4">
          <Skeleton className="h-10 w-1/3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="h-[350px] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Render empty state
  if (escorts.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  // Provide context value with escorts
  const escortContextValue = {
    escorts,
    loading: isLoading,
  };

  return (
    <EscortContext.Provider value={escortContextValue}>
      <div className="w-full">
        <div className="flex flex-col gap-6">
          {viewType === "grid" && (
            <EscortGrid 
              escorts={escorts}
              loading={isLoading}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          
          {viewType === "list" && (
            <EscortList 
              escorts={escorts}
              loading={isLoading}
            />
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </EscortContext.Provider>
  );
};

export default ResultsSection;
