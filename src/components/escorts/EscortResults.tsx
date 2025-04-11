
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import EscortCard from "@/components/cards/EscortCard";
import { Escort } from "@/types/escort";
import { Skeleton } from "@/components/ui/skeleton";

interface EscortResultsProps {
  escorts: Escort[];
  clearFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isLoading: boolean;
}

const EscortResults = ({ 
  escorts, 
  clearFilters, 
  currentPage, 
  setCurrentPage, 
  totalPages,
  isLoading
}: EscortResultsProps) => {
  // Local loading state for transitions between pages
  const [localLoading, setLocalLoading] = useState(false);
  
  // Set local loading briefly when page changes for better UX
  useEffect(() => {
    if (currentPage) {
      setLocalLoading(true);
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 500); // Slightly longer delay for more noticeable transition
      
      return () => clearTimeout(timer);
    }
  }, [currentPage]);
  
  // Combined loading state (either from props or local state)
  const loading = isLoading || localLoading;
  
  // This handles loading state for when filters are applied
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <Skeleton className="h-48 w-full rounded-md mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  // Shows empty state when no escorts match the filters
  if (!escorts || escorts.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/10 p-8">
        <h3 className="text-xl font-medium mb-2">No escorts found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find any escorts matching your filters.
        </p>
        <Button onClick={clearFilters} className="px-6 py-2">
          Clear all filters
        </Button>
      </div>
    );
  }
  
  return (
    <>
      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {escorts.length} {escorts.length === 1 ? 'escort' : 'escorts'}
        </p>
      </div>
      
      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {escorts.map((escort) => (
          <EscortCard
            key={escort.id}
            id={escort.id}
            name={escort.name || "Unknown"}
            age={escort.age || 0}
            location={escort.location || "Unknown location"}
            rating={escort.rating || 0}
            reviews={escort.reviews || 0}
            tags={escort.tags || []}
            imageUrl={escort.imageUrl || escort.avatar_url || "/placeholder-escort.jpg"}
            price={escort.price || 0}
            verified={escort.verified || false}
            gender={escort.gender}
            sexualOrientation={escort.sexualOrientation}
            availableNow={escort.availableNow || false}
            lastActive={escort.lastActive ? new Date(escort.lastActive) : undefined}
            responseRate={escort.responseRate}
          />
        ))}
      </div>
      
      {/* Enhanced pagination with improved styling */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            className="px-2 py-1"
          />
        </div>
      )}
    </>
  );
};

export default EscortResults;
