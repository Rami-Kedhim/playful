
import React, { useEffect, useState } from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { EscortsModule } from '@/modules/escorts/EscortsModule';
import EnhancedEscortFilters from '@/components/escorts/filters/EnhancedEscortFilters';
import EscortGrid from '@/components/escorts/EscortGrid';
import FeaturedEscorts from '@/components/escorts/FeaturedEscorts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SlidersHorizontal, MapPin, Star, Users, Calendar, Heart } from 'lucide-react';
import { ESCORT_SERVICE_TYPES, ESCORT_GENDER_OPTIONS } from '@/types/escortTypes';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Escort landing page content that uses the escort hooks
const EscortsLandingContent = () => {
  const { 
    state: { escorts, featuredEscorts, isLoading: loading }, 
    loadEscorts 
  } = useEscortContext();
  
  const [selectedTab, setSelectedTab] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Load escorts when component mounts
  useEffect(() => {
    loadEscorts(true);
  }, [loadEscorts]);

  // Filter escorts based on selected tab
  const filteredEscorts = React.useMemo(() => {
    switch (selectedTab) {
      case 'verified':
        return escorts.filter(escort => escort.verified);
      case 'available':
        return escorts.filter(escort => escort.availableNow);
      case 'featured':
        return escorts.filter(escort => escort.featured);
      case 'ai':
        return escorts.filter(escort => escort.profileType === 'ai');
      default:
        return escorts;
    }
  }, [escorts, selectedTab]);
  
  // Popular categories for quick filters
  const popularCategories = [
    { name: 'Massage', icon: <Heart className="h-4 w-4" /> },
    { name: 'GFE', icon: <Heart className="h-4 w-4" /> },
    { name: 'Dinner Date', icon: <Calendar className="h-4 w-4" /> },
    { name: 'Couples', icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Premium Escort Directory</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover and connect with verified escorts in your area. 
          Browse profiles, view photos, and book appointments securely.
        </p>
      </div>
      
      {/* Featured Escorts Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Escorts</h2>
          <Button variant="link">View All Featured</Button>
        </div>
        <FeaturedEscorts escorts={featuredEscorts} loading={loading} />
      </section>
      
      {/* Popular Categories */}
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {popularCategories.map((category) => (
            <Card key={category.name} className="hover:bg-accent cursor-pointer transition-all">
              <CardContent className="p-4 flex items-center justify-center flex-col">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  {category.icon}
                </div>
                <span className="font-medium">{category.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Main escort listing section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Find Escorts</h2>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden sm:block">
            <EnhancedEscortFilters />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Quick Filter Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Escorts</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="available">Available Now</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="ai">AI Models</TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedTab}>
                {showMobileFilters && (
                  <div className="sm:hidden mb-6">
                    <EnhancedEscortFilters />
                  </div>
                )}
                
                {filteredEscorts.length === 0 && !loading ? (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No escorts found matching your criteria</p>
                    <Button variant="link" onClick={() => loadEscorts(true)}>
                      Reset filters
                    </Button>
                  </div>
                ) : (
                  <EscortGrid escorts={filteredEscorts} loading={loading} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main component that wraps the content with the provider
const EscortsLanding = () => {
  return (
    <EscortsModule>
      <EscortsLandingContent />
    </EscortsModule>
  );
};

export default EscortsLanding;
