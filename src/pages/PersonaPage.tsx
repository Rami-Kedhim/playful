import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUberPersona } from '@/hooks/useUberPersona';
import { UberPersona } from '@/types/UberPersona';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MapPin, Star, Calendar, Video, Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  PersonaAboutTab,
  PersonaBookingTab,
  PersonaChatTab,
  PersonaContentTab,
  PersonaLiveTab,
  PersonaStoriesTab
} from '@/components/persona/tabs';

/**
 * Unified Persona Profile Page
 * 
 * This component displays a profile for any type of persona in the UberEcosystem:
 * - Escorts
 * - Content Creators
 * - Livecam Models
 * - AI Companions
 * 
 * It adapts the UI based on the persona type and capabilities
 */
const PersonaPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPersonaById } = useUberPersona();
  const [persona, setPersona] = useState<UberPersona | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Get the persona from the context
      const foundPersona = getPersonaById(id);
      setPersona(foundPersona);
      setLoading(false);
    }
  }, [id, getPersonaById]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!persona) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Profile Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The persona you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Determine which tabs to show based on persona type and capabilities
  const showBookingTab = persona.type === 'escort' || 
                         (persona.roleFlags?.isEscort) || 
                         (persona.capabilities && typeof persona.capabilities === 'object' && 
                          !Array.isArray(persona.capabilities) && persona.capabilities.hasBooking);
  
  const showContentTab = persona.type === 'creator' || 
                         (persona.roleFlags?.isCreator) || 
                         (persona.capabilities && typeof persona.capabilities === 'object' && 
                          !Array.isArray(persona.capabilities) && persona.capabilities.hasContent);
  
  const showLiveTab = persona.type === 'livecam' || 
                      (persona.roleFlags?.isLivecam) || 
                      (persona.capabilities && typeof persona.capabilities === 'object' && 
                       !Array.isArray(persona.capabilities) && persona.capabilities.hasLiveStream);
  
  const showChatTab = persona.type === 'ai' || 
                      (persona.roleFlags?.isAI) || 
                      (persona.capabilities && typeof persona.capabilities === 'object' && 
                       !Array.isArray(persona.capabilities) && persona.capabilities.hasChat);
  
  const showStoriesTab = persona.capabilities && 
                        typeof persona.capabilities === 'object' && 
                        !Array.isArray(persona.capabilities) && 
                        persona.capabilities.hasStories;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Profile Image */}
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
            <img
              src={persona.imageUrl || 'https://via.placeholder.com/600x800'}
              alt={persona.displayName || persona.name}
              className="w-full h-full object-cover"
            />
            {persona.featured && (
              <Badge className="absolute top-4 right-4 bg-primary">Featured</Badge>
            )}
            {persona.isVerified && (
              <Badge className="absolute top-4 left-4 bg-green-500">Verified</Badge>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={persona.avatarUrl || persona.imageUrl} />
              <AvatarFallback>{persona.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                {persona.displayName || persona.name} 
                {persona.age && <span className="text-xl font-normal ml-2">{persona.age}</span>}
              </h1>
              
              <div className="flex items-center gap-4 mt-2">
                {persona.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{persona.location}</span>
                  </div>
                )}
                
                {(persona.rating || persona.stats?.rating) && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{persona.rating || persona.stats?.rating}</span>
                    {persona.stats?.reviewCount && (
                      <span className="text-muted-foreground text-sm ml-1">
                        ({persona.stats.reviewCount})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {persona.tags && persona.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {persona.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Bio */}
          {persona.bio && (
            <div className="mb-6">
              <p className="text-muted-foreground line-clamp-3">{persona.bio}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {showBookingTab && (
              <Button>
                <Calendar className="mr-2 h-4 w-4" /> Book Now
              </Button>
            )}
            
            {showChatTab && (
              <Button variant="outline">
                Message
              </Button>
            )}
            
            {showContentTab && (
              <Button variant="outline">
                <Image className="mr-2 h-4 w-4" /> View Content
              </Button>
            )}
            
            {showLiveTab && (
              <Button variant="outline" className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
                <Video className="mr-2 h-4 w-4" /> Live Now
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Persona Profile Tabs */}
      <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex overflow-x-auto gap-1">
          <TabsTrigger value="about">About</TabsTrigger>
          {showBookingTab && <TabsTrigger value="booking">Booking</TabsTrigger>}
          {showContentTab && <TabsTrigger value="content">Content</TabsTrigger>}
          {showLiveTab && <TabsTrigger value="live">Live</TabsTrigger>}
          {showChatTab && <TabsTrigger value="chat">Chat</TabsTrigger>}
          {showStoriesTab && <TabsTrigger value="stories">Stories</TabsTrigger>}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="about">
            <PersonaAboutTab persona={persona} />
          </TabsContent>
          
          {showBookingTab && (
            <TabsContent value="booking">
              <PersonaBookingTab persona={persona} />
            </TabsContent>
          )}
          
          {showContentTab && (
            <TabsContent value="content">
              <PersonaContentTab persona={persona} />
            </TabsContent>
          )}
          
          {showLiveTab && (
            <TabsContent value="live">
              <PersonaLiveTab persona={persona} />
            </TabsContent>
          )}
          
          {showChatTab && (
            <TabsContent value="chat">
              <PersonaChatTab persona={persona} />
            </TabsContent>
          )}
          
          {showStoriesTab && (
            <TabsContent value="stories">
              <PersonaStoriesTab persona={persona} />
            </TabsContent>
          )}
        </div>
      </Tabs>
      
      {/* Mobile Bottom Sheet for Actions on Small Screens */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full">Actions</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl">
            <div className="flex flex-col gap-2">
              {showBookingTab && (
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> Book Now
                </Button>
              )}
              
              {showChatTab && (
                <Button variant="outline" className="w-full">
                  Message
                </Button>
              )}
              
              {showContentTab && (
                <Button variant="outline" className="w-full">
                  <Image className="mr-2 h-4 w-4" /> View Content
                </Button>
              )}
              
              {showLiveTab && (
                <Button variant="outline" className="w-full bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
                  <Video className="mr-2 h-4 w-4" /> Live Now
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default PersonaPage;
