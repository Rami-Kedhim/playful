
import React, { useState } from "react";
import { Escort } from "@/types/escort";
import UnifiedServiceCard from "./UnifiedServiceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Users, Video, Image, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnifiedServiceGridProps {
  providers: Escort[];
  isLoading?: boolean;
  showFilters?: boolean;
}

// Service type definitions
type ServiceTab = "all" | "escorts" | "content" | "livecams";

const UnifiedServiceGrid: React.FC<UnifiedServiceGridProps> = ({ 
  providers,
  isLoading = false,
  showFilters = true
}) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [filterExpanded, setFilterExpanded] = useState(false);
  
  // Filter providers based on active tab and search query
  const filteredProviders = providers.filter(provider => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !provider.name.toLowerCase().includes(query) &&
        !provider.location.toLowerCase().includes(query) &&
        !provider.tags.some(tag => tag.toLowerCase().includes(query))
      ) {
        return false;
      }
    }
    
    // Filter by service type
    if (activeTab === "escorts" && provider.providesInPersonServices === false) {
      return false;
    }
    if (activeTab === "content" && provider.providesVirtualContent === false) {
      return false;
    }
    if (activeTab === "livecams" && (!provider.contentStats?.live)) {
      return false;
    }
    
    return true;
  });

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortOrder) {
      case "featured":
        return a.featured ? -1 : b.featured ? 1 : 0;
      case "rating":
        return b.rating - a.rating;
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "newest":
        return new Date(b.lastActive || 0).getTime() - 
               new Date(a.lastActive || 0).getTime();
      default:
        return 0;
    }
  });
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-muted animate-pulse rounded-lg h-72"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as ServiceTab)}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="escorts">
              <Users className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Escorts</span>
            </TabsTrigger>
            <TabsTrigger value="content">
              <Image className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="livecams">
              <Video className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Live Cams</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <div className="relative grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price_low">Price: Low-High</SelectItem>
              <SelectItem value="price_high">Price: High-Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setFilterExpanded(!filterExpanded)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Filter panel - expandable on mobile, always visible on desktop */}
      {showFilters && (filterExpanded || typeof window !== 'undefined' && window.innerWidth >= 768) && (
        <div className="p-4 border rounded-md bg-card">
          {/* Additional filters would go here */}
          <div className="text-sm text-muted-foreground">
            {filteredProviders.length} results found
          </div>
        </div>
      )}
      
      {/* No results message */}
      {sortedProviders.length === 0 && (
        <div className="py-16 text-center">
          <div className="text-xl font-medium mb-2">No results found</div>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
      
      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProviders.map((provider) => (
          <UnifiedServiceCard
            key={provider.id}
            provider={provider}
          />
        ))}
      </div>
    </div>
  );
};

export default UnifiedServiceGrid;
