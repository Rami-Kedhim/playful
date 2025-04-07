
import React, { useState, useEffect } from "react";
import { Escort } from "@/types/escort";
import EscortFilters from "./EscortFilters";
import EscortResults from "./EscortResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface EscortContainerProps {
  escorts: Escort[];
  services?: string[];
  isLoading?: boolean;
  highlightVisual?: boolean;
  callToActionStyle?: string;
}

const EscortContainer: React.FC<EscortContainerProps> = ({ 
  escorts = [], 
  services = [],
  isLoading = false,
  highlightVisual = false,
  callToActionStyle = 'standard'
}) => {
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>(escorts);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const escortsPerPage = 6;
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredEscorts]);
  
  // Update filtered escorts when the escorts prop changes
  useEffect(() => {
    setFilteredEscorts(escorts);
  }, [escorts]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleApplyFilters = (filtered: Escort[]) => {
    setFilteredEscorts(filtered);
  };
  
  const handleClearFilters = () => {
    setFilteredEscorts(escorts);
  };
  
  // Pagination logic
  const indexOfLastEscort = currentPage * escortsPerPage;
  const indexOfFirstEscort = indexOfLastEscort - escortsPerPage;
  const currentEscorts = filteredEscorts.slice(indexOfFirstEscort, indexOfLastEscort);
  const totalPages = Math.ceil(filteredEscorts.length / escortsPerPage);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <button
            onClick={toggleFilters}
            className="text-sm font-medium flex items-center gap-2"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
            <span className="inline-block w-4 h-4">
              {showFilters ? "↑" : "↓"}
            </span>
          </button>
        </div>
        
        {showFilters && (
          <Card className="p-4 mb-6">
            <EscortFilters
              escorts={escorts}
              services={services}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </Card>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading escorts...</span>
          </div>
        ) : (
          <>
            <TabsContent value="grid" className="mt-0">
              <EscortResults
                escorts={currentEscorts}
                clearFilters={handleClearFilters}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                isLoading={isLoading}
                showActionButtons={true}
                prominentCTA={callToActionStyle === 'prominent'}
              />
            </TabsContent>
            
            <TabsContent value="map" className="mt-0">
              <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map view coming soon</p>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default EscortContainer;
