
import React, { useState, useEffect } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useTitle } from '@/hooks/useTitle';
import { LivecamModel } from '@/types/livecams';
import { Eye, Video, Users, Star, Heart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Free API integration for live streaming data
const useLivecamData = () => {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [featuredLivecams, setFeaturedLivecams] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivecams = async () => {
      try {
        setLoading(true);
        
        // Simulate API call (in production we would use a real API)
        // Free APIs like Twitch API (with developer account) or YouTube Live API could be integrated here
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Generate mock data based on real API response structure
        const mockLivecams = Array(12).fill(null).map((_, i) => ({
          id: `cam-${i}`,
          name: `Performer ${i + 1}`,
          username: `performer${i + 1}`,
          displayName: `Performer ${i + 1}`,
          thumbnailUrl: `https://picsum.photos/seed/livecam${i}/400/240`,
          imageUrl: `https://picsum.photos/seed/livecam${i}/800/450`,
          isLive: Math.random() > 0.3,
          viewerCount: Math.floor(Math.random() * 500) + 10,
          country: ['US', 'CA', 'UK', 'FR', 'DE', 'ES', 'IT', 'JP'][Math.floor(Math.random() * 8)],
          categories: ['chat', 'dance', 'music', 'gaming', 'art'].slice(0, Math.floor(Math.random() * 3) + 1),
          age: 20 + Math.floor(Math.random() * 15),
          language: ['English', 'Spanish', 'French', 'German', 'Italian'][Math.floor(Math.random() * 5)],
          description: "Interactive live stream with tips and requests. Join the fun!",
          tags: ['verified', 'featured', 'new', 'trending'].slice(0, Math.floor(Math.random() * 3))
        }));
        
        setLivecams(mockLivecams);
        setFeaturedLivecams(mockLivecams.filter(cam => Math.random() > 0.7));
      } catch (err) {
        console.error('Error fetching livecam data:', err);
        setError('Failed to load livecam data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLivecams();
  }, []);
  
  return { livecams, featuredLivecams, loading, error };
};

const LivecamFeaturedSection = ({ livecam, loading }: { livecam?: LivecamModel, loading: boolean }) => {
  if (loading) {
    return (
      <Card className="h-[300px] md:h-[400px] overflow-hidden animate-pulse">
        <div className="w-full h-full bg-muted"></div>
      </Card>
    );
  }
  
  if (!livecam) return null;
  
  return (
    <Card className="overflow-hidden shadow-lg border-0">
      <div className="relative aspect-video">
        <img 
          src={livecam.imageUrl} 
          alt={livecam.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center mb-2">
            <Badge className="bg-red-600 text-white mr-2">LIVE</Badge>
            <Badge variant="outline" className="bg-black/60 text-white border-0 flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {livecam.viewerCount}
            </Badge>
          </div>
          <h2 className="text-2xl text-white font-bold">{livecam.name}</h2>
          <p className="text-white/80 mb-4">{livecam.description}</p>
          <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link to={`/livecams/${livecam.id}`}>
              <Video className="h-4 w-4 mr-2" />
              Watch Stream
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

const LivecamCard = ({ livecam }: { livecam: LivecamModel }) => (
  <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
    <div className="relative aspect-video">
      <img 
        src={livecam.thumbnailUrl} 
        alt={livecam.name} 
        className="w-full h-full object-cover"
      />
      {livecam.isLive && (
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-red-500/80 text-white border-red-500/30 flex items-center gap-1 px-2 py-0.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            LIVE
          </Badge>
        </div>
      )}
      
      <div className="absolute bottom-2 right-2">
        <Badge variant="outline" className="bg-black/60 border-white/20 flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {livecam.viewerCount}
        </Badge>
      </div>
    </div>
    
    <CardContent className="p-4">
      <div className="flex justify-between mb-1">
        <h3 className="font-medium truncate">{livecam.displayName}</h3>
        <Badge variant="outline" className="bg-primary/10 border-primary/30">
          {livecam.age}
        </Badge>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Users className="h-3 w-3 mr-1" />
        <span>{livecam.country}</span>
        
        <div className="ml-auto flex items-center">
          <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
          <span>{(4 + Math.random()).toFixed(1)}</span>
        </div>
      </div>
      
      {livecam.categories && livecam.categories.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {livecam.categories.map(category => (
            <Badge key={category} variant="outline" className="text-xs bg-secondary/10">
              {category}
            </Badge>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const LivecamsPage: React.FC = () => {
  useTitle("Live Cams | UberEscorts");
  const { livecams, featuredLivecams, loading, error } = useLivecamData();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLivecams = livecams.filter(cam => {
    if (activeTab === "live" && !cam.isLive) return false;
    if (activeTab === "trending" && cam.viewerCount < 100) return false;
    if (activeTab === "new" && !cam.tags?.includes('new')) return false;
    if (searchTerm && !cam.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !cam.username?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Live Cams</h1>
          <p className="text-muted-foreground text-lg">
            Watch live performers from around the world in high-definition streaming
          </p>
        </div>
        
        {/* Featured Stream */}
        {!loading && featuredLivecams.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Featured Stream</h2>
            <LivecamFeaturedSection livecam={featuredLivecams[0]} loading={loading} />
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full md:w-auto flex-1 max-w-md">
            <Input
              placeholder="Search performers..."
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
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Streams</TabsTrigger>
            <TabsTrigger value="live">
              Live Now <Badge className="ml-1 bg-red-500/20 text-red-500">{livecams.filter(c => c.isLive).length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(null).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video bg-muted" />
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-lg text-destructive">{error}</p>
                <Button variant="outline" className="mt-4">Retry</Button>
              </div>
            ) : filteredLivecams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLivecams.map(livecam => (
                  <Link to={`/livecams/${livecam.id}`} key={livecam.id}>
                    <LivecamCard livecam={livecam} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No streams found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Chat', 'Dance', 'Music', 'Gaming', 'Art', 'Fitness'].map(category => (
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

export default LivecamsPage;
