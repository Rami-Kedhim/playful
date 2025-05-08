
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTitle } from '@/hooks/useTitle';
import { Play, Pause, Volume2, VolumeX, Maximize, MessageSquare, Heart, Share2, Send, Users, Gift, Star, Info, ShieldCheck } from 'lucide-react';

interface LivecamDetail {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  streamUrl: string;
  thumbnailUrl: string;
  viewerCount: number;
  isLive: boolean;
  tags: string[];
  bio: string;
  country: string;
  language: string;
  categories: string[];
  rating: number;
}

const LivecamDetailPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [livecam, setLivecam] = useState<LivecamDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<{user: string, message: string, timestamp: Date}[]>([]);
  
  useTitle(`${livecam?.name || 'Live Stream'} | UberEscorts`);
  
  useEffect(() => {
    const fetchLivecamDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call (in production we would use a real API)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in production would come from API
        const mockLivecam: LivecamDetail = {
          id: id || '1',
          name: 'Sophia Rivera',
          username: 'sophia_rivera',
          avatarUrl: `https://i.pravatar.cc/150?u=${id}`,
          streamUrl: 'https://example.com/stream',
          thumbnailUrl: `https://picsum.photos/seed/${id}/800/450`,
          viewerCount: 284,
          isLive: true,
          tags: ['verified', 'featured', 'trending'],
          bio: 'Hello everyone! I'm Sophia, your next-door dream girl with a wild side. Join my stream for fun conversations, music, and unforgettable moments.',
          country: 'United States',
          language: 'English, Spanish',
          categories: ['chat', 'dance', 'music'],
          rating: 4.8
        };
        
        setLivecam(mockLivecam);
        
        // Mock some chat messages
        const mockMessages = [
          { user: 'John', message: 'Hello! Love your stream!', timestamp: new Date(Date.now() - 120000) },
          { user: 'Sarah', message: 'Can you play some music?', timestamp: new Date(Date.now() - 90000) },
          { user: 'Mike', message: 'Sent you a tip! 🎁', timestamp: new Date(Date.now() - 60000) },
          { user: 'Admin', message: 'Welcome to the live stream! Please respect our community guidelines.', timestamp: new Date(Date.now() - 30000) }
        ];
        
        setMessages(mockMessages);
      } catch (err) {
        console.error('Error fetching livecam details:', err);
        setError('Failed to load stream details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLivecamDetails();
  }, [id]);
  
  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  
  const handleMute = () => {
    setMuted(!muted);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      user: 'You',
      message: chatMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setChatMessage('');
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted w-1/3 mb-4 rounded"></div>
            <div className="aspect-video bg-muted mb-6 rounded-lg"></div>
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
  
  if (error || !livecam) {
    return (
      <Layout>
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-4">{error || 'Stream not found'}</p>
          <Button asChild>
            <a href="/livecams">Back to Live Cams</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {livecam.name}
                {livecam.tags.includes('verified') && (
                  <ShieldCheck className="h-5 w-5 text-blue-500" />
                )}
              </h1>
              <p className="text-muted-foreground">@{livecam.username}</p>
            </div>
            
            {/* Video Player */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative aspect-video bg-black">
                <img 
                  src={livecam.thumbnailUrl} 
                  alt={livecam.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-between p-4">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center">
                    <Badge className="bg-red-600">LIVE</Badge>
                    <Badge variant="outline" className="bg-black/60 text-white border-0 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {livecam.viewerCount}
                    </Badge>
                  </div>
                  
                  {/* Bottom Controls */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20" 
                        onClick={handlePlayPause}
                      >
                        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20"
                        onClick={handleMute}
                      >
                        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Stream Info Tabs */}
            <Tabs defaultValue="about" className="mb-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">About {livecam.name}</h3>
                        <p>{livecam.bio}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                          <p>{livecam.country}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Languages</h4>
                          <p>{livecam.language}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {livecam.categories.map(category => (
                            <Badge key={category} variant="outline">{category}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Monday</p>
                          <p className="text-sm text-muted-foreground">8:00 PM - 11:00 PM</p>
                        </div>
                        <Badge variant="outline">Today</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Wednesday</p>
                          <p className="text-sm text-muted-foreground">9:00 PM - 12:00 AM</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Saturday</p>
                          <p className="text-sm text-muted-foreground">7:00 PM - 1:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gallery">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Array(6).fill(null).map((_, i) => (
                        <div key={i} className="aspect-square bg-muted rounded-md overflow-hidden">
                          <img 
                            src={`https://picsum.photos/seed/${livecam.id}-gallery-${i}/400/400`}
                            alt={`Gallery image ${i+1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Chat and User Info */}
          <div>
            {/* Performer Card */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={livecam.avatarUrl} alt={livecam.name} />
                    <AvatarFallback>{livecam.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{livecam.name}</CardTitle>
                    <CardDescription>@{livecam.username}</CardDescription>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{livecam.rating} · {livecam.viewerCount} viewers</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex gap-2 mb-4">
                  <Button className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline" size="icon">
                    <Gift className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Live Chat */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[400px] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2">
                    {messages.map((msg, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="font-semibold text-sm">{msg.user}:</div>
                        <div className="text-sm flex-1">{msg.message}</div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Chat rules apply. Be respectful to everyone.
                </p>
              </CardFooter>
            </Card>
            
            {/* Popular Creators */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">You May Also Like</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {Array(3).fill(null).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                        <AvatarFallback>{['JD', 'AR', 'TM'][i]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{['Jessica Davis', 'Alex Rodriguez', 'Taylor Martinez'][i]}</p>
                        <p className="text-sm text-muted-foreground">{['Dancing', 'Music', 'Chat'][i]}</p>
                      </div>
                      <Badge variant="outline" className={['bg-red-500/10', 'bg-green-500/10', 'bg-blue-500/10'][i]}>
                        {['Live', 'New', 'Hot'][i]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LivecamDetailPage;
