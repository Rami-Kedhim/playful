import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { LivecamModel, LivecamsFilter } from '@/types/livecam';
import LiveTrendingBar from '@/components/livecams/LiveTrendingBar';
import LivecamFeatured from '@/components/livecams/LivecamFeatured';
import { Search, Filter, Loader2 } from 'lucide-react';

const Livecams: React.FC = () => {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [trendingModels, setTrendingModels] = useState<LivecamModel[]>([]);
  const [featuredModel, setFeaturedModel] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(true);
  
  // Fix filter with proper LivecamsFilter type
  const [filters, setFilters] = useState<Partial<LivecamsFilter>>({
    status: 'all',
    categories: [],
    gender: 'all',
    region: 'all',
    minViewers: 0,
    sortBy: 'popularity'
  });
  
  useEffect(() => {
    fetchTrending();
    fetchFeatured();
    fetchLivecams(filters);
  }, []);
  
  const fetchLivecams = useCallback(async (filterOptions: Partial<LivecamsFilter> = {}) => {
    setLoading(true);
    try {
      // Simulate API call
      const data = await simulateApiCall(page, pageSize, filterOptions);
      setLivecams(data.models);
      setTotalCount(data.totalCount);
      setCanLoadMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching livecams:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);
  
  const fetchMoreModels = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await simulateApiCall(nextPage, pageSize, filters);
      setLivecams(prev => [...prev, ...data.models]);
      setPage(nextPage);
      setCanLoadMore(data.hasMore);
      return data.hasMore;
    } catch (error) {
      console.error('Error fetching more livecams:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filters]);
  
  const fetchTrending = useCallback(() => {
    // Simulate trending models
    const trending = simulateTrending();
    setTrendingModels(trending);
  }, []);
  
  const fetchFeatured = useCallback(() => {
    // Simulate featured model
    const featured = simulateFeatured();
    setFeaturedModel(featured);
  }, []);
  
  // Fix the Promise<void> methods
  const handleLoadMore = async (): Promise<void> => {
    const hasMore = await fetchMoreModels();
    if (!hasMore) {
      setCanLoadMore(false);
    }
  };
  
  const handleFilterChange = async (newFilters: Partial<LivecamsFilter>): Promise<void> => {
    setFilters({...filters, ...newFilters});
    await fetchLivecams({...filters, ...newFilters});
  };
  
  const handleSortChange = async (sort: string): Promise<void> => {
    const newFilters = {...filters, sortBy: sort};
    setFilters(newFilters);
    await fetchLivecams(newFilters);
  };
  
  const handleCategoryChange = async (categories: string[]): Promise<void> => {
    const newFilters = {...filters, categories};
    setFilters(newFilters);
    await fetchLivecams(newFilters);
  };
  
  // And update the filters to match expected type
  const defaultFilters: LivecamsFilter = {
    status: filters.status || 'all',
    categories: filters.categories || [],
    gender: filters.gender || 'all',
    region: filters.region || 'all',
    minViewers: filters.minViewers || 0,
    sortBy: filters.sortBy || 'popularity'
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Livecams Directory</h1>
        <div className="flex items-center space-x-4">
          <Input type="text" placeholder="Search..." className="max-w-sm" />
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => handleFilterChange({ status: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="categories">Categories</Label>
                <Select 
                  multiple
                  onValueChange={(values) => handleCategoryChange(values)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amateur">Amateur</SelectItem>
                    <SelectItem value="teen">Teen</SelectItem>
                    <SelectItem value="mature">Mature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleFilterChange({ gender: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="region">Region</Label>
                <Select onValueChange={(value) => handleFilterChange({ region: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="minViewers">Min Viewers</Label>
                <Slider
                  defaultValue={[0]}
                  max={1000}
                  step={10}
                  onValueChange={(value) => handleFilterChange({ minViewers: value[0] })}
                />
              </div>
              
              <div>
                <Label htmlFor="sortBy">Sort By</Label>
                <Select onValueChange={(value) => handleSortChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Popularity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {featuredModel && (
            <LivecamFeatured model={featuredModel} />
          )}
          
          {/* Fix the LiveTrendingBar props */}
          <LiveTrendingBar models={trendingModels} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {livecams.map(cam => (
              <div key={cam.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold">{cam.name}</h3>
                <p>Viewers: {cam.viewerCount}</p>
              </div>
            ))}
          </div>
          
          {loading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          
          {canLoadMore && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMore} disabled={loading}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Livecams;

// Simulate API call
async function simulateApiCall(page: number, pageSize: number, filterOptions: Partial<LivecamsFilter>): Promise<{ models: LivecamModel[]; totalCount: number; page: number; pageSize: number; hasMore: boolean; }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allModels = generateMockLivecams();
      
      // Apply filters
      const filteredModels = allModels.filter(model => {
        if (filterOptions.status && filterOptions.status !== 'all') {
          const isLive = model.status === 'live';
          if ((filterOptions.status === 'live' && !isLive) || (filterOptions.status === 'offline' && isLive)) {
            return false;
          }
        }
        
        if (filterOptions.categories && filterOptions.categories.length > 0 && (!model.categories || !filterOptions.categories.some(cat => model.categories.includes(cat)))) {
          return false;
        }
        
        if (filterOptions.gender && filterOptions.gender !== 'all' && model.gender !== filterOptions.gender) {
          return false;
        }
        
        if (filterOptions.region && filterOptions.region !== 'all' && model.region !== filterOptions.region) {
          return false;
        }
        
        if (filterOptions.minViewers && model.viewerCount && model.viewerCount < filterOptions.minViewers) {
          return false;
        }
        
        return true;
      });
      
      // Apply sorting
      const sortedModels = [...filteredModels].sort((a, b) => {
        if (filterOptions.sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
          return (b.viewerCount || 0) - (a.viewerCount || 0);
        }
      });
      
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedModels = sortedModels.slice(startIndex, endIndex);
      
      const hasMore = endIndex < sortedModels.length;
      
      resolve({
        models: paginatedModels,
        totalCount: sortedModels.length,
        page,
        pageSize,
        hasMore
      });
    }, 500);
  });
}

// Simulate trending models
function simulateTrending(): LivecamModel[] {
  const allModels = generateMockLivecams();
  return allModels.slice(0, 5);
}

// Simulate featured model
function simulateFeatured(): LivecamModel {
  const allModels = generateMockLivecams();
  return allModels[0];
}

// Mock livecam data
function generateMockLivecams(): LivecamModel[] {
  const models: LivecamModel[] = [];
  const categories = ['amateur', 'teen', 'mature'];
  const regions = ['us', 'eu', 'asia'];
  const genders = ['female', 'male'];
  
  for (let i = 1; i <= 30; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const isLive = Math.random() > 0.5;
    
    models.push({
      id: `livecam-${i}`,
      name: `Livecam ${i}`,
      username: `user${i}`,
      displayName: `User ${i}`,
      imageUrl: `https://picsum.photos/id/${i + 100}/300/200`,
      thumbnailUrl: `https://picsum.photos/id/${i + 100}/220/120`,
      isLive: isLive,
      viewerCount: Math.floor(Math.random() * 500),
      tags: ['popular', 'new'],
      boosted: Math.random() > 0.7,
      boostScore: Math.random() * 100,
      boostRank: 'top',
      profileUrl: `/livecams/user${i}`,
      region: region,
      language: 'en',
      category: category,
      isStreaming: isLive,
      rating: Math.random() * 5,
      country: region === 'us' ? 'USA' : region === 'eu' ? 'Germany' : 'Japan',
      categories: [category],
      description: `Livecam model ${i} from ${region}`,
      age: Math.floor(Math.random() * 20) + 18,
      streamUrl: `/stream/user${i}`,
      previewVideoUrl: `/video/user${i}`,
      gender: gender,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      room: {
        id: `room-${i}`,
        name: `Room ${i}`,
        capacity: 100,
        viewerCount: Math.floor(Math.random() * 100),
        status: isLive ? 'active' : 'inactive'
      },
      status: isLive ? 'live' : 'offline'
    });
  }
  
  return models;
}
