
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import EscortList from '@/components/escorts/EscortList';
import { Escort } from '@/types/Escort';
import FilterSidebar from '../filters/FilterSidebar';

interface ResultsSectionProps {
  escorts: Escort[];
  isLoading: boolean;
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  escorts,
  isLoading,
  onSearch,
  onFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    inPerson: true,
    virtual: true,
    verified: false,
    availableNow: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  // Calculate pagination
  const escortsPerPage = 12;
  const totalPages = Math.ceil(escorts.length / escortsPerPage);
  const currentEscorts = escorts.slice(
    (currentPage - 1) * escortsPerPage,
    currentPage * escortsPerPage
  );

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FilterSidebar 
            filters={filters}
            setFilters={handleFilterChange}
          />
        </div>
        
        <div className="md:col-span-3">
          <Card className="mb-6 p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search by name, location, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </Card>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="in-person">In-Person</TabsTrigger>
              <TabsTrigger value="virtual">Virtual</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <EscortList 
                escorts={currentEscorts}
                isLoading={isLoading} 
              />
            </TabsContent>
            
            {/* Similar TabsContent for other tabs */}
          </Tabs>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
