
import React, { useEffect, useState } from 'react';
import { useLivecams } from '@/hooks/useLivecams';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, TrendingUp, Eye, Users, MapPin } from 'lucide-react';
import LiveTrendingBar from '@/components/livecams/LiveTrendingBar';
import LivecamFilters from '@/components/livecams/LivecamFilters';
import LivecamGrid from '@/components/livecams/LivecamGrid';
import LivecamFeatured from '@/components/livecams/LivecamFeatured';
import { LivecamModel } from '@/types/livecams';

const Livecams = () => {
  const { 
    livecams, 
    featuredLivecams, 
    loading, 
    filters,
    updateFilters
  } = useLivecams();
  
  const [showFilters, setShowFilters] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [filteredResults, setFilteredResults] = useState<LivecamModel[]>([]);
  
  // Apply filters based on selected tab
  useEffect(() => {
    if (loading) return;
    
    let results = [...livecams];
    
    switch (currentTab) {
      case 'featured':
        results = featuredLivecams;
        break;
      case 'live':
        results = livecams.filter(model => model.isLive);
        break;
      case 'popular':
        results = livecams
          .filter(model => model.isLive)
          .sort((a, b) => (b.viewerCount || 0) - (a.viewerCount || 0))
          .slice(0, 20);
        break;
    }
    
    setFilteredResults(results);
  }, [currentTab, livecams, featuredLivecams, loading]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleApplyFilters = () => {
    // Update filters in context
    updateFilters({
      status: currentTab === 'live' ? 'live' : 'all',
      categories: filters.categories,
      gender: 'all',
      region: 'all',
      minViewers: filters.viewers[0],
      sortBy: filters.sortBy
    });
    
    // Close filter panel
    setShowFilters(false);
  };
  
  const handleLoadMore = () => {
    console.log('Loading more livecams');
    // Implementation would load more livecams
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Featured Section */}
      <LivecamFeatured livecams={featuredLivecams.slice(0, 3)} loading={loading} />
      
      {/* Trending Bar */}
      {!loading && (
        <LiveTrendingBar trendingModels={featuredLivecams.slice(0, 6)} />
      )}
      
      {/* Filter Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Live Cams</h2>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleFilters}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          All
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          New Models
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          Couples
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          Female
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          Male
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          Trans
        </Badge>
      </div>

      {/* Quick Filter Tabs */}
      <Tabs 
        defaultValue="all" 
        value={currentTab}
        onValueChange={setCurrentTab}
        className="mb-6"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Cams</TabsTrigger>
          <TabsTrigger value="live">Live Now</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <LivecamGrid 
            livecams={filteredResults} 
            hasMore={filteredResults.length < livecams.length}
            onLoadMore={handleLoadMore}
          />
        </TabsContent>
        
        <TabsContent value="live">
          <LivecamGrid 
            livecams={filteredResults}
            hasMore={false}
            onLoadMore={handleLoadMore}
          />
        </TabsContent>
        
        <TabsContent value="featured">
          <LivecamGrid 
            livecams={filteredResults}
            hasMore={false}
            onLoadMore={handleLoadMore}
          />
        </TabsContent>
        
        <TabsContent value="popular">
          <LivecamGrid 
            livecams={filteredResults}
            hasMore={false}
            onLoadMore={handleLoadMore}
          />
        </TabsContent>
      </Tabs>
      
      {/* Filter Panel */}
      {showFilters && (
        <LivecamFilters 
          filters={filters} 
          onUpdate={updateFilters}
          onApply={handleApplyFilters}
          onClear={() => {
            updateFilters({
              categories: [],
              viewers: [0, 10000],
              sortBy: 'recommended',
              showOffline: false
            });
            setShowFilters(false);
          }}
        />
      )}
      
      {/* Stats Card */}
      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardContent className="flex flex-wrap items-center justify-around py-6">
          <div className="flex items-center gap-2 p-3">
            <div className="p-2 rounded-full bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{loading ? '...' : livecams.filter(l => l.isLive).length}</div>
              <div className="text-sm text-muted-foreground">Live Now</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {loading ? '...' : livecams.reduce((sum, model) => sum + (model.viewerCount || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Viewers</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{loading ? '...' : livecams.length}</div>
              <div className="text-sm text-muted-foreground">Total Models</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Livecams;
