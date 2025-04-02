
import { useState, useEffect } from "react";
import { useCreators } from "@/hooks/useCreators";
import { useCreatorFilters } from "@/hooks/useCreatorFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import FilterSidebar from "@/components/creators/FilterSidebar";
import SearchAndSortBar from "@/components/creators/SearchAndSortBar";
import AppliedFilters from "@/components/creators/AppliedFilters";
import CreatorResults from "@/components/creators/CreatorResults";
import contentTypes from "@/components/creators/ContentTypes";
import { ContentCreator } from "@/types/creator";

const Creators = () => {
  const { fetchCreators } = useCreators();
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const isMobile = useIsMobile();
  
  // Fetch creators on component mount
  useEffect(() => {
    const loadCreators = async () => {
      const fetchedCreators = await fetchCreators();
      setCreators(fetchedCreators);
    };
    
    loadCreators();
  }, []);
  
  const {
    searchQuery,
    setSearchQuery,
    liveOnly,
    setLiveOnly,
    hideAI,
    setHideAI,
    selectedContentTypes,
    toggleContentType,
    priceMax,
    setPriceMax,
    showFilters,
    setShowFilters,
    clearFilters,
    filteredCreators
  } = useCreatorFilters(creators);

  return (
    <MainLayout title="Content Creators" containerClass="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Creators</h1>
        <Button 
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar - desktop */}
        <div className="hidden md:block">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            liveOnly={liveOnly}
            setLiveOnly={setLiveOnly}
            hideAI={hideAI}
            setHideAI={setHideAI}
            selectedContentTypes={selectedContentTypes}
            toggleContentType={toggleContentType}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            clearFilters={clearFilters}
            contentTypes={contentTypes}
          />
        </div>
        
        {/* Mobile filters */}
        {showFilters && (
          <div className="md:hidden">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              liveOnly={liveOnly}
              setLiveOnly={setLiveOnly}
              hideAI={hideAI}
              setHideAI={setHideAI}
              selectedContentTypes={selectedContentTypes}
              toggleContentType={toggleContentType}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              clearFilters={clearFilters}
              contentTypes={contentTypes}
              isMobile={true}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </div>
        )}
        
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Search bar */}
          <SearchAndSortBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {/* Applied filters */}
          <AppliedFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            liveOnly={liveOnly}
            setLiveOnly={setLiveOnly}
            hideAI={hideAI}
            setHideAI={setHideAI}
            selectedContentTypes={selectedContentTypes}
            toggleContentType={toggleContentType}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            clearFilters={clearFilters}
          />
          
          {/* Results */}
          <CreatorResults 
            creators={filteredCreators} 
            clearFilters={clearFilters}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Creators;
