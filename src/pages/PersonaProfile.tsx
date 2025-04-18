import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import EnhancedAppLayout from "@/components/layout/EnhancedAppLayout";
import { UberPersona } from '@/types/uberPersona';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { mapEscortToUberPersona } from '@/utils/profileMapping';
import { Loader2, Star, MapPin, Calendar, Camera, Film, MessageSquare, Newspaper, Info, Video } from 'lucide-react';
import {
  PersonaAboutTab,
  PersonaContentTab,
  PersonaLiveTab,
  PersonaStoriesTab,
  PersonaChatTab,
  PersonaBookingTab
} from '@/components/persona/tabs';

const checkLiveStreamCapability = (capabilities?: any) => {
  if (!capabilities) return false;
  return capabilities.hasLivestream || false;
};

const PersonaProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { state } = useEscortContext();
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPersona = async () => {
      setLoading(true);
      try {
        // Find the escort that matches the username
        const escort = state.escorts.find(e => {
          const escortUsername = e.name?.toLowerCase().replace(/\s/g, '_') || `escort_${e.id.substring(0, 8)}`;
          return escortUsername === username;
        });
        
        if (escort) {
          const personaData = mapEscortToUberPersona(escort);
          setPersona(personaData);
        } else {
          toast({
            title: "Profile not found",
            description: "We couldn't find the profile you're looking for.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error loading persona:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (username) {
      loadPersona();
    }
  }, [username, state.escorts, toast]);
  
  if (loading) {
    return (
      <EnhancedAppLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </EnhancedAppLayout>
    );
  }
  
  if (!persona) {
    return (
      <EnhancedAppLayout>
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p>The profile you're looking for doesn't exist or has been removed.</p>
        </div>
      </EnhancedAppLayout>
    );
  }
  
  const { roleFlags, capabilities } = persona;
  
  return (
    <EnhancedAppLayout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar with profile info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img 
                  src={persona.avatarUrl || "https://via.placeholder.com/400"} 
                  alt={persona.displayName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {roleFlags.isVerified && (
                    <Badge className="bg-blue-500">Verified</Badge>
                  )}
                  {roleFlags.isEscort && (
                    <Badge className="bg-primary">Escort</Badge>
                  )}
                  {roleFlags.isCreator && (
                    <Badge className="bg-pink-500">Creator</Badge>
                  )}
                  {roleFlags.isLivecam && (
                    <Badge className="bg-red-500">Live</Badge>
                  )}
                  {roleFlags.isAI && (
                    <Badge className="bg-purple-500">AI</Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">{persona.displayName}</h1>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{persona.location}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-muted-foreground">4.8 (42 reviews)</span>
                  </div>
                </div>
                
                {persona.age > 0 && (
                  <div className="mb-2">
                    <span className="font-medium">Age: </span>
                    <span className="text-muted-foreground">{persona.age}</span>
                  </div>
                )}
                
                {persona.ethnicity && (
                  <div className="mb-2">
                    <span className="font-medium">Ethnicity: </span>
                    <span className="text-muted-foreground">{persona.ethnicity}</span>
                  </div>
                )}
                
                <div className="mb-4">
                  <span className="font-medium">Languages: </span>
                  <span className="text-muted-foreground">{persona.language}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {persona.tags.slice(0, 5).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {persona.tags.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{persona.tags.length - 5} more
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  {capabilities.hasBooking && (
                    <Button className="w-full">Book Now</Button>
                  )}
                  {capabilities.hasChat && (
                    <Button variant="outline" className="w-full">Message</Button>
                  )}
                  {persona.monetization.acceptsLucoin && (
                    <Button variant="secondary" className="w-full">Send Gift</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content with tabs */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6">
                    <TabsTrigger value="about" className="flex items-center gap-1">
                      <Info className="h-4 w-4" />
                      <span>About</span>
                    </TabsTrigger>
                    
                    {capabilities.hasPhotos && (
                      <TabsTrigger value="content" className="flex items-center gap-1">
                        <Camera className="h-4 w-4" />
                        <span>Content</span>
                      </TabsTrigger>
                    )}
                    
                    {checkLiveStreamCapability(capabilities) && (
                      <TabsTrigger value="live" className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        <span>Live</span>
                      </TabsTrigger>
                    )}
                    
                    {capabilities.hasStories && (
                      <TabsTrigger value="stories" className="flex items-center gap-1">
                        <Newspaper className="h-4 w-4" />
                        <span>Stories</span>
                      </TabsTrigger>
                    )}
                    
                    {capabilities.hasChat && (
                      <TabsTrigger value="chat" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Chat</span>
                      </TabsTrigger>
                    )}
                    
                    {capabilities.hasBooking && (
                      <TabsTrigger value="booking" className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Booking</span>
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="about" className="p-6">
                    <PersonaAboutTab persona={persona} />
                  </TabsContent>
                  
                  {capabilities.hasPhotos && (
                    <TabsContent value="content" className="p-6">
                      <PersonaContentTab persona={persona} />
                    </TabsContent>
                  )}
                  
                  {checkLiveStreamCapability(capabilities) && (
                    <TabsContent value="live" className="p-6">
                      <PersonaLiveTab persona={persona} />
                    </TabsContent>
                  )}
                  
                  {capabilities.hasStories && (
                    <TabsContent value="stories" className="p-6">
                      <PersonaStoriesTab persona={persona} />
                    </TabsContent>
                  )}
                  
                  {capabilities.hasChat && (
                    <TabsContent value="chat" className="p-6">
                      <PersonaChatTab persona={persona} />
                    </TabsContent>
                  )}
                  
                  {capabilities.hasBooking && (
                    <TabsContent value="booking" className="p-6">
                      <PersonaBookingTab persona={persona} />
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EnhancedAppLayout>
  );
};

export default PersonaProfile;
