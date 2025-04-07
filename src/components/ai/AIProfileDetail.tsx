
// Update AIProfileDetail to use the updated Brain Hub service
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { useToast } from '@/components/ui/use-toast';
import AIEscortSuggestions from './AIEscortSuggestions';

// Mock AI profile data
const mockAIProfiles = [
  {
    id: 'ai-profile-1',
    name: 'Sophia AI',
    avatar: 'https://source.unsplash.com/300x300/?avatar,woman',
    description: 'Flirty and fun-loving AI companion',
    tags: ['flirty', 'fun', 'outgoing'],
    subscribers: 1204,
    rating: 4.8,
    personalityType: 'flirty',
  },
  {
    id: 'ai-profile-2',
    name: 'Max AI',
    avatar: 'https://source.unsplash.com/300x300/?avatar,man',
    description: 'Intellectual and thoughtful AI companion',
    tags: ['intellectual', 'serious', 'deep'],
    subscribers: 987,
    rating: 4.6,
    personalityType: 'intellectual',
  }
];

const AIProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const { toast } = useToast();

  // Load AI profile data
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        // For a real app, this would be an API call
        // Simulate API request and Brain Hub processing
        const mockProfile = mockAIProfiles.find(p => p.id === id);
        
        if (mockProfile) {
          // Process through Brain Hub
          const response = await brainHub.processRequest({
            type: 'ai_profile_view',
            data: mockProfile
          });
          
          setProfile(response.data || mockProfile);
        }
      } catch (error) {
        console.error('Error loading AI profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load AI profile data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProfile();
    }
  }, [id, toast]);

  const handleSubscribe = async () => {
    // Simulate API request with Brain Hub processing
    try {
      const response = await brainHub.processRequest({
        type: 'ai_subscription',
        data: {
          profileId: id,
          action: 'subscribe'
        }
      });
      
      if (response.success) {
        setProfile(prev => ({
          ...prev,
          isSubscribed: true
        }));
        
        toast({
          title: 'Subscribed!',
          description: `You have successfully subscribed to ${profile?.name}.`
        });
      }
    } catch (error) {
      console.error('Error subscribing to AI profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to process subscription',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="h-40 bg-muted animate-pulse rounded-md mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="h-96 bg-muted animate-pulse rounded-md"></div>
          </div>
          <div>
            <div className="h-64 bg-muted animate-pulse rounded-md mb-4"></div>
            <div className="h-64 bg-muted animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">AI Profile Not Found</h1>
        <p className="mb-6">The AI profile you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/ai-companions">Browse AI Companions</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="p-6">
                  <div className="bg-muted h-80 rounded-md flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-semibold mb-2">Start Chatting with {profile.name}</h3>
                      <p className="text-muted-foreground mb-4">Subscribe to unlock unlimited conversations</p>
                      <Button onClick={handleSubscribe}>Subscribe Now</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery" className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-square bg-muted rounded-md overflow-hidden">
                        <img 
                          src={`https://source.unsplash.com/300x300/?model,${profile.personalityType},${i}`}
                          alt={`${profile.name} gallery ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="p-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">About {profile.name}</h3>
                    <p className="mb-4">{profile.description}</p>
                    
                    <h4 className="font-medium mb-2">Personality Traits</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.tags.map((tag: string) => (
                        <span key={tag} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Rating & Subscribers</h4>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-lg font-semibold">{profile.rating}</span>
                          <span className="text-muted-foreground"> / 5</span>
                        </div>
                        <div>
                          <span className="text-lg font-semibold">{profile.subscribers.toLocaleString()}</span>
                          <span className="text-muted-foreground"> subscribers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="mx-auto w-24 h-24 relative mb-4">
                  <img 
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.personalityType} AI Companion</p>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" onClick={handleSubscribe}>
                  Subscribe
                </Button>
                <Button variant="outline" className="w-full">
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <AIEscortSuggestions aiProfileId={profile.id} />
        </div>
      </div>
    </div>
  );
};

export default AIProfileDetail;
