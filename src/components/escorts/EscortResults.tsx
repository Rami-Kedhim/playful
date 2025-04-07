
import React from "react";
import EscortCard from "@/components/cards/EscortCard";
import { Button } from "@/components/ui/button";
import { Escort } from "@/types/escort";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EscortResultsProps {
  escorts: Escort[];
  clearFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isLoading?: boolean;
  showActionButtons?: boolean;
  prominentCTA?: boolean;
}

const EscortResults = ({ 
  escorts, 
  clearFilters, 
  currentPage, 
  setCurrentPage, 
  totalPages,
  isLoading = false,
  showActionButtons = true,
  prominentCTA = false
}: EscortResultsProps) => {
  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border rounded-lg p-4 space-y-4 animate-pulse">
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (escorts.length === 0) {
    return (
      <div className="mt-8 text-center p-8 border rounded-lg bg-muted/20">
        <h3 className="text-lg font-medium mb-2">No escorts match your filters</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
        <Button onClick={clearFilters}>Clear All Filters</Button>
      </div>
    );
  }
  
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {escorts.map((escort) => (
          <EscortCard 
            key={escort.id} 
            escort={escort} 
            showActionButtons={showActionButtons}
            prominentCTA={prominentCTA}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscortResults;
