
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, MessageSquare } from "lucide-react";
import { UberPersona } from '@/types/UberPersona';
import { 
  PersonaAboutTab, 
  PersonaBookingTab, 
  PersonaChatTab
} from '@/components/persona/tabs';

const PersonaProfile: React.FC = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  // Provide default values for all required UberPersona properties to fix TS errors
  const [persona, setPersona] = useState<UberPersona>({
    id: personaId || '1',
    username: 'unknown',
    displayName: 'Unknown Persona',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'New York, NY',
    language: '',
    bio: '',
    age: 0,
    ethnicity: '',
    tags: ['travel', 'fashion', 'lifestyle', 'beauty'],
    createdAt: new Date(),
    updatedAt: new Date(),
    roleFlags: {
      isEscort: false,
      isCreator: false,
      isLivecam: false,
      isAI: false,
      isVerified: true,
      isFeatured: false,
    },
    capabilities: {
      hasPhotos: false,
      hasVideos: false,
      hasStories: false,
      hasChat: false,
      hasBooking: false,
      hasLiveStream: false,
      hasExclusiveContent: false,
      hasContent: false,
      hasRealMeets: false,
      hasVirtualMeets: false,
    },
    monetization: {},
    stats: {
      rating: 4.8,
      reviewCount: 120,
      viewCount: 0,
      favoriteCount: 0,
    },
    description: 'A passionate creator with a love for sharing her life.',
    isAI: false,
  });

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
              alt="Banner"
              className="w-full h-64 object-cover rounded-t-md"
            />
            <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2">
              <AvatarImage src={persona.avatarUrl} alt="Persona Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          <div className="p-6 pt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold">{persona.displayName}</h1>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{persona.location}</span>
                  <Star className="h-4 w-4" />
                  <span>{persona.stats?.rating} ({persona.stats?.reviewCount} reviews)</span>
                </div>
              </div>
              <Button onClick={() => navigate('/messages')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{persona.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {persona.tags?.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>

            <Tabs defaultValue="about" className="space-y-4">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="booking">Booking</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <PersonaAboutTab persona={persona} />
              </TabsContent>

              <TabsContent value="booking">
                <PersonaBookingTab persona={persona} />
              </TabsContent>

              <TabsContent value="chat">
                <PersonaChatTab persona={persona} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaProfile;

