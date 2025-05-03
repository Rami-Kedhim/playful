
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import EscortResults from "@/components/escorts/EscortResults";
import SearchBar from "@/components/escorts/SearchBar";

interface ResultsSectionProps {
  filterState: any;
  combinedIsLoading: boolean;
}

const ResultsSection = ({ filterState, combinedIsLoading }: ResultsSectionProps) => {
  // Get the standard services list
  const commonServices = [
    "Dinner Date", 
    "Travel Companion",
    "Event Companion",
    "Massage",
    "In-Person Meeting",
    "Virtual Meeting"
  ];

  return (
    <div className="lg:col-span-3">
      <SearchBar
        searchQuery={filterState.searchQuery}
        setSearchQuery={filterState.setSearchQuery}
        sortBy={filterState.sortBy}
        setSortBy={filterState.setSortBy}
      />

      {/* Mobile Applied Filters display */}
      <div className="lg:hidden mb-6">
        {/* Mobile applied filters would go here if needed */}
      </div>

      {/* No results alert */}
      {!combinedIsLoading && filterState.filteredEscorts.length === 0 && (
        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No results found</AlertTitle>
          <AlertDescription>
            No escorts match your current filters. Try adjusting your criteria or clearing some filters.
          </AlertDescription>
        </Alert>
      )}

      <EscortResults
        escorts={filterState.filteredEscorts}
        clearFilters={filterState.clearFilters}
        currentPage={filterState.currentPage}
        setCurrentPage={filterState.setCurrentPage}
        totalPages={filterState.totalPages}
        isLoading={combinedIsLoading}
      />
    </div>
  );
};

export default ResultsSection;
