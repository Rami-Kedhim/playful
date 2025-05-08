
import React, { useState, useEffect } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useTitle } from '@/hooks/useTitle';
import { Grid, Filter, Crown, Star, ImageIcon, Video, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  rating: number;
  followerCount: number;
  contentCount: number;
  isPremium: boolean;
  isVerified: boolean;
  tags: string[];
  mediaTypes: Array<'photos' | 'videos' | 'livestreams'>;
  country?: string;
}

// Free API integration for creators
const useCreatorsData = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        
        // Simulate API call (in production we would use a real API)
        // Free APIs like JSONPlaceholder or a custom backend could be integrated here
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock data
        const mockCreators = Array(16).fill(null).map((_, i) => ({
          id: `creator-${i}`,
          name: `Creator ${i + 1}`,
          username: `creator${i + 1}`,
          avatarUrl: `https://i.pravatar.cc/150?u=creator${i}`,
          coverUrl: `https://picsum.photos/seed/creator${i}/800/300`,
          bio: "Content creator sharing exclusive photos and videos. Subscribe for premium content.",
          rating: 4 + Math.random(),
          followerCount: Math.floor(Math.random() * 10000) + 1000,
          contentCount: Math.floor(Math.random() * 200) + 50,
          isPremium: Math.random() > 0.5,
          isVerified: Math.random() > 0.3,
          tags: ['photos', 'videos', 'exclusive', 'new', 'trending', 'verified'].filter(() => Math.random() > 0.5),
          mediaTypes: [
            Math.random() > 0.2 ? 'photos' : null,
            Math.random() > 0.5 ? 'videos' : null,
            Math.random() > 0.7 ? 'livestreams' : null,
          ].filter(Boolean) as Array<'photos' | 'videos' | 'livestreams'>,
          country: ['US', 'CA', 'UK', 'FR', 'DE'][Math.floor(Math.random() * 5)]
        }));
        
        setCreators(mockCreators);
        setFeaturedCreators(mockCreators.filter((_, i) => i < 4));
      } catch (err) {
        console.error('Error fetching creators data:', err);
        setError('Failed to load creators data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreators();
  }, []);
  
  return { creators, featuredCreators, loading, error };
};

const CreatorCard = ({ creator }: { creator: Creator }) => (
  <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
    <div className="relative h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
      {creator.coverUrl && (
        <img 
          src={creator.coverUrl} 
          alt={`${creator.name}'s profile cover`}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute -bottom-10 left-4">
        <div className="relative">
          <img 
            src={creator.avatarUrl}
            alt={creator.name}
            className="w-20 h-20 rounded-full border-4 border-background"
          />
          {creator.isVerified && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <Crown className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </div>
      {creator.isPremium && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500">
            PREMIUM
          </Badge>
        </div>
      )}
    </div>
    
    <CardContent className="pt-12 pb-4">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-medium">{creator.name}</h3>
          <p className="text-sm text-muted-foreground">@{creator.username}</p>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-sm font-medium">{creator.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{creator.bio}</p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {creator.mediaTypes.includes('photos') && (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-500/10 text-blue-700">
            <ImageIcon className="h-3 w-3" /> Photos
          </Badge>
        )}
        {creator.mediaTypes.includes('videos') && (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-500/10 text-red-700">
            <Video className="h-3 w-3" /> Videos
          </Badge>
        )}
        {creator.mediaTypes.includes('livestreams') && (
          <Badge variant="outline" className="flex items-center gap-1 bg-purple-500/10 text-purple-700">
            <Video className="h-3 w-3" /> Lives
          </Badge>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{creator.followerCount.toLocaleString()}</span> followers
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          <Heart className="h-4 w-4" />
          Follow
        </Button>
      </div>
    </CardContent>
    
    <CardFooter className="pt-0 pb-4">
      <Button asChild variant="default" className="w-full">
        <Link to={`/creators/${creator.id}`}>
          View Profile <ArrowUpRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const CreatorsPage: React.FC = () => {
  useTitle("Content Creators | UberEscorts");
  const { creators, featuredCreators, loading, error } = useCreatorsData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredCreators = creators.filter(creator => {
    // Filter by search term
    if (searchTerm && 
        !creator.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !creator.username.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === "premium" && !creator.isPremium) return false;
    if (activeTab === "verified" && !creator.isVerified) return false;
    if (activeTab === "new" && !creator.tags.includes('new')) return false;
    
    return true;
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Content Creators</h1>
          <p className="text-muted-foreground text-lg">
            Discover exclusive content from our verified creators
          </p>
        </div>
        
        {/* Featured Creators */}
        {!loading && featuredCreators.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold flex items-center mb-6">
              <Crown className="h-6 w-6 text-amber-500 mr-2" />
              Featured Creators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCreators.map(creator => (
                <Link to={`/creators/${creator.id}`} key={creator.id} className="block">
                  <Card className="overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                    <div className="relative pt-[60%]">
                      <img 
                        src={creator.coverUrl} 
                        alt={creator.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {creator.isPremium && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500">
                            PREMIUM
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 flex flex-col justify-between p-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <img 
                            src={creator.avatarUrl}
                            alt={creator.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-medium">{creator.name}</h3>
                            <p className="text-sm text-muted-foreground">@{creator.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{creator.rating.toFixed(1)}</span>
                          <span className="mx-2">•</span>
                          <span>{creator.followerCount.toLocaleString()} followers</span>
                        </div>
                        <p className="text-sm line-clamp-2">{creator.bio}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {creator.mediaTypes.map(type => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type === 'photos' ? 'Photos' : type === 'videos' ? 'Videos' : 'Lives'}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full md:w-auto flex-1 max-w-md">
            <Input
              placeholder="Search creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Grid className="h-4 w-4 mr-1" />
              Categories
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Creators</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(null).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 bg-muted" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-lg text-destructive">{error}</p>
                <Button variant="outline" className="mt-4">Retry</Button>
              </div>
            ) : filteredCreators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCreators.map(creator => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No creators found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Photos', 'Videos', 'Live Streams', 'Audio', 'Stories', 'Exclusive'].map(category => (
              <Card key={category} className="overflow-hidden hover:shadow-md cursor-pointer transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-semibold text-lg">{category}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatorsPage;
