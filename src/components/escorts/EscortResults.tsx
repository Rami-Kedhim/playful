
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import EscortCard from "@/components/cards/EscortCard";
import { Escort } from "@/types/escort";
import { Skeleton } from "@/components/ui/skeleton";

interface EscortResultsProps {
  escorts: Escort[];
  clearFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const EscortResults = ({ 
  escorts, 
  clearFilters, 
  currentPage, 
  setCurrentPage, 
  totalPages 
}: EscortResultsProps) => {
  const [loading, setLoading] = useState(false);
  
  // This handles loading state for when filters are applied
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
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
  if (escorts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No escorts found</h3>
        <p className="text-gray-500 mb-6">
          We couldn't find any escorts matching your filters.
        </p>
        <Button onClick={clearFilters}>
          Clear all filters
        </Button>
      </div>
    );
  }
  
  return (
    <>
      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Showing {escorts.length} {escorts.length === 1 ? 'escort' : 'escorts'}
        </p>
      </div>
      
      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {escorts.map((escort) => (
          <EscortCard
            key={escort.id}
            id={escort.id}
            name={escort.name}
            age={escort.age}
            location={escort.location}
            rating={escort.rating}
            reviews={escort.reviews}
            tags={escort.tags}
            // Use imageUrl or avatar_url or a default image if neither exists
            imageUrl={escort.imageUrl || escort.avatar_url || "https://via.placeholder.com/300x400"}
            price={escort.price || 0}
            verified={escort.verified || false}
            gender={escort.gender}
            sexualOrientation={escort.sexualOrientation}
            availableNow={escort.availableNow}
            lastActive={escort.lastActive}
            responseRate={escort.responseRate}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default EscortResults;
