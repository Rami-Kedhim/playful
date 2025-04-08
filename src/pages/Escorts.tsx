
import React, { useEffect, useState } from 'react';
import { useEscorts } from '@/hooks/useEscorts';
import EscortFilters from '@/components/escorts/filters/EscortFilters';
import EscortGrid from '@/components/escorts/EscortGrid';
import FeaturedEscorts from '@/components/escorts/FeaturedEscorts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SlidersHorizontal, MapPin, Star } from 'lucide-react';

const Escorts = () => {
  const { 
    escorts, 
    featuredEscorts, 
    loading, 
    filters,
    updateFilters,
    applyCurrentFilters,
    clearAllFilters
  } = useEscorts();
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Apply filters when component mounts
  useEffect(() => {
    applyCurrentFilters();
  }, [applyCurrentFilters]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Featured Section */}
      <FeaturedEscorts escorts={featuredEscorts} loading={loading} />

      {/* Filter Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Find Escorts</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFilters}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters {Object.keys(filters).length > 0 && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {Object.values(filters).flat().length}
            </span>}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Escorts</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <EscortGrid escorts={escorts} loading={loading} />
        </TabsContent>
        
        <TabsContent value="verified">
          <EscortGrid 
            escorts={escorts.filter(escort => escort.verified)} 
            loading={loading} 
          />
        </TabsContent>
        
        <TabsContent value="available">
          <EscortGrid 
            escorts={escorts.filter(escort => escort.availableNow)} 
            loading={loading} 
          />
        </TabsContent>
        
        <TabsContent value="featured">
          <EscortGrid 
            escorts={escorts.filter(escort => escort.featured)} 
            loading={loading} 
          />
        </TabsContent>
      </Tabs>
      
      {/* Filter Panel */}
      {showFilters && (
        <EscortFilters 
          filters={filters} 
          onUpdate={updateFilters}
          onApply={() => {
            applyCurrentFilters();
            setShowFilters(false);
          }}
          onClear={() => {
            clearAllFilters();
            setShowFilters(false);
          }}
        />
      )}
    </div>
  );
};

export default Escorts;
