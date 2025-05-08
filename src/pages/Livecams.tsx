
import React, { useState, useEffect } from 'react';
import { LivecamModel, Livecam } from '@/types/livecams';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

const Livecams: React.FC = () => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch of livecams data
    const fetchLivecams = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockLivecams: Livecam[] = generateMockLivecams();
        setLivecams(mockLivecams);
      } catch (error) {
        console.error('Error fetching livecams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivecams();
  }, []);

  const generateMockLivecams = () => {
    const locations = ['Los Angeles', 'New York', 'Miami', 'Las Vegas', 'Chicago'];
    const languages = ['English', 'Spanish', 'French', 'Japanese', 'Russian'];
    
    const featured: Livecam[] = [
      {
        id: 'cam-1',
        name: 'Jessica Star',
        displayName: 'Jessica Star',
        username: 'jessica_star',
        thumbnailUrl: 'https://placekitten.com/400/300',
        imageUrl: 'https://placekitten.com/800/600',
        isLive: true,
        viewerCount: 1253,
        tags: ['featured', 'popular', 'trending'],
        category: 'featured',
        categories: ['featured', 'trending'],
        isStreaming: true,
        language: languages[0],
        country: 'United States',
        region: locations[0]
      },
      {
        id: 'cam-2',
        name: 'Alicia Dreams',
        displayName: 'Alicia Dreams',
        username: 'alicia_dreams',
        thumbnailUrl: 'https://placekitten.com/401/300',
        imageUrl: 'https://placekitten.com/801/600',
        isLive: true,
        viewerCount: 952,
        tags: ['featured', 'new'],
        category: 'featured',
        categories: ['featured', 'new'],
        isStreaming: true,
        language: languages[1],
        country: 'United States',
        region: locations[1]
      }
    ];
    
    const regular: Livecam[] = Array.from({ length: 6 }).map((_, i) => ({
      id: `cam-reg-${i + 1}`,
      name: `Model ${i + 1}`,
      displayName: `Model ${i + 1}`,
      username: `model_${i + 1}`,
      thumbnailUrl: `https://placekitten.com/${400 + i}/${300 + i}`,
      imageUrl: `https://placekitten.com/${800 + i}/${600 + i}`,
      isLive: i < 4,
      viewerCount: Math.floor(Math.random() * 500) + 100,
      tags: ['regular', i % 3 === 0 ? 'new' : 'experienced'],
      category: 'regular',
      categories: ['regular'],
      isStreaming: i < 4,
      language: languages[i % languages.length],
      country: 'United States',
      region: locations[i % locations.length]
    }));
    
    return [...featured, ...regular];
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Live Cams</h1>
        <div className="text-center py-10">Loading livecams...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Live Cams</h1>
      
      {/* Featured Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {livecams
            .filter(cam => cam.tags.includes('featured'))
            .map(livecam => (
              <Link to={`/livecams/${livecam.id}`} key={livecam.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={livecam.thumbnailUrl} 
                      alt={livecam.name}
                      className="w-full h-64 object-cover"
                    />
                    {livecam.isLive && (
                      <Badge 
                        variant="destructive" 
                        className="absolute top-3 right-3 flex items-center gap-1"
                      >
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        LIVE
                      </Badge>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded flex items-center gap-1 text-xs">
                      <Eye size={12} />
                      {livecam.viewerCount.toLocaleString()}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{livecam.name}</h3>
                        <p className="text-sm text-muted-foreground">{livecam.region}</p>
                      </div>
                      <Badge variant="secondary">{livecam.language}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
      
      {/* All Live Cams */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Live Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {livecams
            .filter(cam => !cam.tags.includes('featured'))
            .map(livecam => (
              <Link to={`/livecams/${livecam.id}`} key={livecam.id}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="relative">
                    <img 
                      src={livecam.thumbnailUrl} 
                      alt={livecam.name}
                      className="w-full h-44 object-cover"
                    />
                    {livecam.isLive && (
                      <Badge 
                        variant="destructive" 
                        className="absolute top-2 right-2 flex items-center gap-1 text-xs"
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        LIVE
                      </Badge>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded flex items-center gap-1 text-xs">
                      <Eye size={10} />
                      {livecam.viewerCount.toLocaleString()}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div>
                      <h3 className="font-medium text-sm">{livecam.name}</h3>
                      <p className="text-xs text-muted-foreground">{livecam.region}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Livecams;
