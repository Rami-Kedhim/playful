
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTitle } from '@/hooks/useTitle';
import { ImageIcon, Video, Heart, Share2, MessageSquare, Star, Lock, ShieldCheck, Crown } from 'lucide-react';

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
  photos: {
    id: string;
    url: string;
    title: string;
    isPremium: boolean;
  }[];
  videos: {
    id: string;
    thumbnailUrl: string;
    title: string;
    duration: string;
    isPremium: boolean;
  }[];
}

const CreatorDetailPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  
  useTitle(`${creator?.name || 'Creator'} | UberEscorts`);
  
  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call (in production we would use a real API)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock creator data
        const mockCreator: Creator = {
          id: id || '1',
          name: 'Jessica Lee',
          username: 'jessica_lee',
          avatarUrl: `https://i.pravatar.cc/150?u=creator${id}`,
          coverUrl: `https://picsum.photos/seed/creator${id}/1200/400`,
          bio: "Hi there! I'm Jessica, a content creator passionate about photography and lifestyle. Follow me for exclusive content and behind-the-scenes moments.",
          rating: 4.8,
          followerCount: 15842,
          contentCount: 248,
          isPremium: true,
          isVerified: true,
          tags: ['model', 'lifestyle', 'photography', 'fashion'],
          photos: Array(12).fill(null).map((_, i) => ({
            id: `photo-${i}`,
            url: `https://picsum.photos/seed/creator${id}-photo${i}/400/400`,
            title: `Photo ${i+1}`,
            isPremium: i % 3 === 0
          })),
          videos: Array(6).fill(null).map((_, i) => ({
            id: `video-${i}`,
            thumbnailUrl: `https://picsum.photos/seed/creator${id}-video${i}/400/240`,
            title: `Video ${i+1}: My ${['Day', 'Lifestyle', 'Photoshoot', 'Travel', 'Experience', 'Story'][i]}`,
            duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            isPremium: i % 2 === 0
          }))
        };
        
        setCreator(mockCreator);
      } catch (err) {
        console.error('Error fetching creator details:', err);
        setError('Failed to load creator profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreatorDetails();
  }, [id]);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-muted mb-4 rounded-lg"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-24 w-24 rounded-full bg-muted"></div>
              <div>
                <div className="h-8 bg-muted w-48 mb-2 rounded"></div>
                <div className="h-4 bg-muted w-36 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="h-6 bg-muted w-1/4 mb-2 rounded"></div>
                <div className="h-4 bg-muted w-full mb-1 rounded"></div>
                <div className="h-4 bg-muted w-2/3 rounded"></div>
              </div>
              <div>
                <div className="h-6 bg-muted w-1/3 mb-2 rounded"></div>
                <div className="h-4 bg-muted w-full mb-1 rounded"></div>
                <div className="h-4 bg-muted w-3/4 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !creator) {
    return (
      <Layout>
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-4">{error || 'Creator not found'}</p>
          <Button asChild>
            <a href="/creators">Back to Creators</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src={creator.coverUrl} 
          alt={`${creator.name}'s cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-20 mb-8">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background">
            <AvatarImage src={creator.avatarUrl} alt={creator.name} />
            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold">{creator.name}</h1>
              {creator.isVerified && (
                <ShieldCheck className="h-5 w-5 text-blue-500" />
              )}
              {creator.isPremium && (
                <Crown className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <p className="text-muted-foreground">@{creator.username}</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{creator.rating}</span>
              </div>
              <div>
                <span className="font-medium">{creator.followerCount.toLocaleString()}</span> followers
              </div>
              <div>
                <span className="font-medium">{creator.contentCount}</span> posts
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              onClick={handleFollow} 
              className={isFollowing ? 'bg-muted hover:bg-muted/80' : ''}
            >
              <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Bio Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{creator.bio}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {creator.tags.map(tag => (
                <Badge key={tag} variant="outline">#{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Content Tabs */}
        <Tabs defaultValue="photos" className="mb-10">
          <TabsList>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
          </TabsList>
          
          {/* Photos Tab */}
          <TabsContent value="photos" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {creator.photos.map(photo => (
                <div key={photo.id} className="relative aspect-square rounded-md overflow-hidden group cursor-pointer">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      {photo.isPremium ? (
                        <div className="p-2 rounded-full bg-black/60">
                          <Lock className="h-6 w-6" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-black/60">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {photo.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-500">
                      PREMIUM
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {creator.videos.map(video => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-black/60">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {video.isPremium && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-500">
                        PREMIUM
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate">{video.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Premium Content CTA */}
        <Card className="mb-10 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Unlock Premium Content
            </CardTitle>
            <CardDescription>
              Subscribe to access all premium photos, videos, and exclusive content from {creator.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div>
                <div className="text-3xl font-bold">$9.99<span className="text-base font-normal">/month</span></div>
                <p className="text-muted-foreground">Cancel anytime</p>
              </div>
              <Button className="sm:ml-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                Subscribe Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Similar Creators */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Similar Creators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4).fill(null).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative aspect-square">
                  <img 
                    src={`https://i.pravatar.cc/300?u=sim${i}`}
                    alt={`Similar creator ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold">{['Emma', 'Sophia', 'Olivia', 'Ava'][i]}</h3>
                      <p className="text-sm opacity-80">{['Photography', 'Fashion', 'Travel', 'Lifestyle'][i]}</p>
                    </div>
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

export default CreatorDetailPage;
