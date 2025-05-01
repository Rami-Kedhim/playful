
import React, { useState, useEffect } from 'react';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Users, MapPin } from 'lucide-react';
import { lucie } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { logInteraction } from '@/utils/uberCore';

// Type for escort profiles
interface EscortProfile {
  id: string;
  name: string;
  imageUrl?: string;
  location?: string;
  rating?: number;
  age?: number;
  services?: string[];
  tags?: string[];
  boosted?: boolean;
  boostScore?: number;
  distance?: number;
  hourlyRate?: number;
  currency?: string;
  gender?: string;
  languages?: string[];
  availability?: string;
  isVerified?: boolean;
}

const EscortsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [escorts, setEscorts] = useState<EscortProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('New York');
  
  useEffect(() => {
    // Log page view through Hermes for analytics
    logInteraction('EscortsPage', 'page-view', {
      category: activeCategory,
      location
    });
    
    loadEscorts();
  }, [activeCategory, location]);
  
  const loadEscorts = async () => {
    setIsLoading(true);
    
    try {
      // Log flow through Hermes
      hermes.connect({
        system: 'EscortsPage',
        connectionId: `escorts-load-${Date.now()}`
      });
      
      // In a real implementation, this would fetch from a backend
      // For demo, we'll simulate a delayed response with mock data
      setTimeout(() => {
        const mockEscorts: EscortProfile[] = [
          {
            id: '1',
            name: 'Jessica',
            imageUrl: 'https://example.com/image1.jpg',
            location: 'New York',
            rating: 4.9,
            age: 24,
            services: ['Companionship', 'Dinner Dates'],
            tags: ['premium', 'verified'],
            boosted: true,
            boostScore: oxum.calculateBoostScore('1'),
            distance: 1.2,
            hourlyRate: 300,
            currency: 'USD',
            gender: 'Female',
            languages: ['English', 'Spanish'],
            availability: 'Evenings & Weekends',
            isVerified: true
          },
          {
            id: '2',
            name: 'Emma',
            imageUrl: 'https://example.com/image2.jpg',
            location: 'New York',
            rating: 4.7,
            age: 27,
            services: ['Companionship', 'Travel Companion'],
            tags: ['gfe', 'travel'],
            boosted: false,
            distance: 2.5,
            hourlyRate: 250,
            currency: 'USD',
            gender: 'Female',
            languages: ['English', 'French'],
            availability: 'Weekends Only',
            isVerified: true
          },
          {
            id: '3',
            name: 'Michael',
            imageUrl: 'https://example.com/image3.jpg',
            location: 'New York',
            rating: 4.8,
            age: 29,
            services: ['Companionship', 'Events'],
            tags: ['elite', 'professional'],
            boosted: true,
            boostScore: oxum.calculateBoostScore('3'),
            distance: 3.1,
            hourlyRate: 280,
            currency: 'USD',
            gender: 'Male',
            languages: ['English'],
            availability: 'Anytime',
            isVerified: true
          }
        ];
        
        // Filter by category if needed
        const filteredEscorts = activeCategory === 'all' 
          ? mockEscorts 
          : mockEscorts.filter(escort => 
              escort.tags?.includes(activeCategory) || 
              escort.services?.includes(activeCategory));
        
        setEscorts(filteredEscorts);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error loading escorts:', error);
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    logInteraction('EscortsPage', 'search', {
      query: searchQuery,
      location
    });
    loadEscorts();
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <PageLayout title="Escorts" subtitle="Find verified companions near you">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by name, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            
            <div className="relative md:w-1/3">
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
          
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="gfe">GFE</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-6">
              <ScrollRevealGroup
                animation="fade-up"
                staggerDelay={0.1}
                containerClassName="space-y-6"
              >
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="aspect-[3/4] w-full bg-muted">
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
                ) : escorts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {escorts.map((escort) => (
                      <EscortCard key={escort.id} escort={escort} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <h3 className="mt-4 text-lg font-medium">No escorts found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your search criteria or location.
                    </p>
                  </div>
                )}
              </ScrollRevealGroup>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </PageLayout>
  );
};

interface EscortCardProps {
  escort: EscortProfile;
}

const EscortCard = ({ escort }: EscortCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-[3/4] w-full bg-muted relative">
          {escort.imageUrl ? (
            <img 
              src={escort.imageUrl} 
              alt={escort.name} 
              className="object-cover w-full h-full" 
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <Users className="h-12 w-12 text-muted-foreground/60" />
            </div>
          )}
          
          {escort.boosted && (
            <div className="absolute top-2 right-2">
              <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                Boosted
              </div>
            </div>
          )}
          
          {escort.isVerified && (
            <div className="absolute top-2 left-2">
              <div className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                Verified
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{escort.name}, {escort.age}</h3>
              {escort.location && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />{escort.location}
                </p>
              )}
            </div>
            {escort.rating && (
              <div className="flex items-center text-sm font-medium">
                ★ {escort.rating.toFixed(1)}
              </div>
            )}
          </div>
          
          {escort.tags && escort.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {escort.tags.map((tag) => (
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
            <div className="font-medium">
              {escort.hourlyRate && escort.currency && (
                <p>${escort.hourlyRate}</p>
              )}
            </div>
            <div>
              {escort.distance && (
                <p className="text-xs text-muted-foreground">{escort.distance} miles away</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortsPage;
