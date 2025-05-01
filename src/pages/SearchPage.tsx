
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Users, Zap } from 'lucide-react';
import { lucie } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { logInteraction } from '@/utils/uberCore';
import BoostButton from '@/components/boost/BoostButton';

interface SearchResult {
  id: string;
  name: string;
  type: string;
  imageUrl?: string;
  location?: string;
  rating?: number;
  tags?: string[];
  boosted?: boolean;
  boostScore?: number;
  distance?: number;
}

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('escorts');
  
  // Get search query from URL if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
    
    // Log search page view
    logInteraction('Search', 'page-view', { 
      path: location.pathname,
      query
    });
  }, [location.search]);
  
  const handleSearch = async (query = searchQuery) => {
    if (!query) return;
    
    setIsLoading(true);
    
    try {
      // Log search interaction using Hermes
      hermes.connect({
        system: 'SearchPage',
        connectionId: `search-${Date.now()}`
      });
      
      logInteraction('Search', 'query', { query, activeTab });
      
      // In a real implementation, this would fetch from a backend
      // For demo, we'll simulate a delayed response with mock data
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: '1',
            name: 'Jessica',
            type: 'escort',
            imageUrl: 'https://example.com/image1.jpg',
            location: 'New York',
            rating: 4.8,
            tags: ['premium', 'verified'],
            boosted: true,
            boostScore: oxum.calculateBoostScore('1'),
            distance: 2.4
          },
          {
            id: '2',
            name: 'Mike',
            type: 'escort',
            imageUrl: 'https://example.com/image2.jpg',
            location: 'Los Angeles',
            rating: 4.5,
            tags: ['new', 'available'],
            boosted: false,
            distance: 5.2
          },
          {
            id: '3',
            name: 'Emma AI',
            type: 'companion',
            imageUrl: 'https://example.com/image3.jpg',
            rating: 5.0,
            tags: ['ai', 'virtual', 'premium'],
            boosted: true,
            boostScore: oxum.calculateBoostScore('3'),
          }
        ];
        
        setResults(mockResults.filter(result => {
          if (activeTab === 'all') return true;
          if (activeTab === 'escorts' && result.type === 'escort') return true;
          if (activeTab === 'companions' && result.type === 'companion') return true;
          if (activeTab === 'creators' && result.type === 'creator') return true;
          return false;
        }));
        
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Search error:', error);
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    logInteraction('Search', 'tab-change', { tab: value });
    
    if (searchQuery) {
      handleSearch();
    }
  };

  return (
    <PageLayout title="Search" subtitle="Find escorts, AI companions, and creators">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by name, location, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            <Button onClick={() => handleSearch()}>
              Search
            </Button>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="escorts">Escorts</TabsTrigger>
              <TabsTrigger value="companions">AI Companions</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
            </TabsList>
            
            <ScrollRevealGroup
              animation="fade-up"
              staggerDelay={0.1}
              containerClassName="space-y-6 mt-6"
            >
              <TabsContent value="all" className="mt-0">
                <ResultsDisplay 
                  results={results} 
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  type="all"
                />
              </TabsContent>
              
              <TabsContent value="escorts" className="mt-0">
                <ResultsDisplay 
                  results={results.filter(r => r.type === 'escort')} 
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  type="escorts"
                />
              </TabsContent>
              
              <TabsContent value="companions" className="mt-0">
                <ResultsDisplay 
                  results={results.filter(r => r.type === 'companion')} 
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  type="companions"
                />
              </TabsContent>
              
              <TabsContent value="creators" className="mt-0">
                <ResultsDisplay 
                  results={results.filter(r => r.type === 'creator')} 
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  type="creators"
                />
              </TabsContent>
            </ScrollRevealGroup>
          </Tabs>
        </div>
      </Container>
    </PageLayout>
  );
};

interface ResultsDisplayProps {
  results: SearchResult[];
  isLoading: boolean;
  searchQuery: string;
  type: string;
}

const ResultsDisplay = ({ results, isLoading, searchQuery, type }: ResultsDisplayProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-muted">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    if (!searchQuery) {
      return (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 text-lg font-medium">Start your search</h3>
          <p className="text-muted-foreground mt-2 mb-4 max-w-md mx-auto">
            Enter a search term to find {type === 'all' ? 'profiles' : type} based on location, services, or other criteria.
          </p>
        </div>
      );
    }
    
    return (
      <div className="text-center py-12">
        <Search className="mx-auto h-12 w-12 text-muted-foreground/60" />
        <h3 className="mt-4 text-lg font-medium">No results found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="aspect-video w-full bg-muted relative">
              {result.imageUrl ? (
                <img 
                  src={result.imageUrl} 
                  alt={result.name} 
                  className="object-cover w-full h-full" 
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <Users className="h-12 w-12 text-muted-foreground/60" />
                </div>
              )}
              
              {result.boosted && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    Boosted
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{result.name}</h3>
                  {result.location && (
                    <p className="text-sm text-muted-foreground">{result.location}</p>
                  )}
                </div>
                {result.rating && (
                  <div className="flex items-center text-sm font-medium">
                    ★ {result.rating.toFixed(1)}
                  </div>
                )}
              </div>
              
              {result.tags && result.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {result.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center mt-3">
                <div>
                  {result.distance && (
                    <p className="text-xs text-muted-foreground">{result.distance} miles away</p>
                  )}
                </div>
                <BoostButton 
                  profileId={result.id} 
                  variant="outline" 
                  size="sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchPage;
