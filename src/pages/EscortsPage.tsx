import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Filter } from 'lucide-react';
import MapViewer from '@/components/maps/MapViewer';
import EscortScraper from '@/services/scrapers/EscortScraper';
import { Escort } from '@/types/escort';
import { useFilterState } from '@/hooks/escort-filters/useFilterState';

const EscortsPage = () => {
  const navigate = useNavigate();
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEscort, setSelectedEscort] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'grid'>('grid');
  const [apiKey, setApiKey] = useState<string>('');
  
  // Use filter state for escort filtering
  const {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    verifiedOnly,
    setVerifiedOnly,
    serviceTypeFilter,
    setServiceTypeFilter,
    ratingMin,
    setRatingMin,
    availableNow,
    setAvailableNow
  } = useFilterState();

  useEffect(() => {
    const fetchEscorts = async () => {
      setLoading(true);
      try {
        const scraper = EscortScraper.getInstance();
        const data = await scraper.getEscorts();
        setEscorts(data);
      } catch (error) {
        console.error('Error fetching escorts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscorts();
  }, []);

  // Filter escorts based on filter state
  const filteredEscorts = escorts.filter(escort => {
    // Filter by search query
    if (searchQuery && !escort.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by location
    if (location && !escort.location?.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by verification status
    if (verifiedOnly && !escort.isVerified && !escort.verified) {
      return false;
    }
    
    // Filter by rating
    if (ratingMin > 0 && (!escort.rating || escort.rating < ratingMin)) {
      return false;
    }
    
    // Filter by availability
    if (availableNow && !escort.availableNow) {
      return false;
    }
    
    return true;
  });

  const handleEscortClick = (id: string) => {
    navigate(`/escorts/${id}`);
  };
  
  const handleMapMarkerClick = (markerId: string) => {
    setSelectedEscort(markerId);
    // Could show a popup or navigate
  };

  return (
    <Layout
      title="Escort Directory"
      description="Find escorts in your area"
      showBreadcrumbs
    >
      <div className="mb-6 px-4 flex items-center space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, location, services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="grid" className="w-full" onValueChange={(value) => setView(value as 'map' | 'grid')}>
        <div className="flex justify-between items-center mb-4 px-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 items-center">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Enter location" 
              className="w-60" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="grid">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-muted-foreground">Loading escorts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
              {filteredEscorts.map((escort) => (
                <Card
                  key={escort.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleEscortClick(escort.id)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={escort.profileImage || escort.imageUrl || `https://picsum.photos/seed/${escort.id}/400/600`}
                      alt={escort.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                    />
                    {(escort.isVerified || escort.verified) && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{escort.name}</h3>
                      {escort.rating && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          ★ <span className="text-foreground">{escort.rating}</span>
                        </div>
                      )}
                    </div>
                    {escort.age && <p className="text-sm text-muted-foreground">{escort.age} years</p>}
                    {escort.location && (
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{escort.location}</span>
                      </div>
                    )}
                    <div className="mt-3">
                      <p className="font-medium">{escort.price ? `$${escort.price}/hr` : 'Price on request'}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="map" className="relative">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="rounded-md overflow-hidden h-[70vh] border">
                <div className="absolute top-4 right-4 z-10 bg-background/90 p-4 rounded-lg shadow-lg">
                  <h3 className="font-medium mb-2">Google Maps API Key</h3>
                  <Input
                    placeholder="Enter your Google Maps API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground mb-2">
                    Get your API key from the <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="text-primary">Google Cloud Console</a>
                  </p>
                </div>
                
                <MapViewer
                  center={{ lat: 40.7128, lng: -74.0060 }}
                  zoom={12}
                  markers={filteredEscorts.map(escort => ({
                    id: escort.id,
                    position: {
                      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
                      lng: -74.0060 + (Math.random() - 0.5) * 0.1
                    },
                    title: escort.name
                  }))}
                  onMarkerClick={handleMapMarkerClick}
                  height="100%"
                  width="100%"
                  apiKey={apiKey}
                />
              </div>
              
              {selectedEscort && (
                <div className="p-4 border-t">
                  <h3 className="font-medium">Selected Escort</h3>
                  <div className="flex items-center gap-4 mt-2">
                    {escorts.find(e => e.id === selectedEscort) && (
                      <>
                        <img
                          src={escorts.find(e => e.id === selectedEscort)?.profileImage || 
                               escorts.find(e => e.id === selectedEscort)?.imageUrl || 
                               `https://picsum.photos/seed/${selectedEscort}/100/100`}
                          alt="Selected escort"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{escorts.find(e => e.id === selectedEscort)?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {escorts.find(e => e.id === selectedEscort)?.location}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Button onClick={() => navigate(`/escorts/${selectedEscort}`)}>
                            View Profile
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default EscortsPage;
