
import { Button } from "@/components/ui/button";
import EscortCard from "@/components/cards/EscortCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Escort } from "@/types/escort";

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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {escorts.length} escorts
        </p>
      </div>
      
      {escorts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {escorts.map(escort => (
            <EscortCard key={escort.id} 
              id={escort.id}
              name={escort.name}
              location={escort.location}
              age={escort.age}
              rating={escort.rating}
              reviews={escort.reviews}
              tags={escort.tags || []}
              imageUrl={escort.imageUrl || escort.avatar_url || ""}
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
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No escorts found matching your criteria.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
      
      {/* Pagination */}
      {escorts.length > 0 && totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default EscortResults;
