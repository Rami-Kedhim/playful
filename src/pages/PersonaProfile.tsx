import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, MessageSquare } from "lucide-react";
import { UberPersona } from '@/types/UberPersona';
import { 
  PersonaAboutTab, 
  PersonaBookingTab, 
  PersonaChatTab, 
  PersonaContentTab 
} from '@/components/persona/tabs';

const PersonaProfile: React.FC = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  
  // Mock persona data
  const [persona, setPersona] = useState<UberPersona>({
    id: personaId || '1',
    name: 'Jane Doe',
    description: 'A passionate creator with a love for sharing her life.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    reviewCount: 120,
    isVerified: true,
    location: 'New York, NY',
    features: {
      hasPhotos: true,
      hasVideos: true,
      hasStories: true,
      hasChat: true,
      hasBooking: true,
      hasLiveStream: false,
      hasExclusiveContent: true,
      hasContent: true,
      hasRealMeets: true,
      hasVirtualMeets: false
    },
    pricing: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 19.99,
      unlockingPrice: 4.99,
      boostingActive: true,
      meetingPrice: 99.99
    },
    tags: ['travel', 'fashion', 'lifestyle', 'beauty']
  });
  
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="Banner"
              className="w-full h-64 object-cover rounded-t-md"
            />
            <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2">
              <AvatarImage src={persona.avatarUrl} alt={persona.name} />
              <AvatarFallback>{persona.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="p-6 pt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold">{persona.name}</h1>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{persona.location}</span>
                  <Star className="h-4 w-4" />
                  <span>{persona.rating} ({persona.reviewCount} reviews)</span>
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
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="booking">Booking</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <PersonaAboutTab persona={persona} />
              </TabsContent>
              
              <TabsContent value="content">
                <PersonaContentTab persona={persona} />
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
